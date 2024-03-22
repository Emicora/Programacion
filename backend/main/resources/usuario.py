from flask import request
from flask_restful import Resource

USUARIOS = {
    1: {'nombre': 'Juan', 'apellido':'Perez', 'mail': 'juan.perez@example.com'},
    2: {'nombre': 'Maria', 'apellido': 'Gomez', 'mail': 'maria.gomez@example.com'},
}
    
class Usuario(Resource):

    def get(self, id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return '', 404
    
    def delete(self, id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return '', 204
        return '', 404
    
    def put(self, id):
        if int(id) in USUARIOS:
            animal = USUARIOS[int(id)]
            data = request.get_json()
            animal.update(data)
            return '', 201
        return '', 404

class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        animal = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = animal
        return USUARIOS[id], 201
        