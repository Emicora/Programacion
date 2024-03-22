from flask_restful import Resource
from flask import request

PRESTAMOS = {
    1:  {'id_usuario': 1, 'id_libro': 1, 'fecha_prestamo': '2021-01-01', 'fecha_devolucion': '2021-01-15'},
    2:  {'id_usuario': 1, 'id_libro': 2, 'fecha_prestamo': '2021-01-01', 'fecha_devolucion': '2021-01-15'}}

class Prestamo(Resource): 
    def get(self, id):
        if int(id) in PRESTAMOS:
            return PRESTAMOS[int(id)]
        return '', 404

    def delete(self, id):
        if int(id) in PRESTAMOS:
            del PRESTAMOS[int(id)]
            return '', 204
        return '', 404

    def put(self, id):
        if int(id) in PRESTAMOS:
            prestamo = PRESTAMOS[int(id)]
            data = request.get_json()
            prestamo.update(data)
            return '', 201
        return '', 404

class Prestamos(Resource):
    def get(self):
        return PRESTAMOS

    def post(self):
        data = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        id = '%i' % id
        PRESTAMOS[id] = data
        return '', 201