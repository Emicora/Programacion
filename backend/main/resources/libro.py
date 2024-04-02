from flask_restful import Resource
from flask import request

LIBROS = {
    1: {'nombre':'Las Cronicas de Narnia', 'autor':'C. S. Lewis'},
    2: {'nombre':'El principito', 'autor':'Antoine de Saint-Exupery'}
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
            libro = LIBROS[int(id)]
            data = request.get_json()
            libro.update(data)
            return '', 201
        return '', 404


class Libros(Resource):
 
    def get(self):
        return LIBROS

    def post(self):
        libro = request.get_json()
        id = int(max(LIBROS.keys()))+1
        LIBROS[id] = libro
        return LIBROS[id], 201