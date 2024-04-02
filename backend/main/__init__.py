from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api

import main.resources as resources

api = Api()

def create_app():
  
    app = Flask(__name__)

    load_dotenv()
    
    api.add_resource(resources.UsuariosResource, '/usuarios')
   
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')

    api.add_resource(resources.LibrosResource, '/libros')

    api.add_resource(resources.LibroResource, '/libro/<id>')

    api.add_resource(resources.PrestamosResource, '/prestamos')

    api.add_resource(resources.PrestamoResource, '/prestamo/<id>')

    api.add_resource(resources.LoginResource, '/login')

    api.add_resource(resources.SignInResource, '/sign-in')

    api.add_resource(resources.ConfiguracionResource, '/configuracion')

    api.add_resource(resources.ComentarioResource, '/comentario')

    api.add_resource(resources.ValoracionResource, '/valoracion')

    api.add_resource(resources.NotificacionResource, '/notificacion')
   
    api.init_app(app)
   
    return app