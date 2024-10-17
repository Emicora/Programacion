from flask_restful import Resource
from flask import request

CONFIGURACION = {
    'nombre': 'Mi Aplicación',
    'version': '1.0',
    'modo': 'produccion'
}

class Configuracion(Resource):

    def get(self):
        return CONFIGURACION

    def put(self):
        data = request.get_json()
        CONFIGURACION.update(data)
        return '', 201
