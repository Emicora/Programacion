from flask import request
from flask_restful import Resource

PRESTAMOS = {
    1: {'titulo': '1984', 'autor': 'George Orwell', 'fecha_prestamo': '2022-01-01', 'fecha_devolucion': '2022-01-15'},
    2: {'titulo': 'To Kill a Mockingbird', 'autor': 'Harper Lee', 'fecha_prestamo': '2022-01-03', 'fecha_devolucion': '2022-01-17'},
    3: {'titulo': 'The Great Gatsby', 'autor': 'F. Scott Fitzgerald', 'fecha_prestamo': '2022-01-05', 'fecha_devolucion': '2022-01-19'},
}
    
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
            animal = PRESTAMOS[int(id)]
            data = request.get_json()
            animal.update(data)
            return '', 201
        return '', 404

class Prestamos(Resource):

    def get(self):
        return PRESTAMOS
    
    def post(self):
        animal = request.get_json()
        id = int(max(PRESTAMOS.keys()))+1
        PRESTAMOS[id] = animal
        return PRESTAMOS[id], 201