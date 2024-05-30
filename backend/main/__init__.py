from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail

import os


from flask_sqlalchemy import SQLAlchemy

api = Api() 

db = SQLAlchemy()

migrate = Migrate()

jwt = JWTManager()

mailsender = Mail()

import main.resources as resources
def create_app():
  
    app = Flask(__name__)

    load_dotenv()
    
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

            
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)
    migrate.init_app(app, db)

    api.add_resource(resources.UsuariosResource, '/usuarios')
   
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')

    api.add_resource(resources.LibrosResource, '/libros')

    api.add_resource(resources.LibroResource, '/libro/<id>')

    api.add_resource(resources.PrestamosResource, '/prestamos')

    api.add_resource(resources.PrestamoResource, '/prestamo/<id>')

    api.add_resource(resources.ConfiguracionResource, '/configuracion')

    api.add_resource(resources.ValoracionResource, '/valoracion')

    api.add_resource(resources.NotificacionResource, '/notificacion/<id>')

    api.add_resource(resources.NotificacionesResource, '/notificaciones')

    api.add_resource(resources.AutorResource, '/autor/<id>')

    api.add_resource(resources.AutoresResource, '/autores')
   
    api.add_resource(resources.AsistenciasResource, '/asistencias')

    api.init_app(app)

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))

    jwt.init_app(app)

    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

    mailsender.init_app(app)

    from main.auth import routes
    app.register_blueprint(routes.auth)
     
    return app