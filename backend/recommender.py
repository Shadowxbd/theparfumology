from flask import Blueprint, request, jsonify
from flask_login import login_required
import requests
from bs4 import BeautifulSoup

reco_bp = Blueprint('reco', __name__)

def call_llm(gender, scent, budget, mood):
    prompt = f"""
tu es un expert des parfums , Donne-moi 3 parfums RÉELS pour un(e) {gender} avec senteur {scent}, budget {budget}€, pour une occasion : {mood}.
UNIQUEMENT des parfums réels du marché mondial. Donne le nom EXACT + la marque comme dans les boutiques ou Fragrantica.
Réponds uniquement au format :
1. Nom - Marque
2. ...
"""
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "qwen",
        "prompt": prompt,
        "stream": False
    })
    return response.json()["response"]



def search_fragrantica(name):
    import requests
    from bs4 import BeautifulSoup

    headers = {"User-Agent": "Mozilla/5.0"}
    search_url = f"https://www.fragrantica.com/search/?q={name.replace(' ', '+')}"
    res = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')

    # Récupère le premier lien de parfum
    result = soup.find('div', class_='card card-search')
    if not result:
        return {"name": name, "image": None, "description": None, "notes": [], "link": None}

    try:
        link = 'https://www.fragrantica.com' + result.find('a')['href']
        image = result.find('img')['src']

        detail = requests.get(link, headers=headers)
        detail_soup = BeautifulSoup(detail.text, 'html.parser')

        # Nom propre
        title = detail_soup.find('h1').text.strip()

        # Description courte
        desc_div = detail_soup.find('div', class_='card-body')
        description = desc_div.text.strip() if desc_div else None

        # Accords principaux
        accords = detail_soup.find_all('div', class_='accord-bar__title')
        notes = [a.text.strip() for a in accords if a.text.strip()]

        return {
            "name": title,
            "image": image,
            "description": description,
            "notes": notes,
            "link": link
        }

    except Exception as e:
        return {"name": name, "error": str(e), "image": None, "description": None, "notes": [], "link": None}

@reco_bp.route('/recommend', methods=['POST'])
@login_required
def recommend():
    data = request.json
    gender = data.get('gender')
    scent = data.get('scent')
    budget = data.get('budget')
    mood = data.get('mood')

    raw = call_llm(gender, scent, budget, mood)
    perfume_names = [line.split('.')[1].strip() for line in raw.split('\n') if '.' in line]

    enriched = [search_fragrantica(name) for name in perfume_names if name]
    enriched = [p for p in enriched if p['image'] is not None]

    return jsonify(enriched)
