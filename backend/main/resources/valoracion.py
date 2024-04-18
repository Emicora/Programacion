from flask import request, jsonify
from flask_restful import Resource
from main.models import ValoracionesModel
from .. import db


class Valoracion(Resource):

    def get(self):
        valoracion = db.session.query(ValoracionesModel).all()
        return jsonify([valoracion.to_json() for valoracion in valoracion])

    def post(self):
        valoracion = ValoracionesModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201