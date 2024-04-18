from flask_restful import Resource
from main.models import ComentariosModel
from .. import db
from flask import request

class Comentario(Resource):

    def get(self, id):
        comentario = db.session.query(ComentariosModel).get_or_404(id)
        return comentario.to_json()

    def put(self, id):
        comentario = db.session.query(ComentariosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(comentario, key, value)
        db.session.add(comentario)
        db.session.commit()
        return comentario.to_json(), 201
    
class Comentarios(Resource):

    def post(self):
        comentario = ComentariosModel.from_json(request.get_json())
        db.session.add(comentario)
        db.session.commit()
        return comentario.to_json(), 201