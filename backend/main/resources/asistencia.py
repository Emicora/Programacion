from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import LibroAutorModel

class Asistencias(Resource):

    def post(self):
        id_libro = request.json.get('id_libro')
        id_autor = request.json.get('id_autor')

        if id_libro is None:
            return {'message': 'El id del libro es requerido'}, 400
        
        if id_autor is None:
            return {'message': 'El id del autor es requerido'}, 400
        
        query = LibroAutorModel.insert().values(id_libro=id_libro, id_autor=id_autor)
        try:
            db.session.execute(query)
            db.session.commit()
        except:
            return 'Formato no correcto ', 400
        return 'Creado con exito', 201 
    
    
    

