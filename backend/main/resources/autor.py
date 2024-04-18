from main.models import AutoresModel
from flask_restful import Resource
from flask import request
from flask import jsonify
from .. import db

class Autor(Resource):

    def get(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        return autor.to_json()

    def delete(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        db.session.delete(autor)
        db.session.commit()
        return '', 204

    def put(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(autor, key, value)
        db.session.add(autor)
        db.session.commit()
        return autor.to_json(), 201
    
class Autores(Resource):

    def get(self):
        autores = db.session.query(AutoresModel).all()
        return jsonify([autor.to_json() for autor in autores])

    def post(self):
        autor = AutoresModel.from_json(request.get_json())
        db.session.add(autor)
        db.session.commit()
        return autor.to_json(), 201