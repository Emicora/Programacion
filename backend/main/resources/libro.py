from flask_restful import Resource
from main.models import LibrosModel
from flask import jsonify, request
from .. import db
from flask import request


class Libro(Resource): 
    def get(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        return libro.to_json()

    def delete(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        db.session.delete(libro)
        db.session.commit()
        return '', 204

    def put(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201


class Libros(Resource):
 
    def get(self):
        libros = db.session.query(LibrosModel).all()
        return jsonify([libro.to_json() for libro in libros])

    def post(self):
        libro = LibrosModel.from_json(request.get_json())
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201