from flask_restful import Resource
from flask import jsonify, request
from main.models import UsuariosModel
from .. import db

class Usuario(Resource): 
    def get(self, id):
       usuario = db.session.query(UsuariosModel).get_or_404(id) 
       return usuario.to_json()

    def delete(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204

    def put(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201   


class Usuarios(Resource):
 
    def get(self):
        usuarios = db.session.query(UsuariosModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])

    def post(self): 
        usuario = UsuariosModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201