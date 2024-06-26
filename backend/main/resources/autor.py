from main.models import AutoresModel
from flask_restful import Resource
from flask import request
from flask import jsonify
from .. import db
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Autor(Resource):

    def get(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        return autor.to_json()

    @role_required(['admin'])   
    def delete(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        db.session.delete(autor)
        db.session.commit()
        return '', 204

    @role_required(['admin'])   
    def put(self, id):
        autor = db.session.query(AutoresModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(autor, key, value)
        db.session.add(autor)
        db.session.commit()
        return autor.to_json(), 201
    
class Autores(Resource):

    def get(self):
        page = 1
        per_page = 10
        autores = db.session.query(AutoresModel)
        if request.args:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

        if request.args.get('nombre'):
            autores = autores.filter(AutoresModel.nombre.like('%' + request.args.get('nombre') + '%'))

        if request.args.get('apellido'):
            autores = autores.filter(AutoresModel.apellido.like('%' + request.args.get('apellido') + '%'))

        if request.args.get('fecha_nacimiento'):
            autores = autores.filter(AutoresModel.fecha_nacimiento.like('%' + request.args.get('fecha_nacimiento') + '%'))

        if request.args.get('id_autor'):
            autores = autores.filter(AutoresModel.id_autor == request.args.get('id_autor'))

        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == 'asc':
                autores = autores.order_by(AutoresModel.nombre)
            if request.args.get('sortby_nombre') == 'desc':
                autores = autores.order_by(AutoresModel.nombre.desc())

        if request.args.get('sortby_apellido'):
            if request.args.get('sortby_apellido') == 'asc':
                autores = autores.order_by(AutoresModel.apellido)
            if request.args.get('sortby_apellido') == 'desc':
                autores = autores.order_by(AutoresModel.apellido.desc())

        if request.args.get('sortby_fecha_nacimiento'):
            if request.args.get('sortby_fecha_nacimiento') == 'asc':
                autores = autores.order_by(AutoresModel.fecha_nacimiento)
            if request.args.get('sortby_fecha_nacimiento') == 'desc':
                autores = autores.order_by(AutoresModel.fecha_nacimiento.desc())

        autores = autores.paginate(page=page, per_page=per_page, error_out=True)
        
        return jsonify({'autores': [autor.to_json() for autor in autores.items],
                        'total': autores.total,
                        'pages': autores.pages,
                        'page': page})

    @role_required(['admin'])   
    def post(self):
        autor = AutoresModel.from_json(request.get_json())
        db.session.add(autor)
        db.session.commit()
        return autor.to_json(), 201