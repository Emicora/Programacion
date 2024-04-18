from flask_restful import Resource
from main.models import PrestamosModel
from .. import db
from flask import request

class Prestamo(Resource): 
    def get(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        return prestamo.to_json()

    def delete(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return '', 204

    def put(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201

class Prestamos(Resource):
    def get(self):
        prestamos = db.session.query(PrestamosModel).all()
        return jsonify([prestamo.to_json() for prestamo in prestamos])
    
    def post(self):
        prestamo = PrestamosModel.from_json(request.get_json())
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201