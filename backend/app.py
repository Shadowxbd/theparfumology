from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from models import db, User
from auth import auth_bp
from recommender import reco_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY") or "defaultsecret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init extensions
db.init_app(app)
CORS(app, supports_credentials=True)

# Login manager
login_manager = LoginManager()
login_manager.init_app(app)

# Custom unauthorized handler for APIs
@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({'error': 'unauthorized'}), 401

# User loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(reco_bp)

# Init DB
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
