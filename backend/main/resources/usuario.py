from flask_restful import Resource
from flask import request
from main.models import UsuariosModel
from .. import db

USUARIOS = {
    1: {'nombre':'Boby', 'mail':'boby@gmail.com'},
    2: {'nombre':'Peter', 'mail':'peter@gmail.com'}
}

class Usuario(Resource): 
    def get(self, id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        return usuario.to_json()
    
    def delete(self, id):

        if int(id) in USUARIOS:
         
            del USUARIOS[int(id)]
            return '', 204
     
        return '', 404

    def put(self, id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            data = request.get_json()
            usuario.update(data)
            return '', 201
        return '', 404


class Usuarios(Resource):
 
    def get(self):
        return USUARIOS

    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201    