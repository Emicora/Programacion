from flask import request
from flask_restful import Resource

LIBROS = {
    1: {'nombre': 'Cien años de soledad', 'autor':'Gabriel Garcia Márquez', 'editorial':'Sudamericana'},
    2: {'nombre': '1984', 'autor': 'George Orwell', 'editorial':'Secker & Warburg'},
}
    
class Libro(Resource):

    def get(self, id):
        if int(id) in LIBROS:
            return LIBROS[int(id)]
        return '', 404
    
    def delete(self, id):
        if int(id) in LIBROS:
            del LIBROS[int(id)]
            return '', 204
        return '', 404
    
    def put(self, id):
        if int(id) in LIBROS:
            animal = LIBROS[int(id)]
            data = request.get_json()
            animal.update(data)
            return '', 201
        return '', 404
class Libros(Resource):
    
    def get(self):
        return LIBROS
    LIBROS
    def post(self):
        animal = request.get_json()
        id = int(max(LIBROS.keys()))+1
        LIBROS[id] = animal
        return LIBROS[id], 201