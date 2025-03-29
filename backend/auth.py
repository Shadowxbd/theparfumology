from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify(message='Inscription réussie')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify(message='Connexion réussie')
    return jsonify(message='Échec de connexion'), 401

@auth_bp.route('/profile')
@login_required
def profile():
    return jsonify(email=current_user.email, is_premium=current_user.is_premium)
