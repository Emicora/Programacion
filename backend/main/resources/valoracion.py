from flask import request
from flask_restful import Resource


VALORACIONES = {
    1: {
        'id': 1,
        'rating': 4,
        'comment': 'Buen producto!'
    },
    2: {
        'id': 2,
        'rating': 5,
        'comment': 'Excelente servicio!'
    }
}

class Valoracion(Resource):

    def post(self):
        data = request.get_json()
        id = int(max(VALORACIONES.keys()))+1
        VALORACIONES[id] = data
        return VALORACIONES[id], 201
