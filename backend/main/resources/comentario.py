from flask_restful import Resource
from flask import request

COMENTARIOS = {
    1: {'nombre': 'Juan', 'apellido':'Perez', 'mail': 'juan@example.com', 'comentario': 'Este es un ejemplo de comentario'},
    2: {'nombre': 'Maria', 'apellido':'Lopez', 'mail': 'maria@example.com', 'comentario': 'Otro ejemplo de comentario'},
}

class Comentario(Resource):
    
    def get(self):
        return COMENTARIOS        
        
    def put(self, id):
        if int(id) in COMENTARIOS:
            comentario = COMENTARIOS[int(id)]
            data = request.get_json()
            comentario.update(data)
            return '', 201
        return '', 404