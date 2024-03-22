from flask import request
from flask_restful import Resource


NOTIFICACIONES = {
    1: {
        'titulo': 'Notificación 1',
        'mensaje': 'Esta es la primera notificación'
    },
    2: {
        'titulo': 'Notificación 2',
        'mensaje': 'Esta es la segunda notificación'
    },
    3: {
        'titulo': 'Notificación 3',
        'mensaje': 'Esta es la tercera notificación'
    }
}

class Notificacion(Resource):

    def post(self):
        data = request.get_json()
        id = int(max(NOTIFICACIONES.keys()))+1
        NOTIFICACIONES[id] = data
        return NOTIFICACIONES[id], 201