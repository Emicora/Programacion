from flask import request
from main.models import NotificacionesModel
from .. import db
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Notificacion(Resource):

    def get(self, id):
        notificacion = db.session.query(NotificacionesModel).get_or_404(id)
        return notificacion.to_json()

    @role_required(roles=['admin'])
    def delete(self, id):
        notificacion = db.session.query(NotificacionesModel).get_or_404(id)
        db.session.delete(notificacion)
        db.session.commit()
        return '', 204

    def put(self, id):
        notificacion = db.session.query(NotificacionesModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(notificacion, key, value)
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201

class Notificaciones(Resource):

    def get(self):
        notificaciones = db.session.query(NotificacionesModel).all()
        return [notificacion.to_json() for notificacion in notificaciones]

    @role_required(roles=['admin'])
    def post(self):
        notificacion = NotificacionesModel.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(), 201