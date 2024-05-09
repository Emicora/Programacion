from flask import request, jsonify
from flask_restful import Resource
from main.models import ValoracionesModel
from .. import db
from sqlalchemy import func, desc, asc


class Valoracion(Resource):

    def get(self):
        page = 1
        per_page = 10
        valoraciones = db.session.query(ValoracionesModel)
        if request.args:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

        if request.args.get('id_valoracion'):
            valoraciones = valoraciones.filter(ValoracionesModel.id_valoracion == request.args.get('id_valoracion'))

        if request.args.get('valoracion'):
            valoraciones = valoraciones.filter(ValoracionesModel.valoracion == request.args.get('valoracion'))

        if request.args.get('comentario'):
            valoraciones = valoraciones.filter(ValoracionesModel.comentario.like('%' + request.args.get('comentario') + '%'))

        if request.args.get('id_libro'):
            valoraciones = valoraciones.filter(ValoracionesModel.id_libro == request.args.get('id_libro'))

        if request.args.get('sortby_valoracion'):
            if request.args.get('sortby_valoracion') == 'asc':
                valoraciones = valoraciones.order_by(ValoracionesModel.valoracion)
            if request.args.get('sortby_valoracion') == 'desc':
                valoraciones = valoraciones.order_by(ValoracionesModel.valoracion.desc())

        if request.args.get('sortby_comentario'):
            if request.args.get('sortby_comentario') == 'asc':
                valoraciones = valoraciones.order_by(ValoracionesModel.comentario)
            if request.args.get('sortby_comentario') == 'desc':
                valoraciones = valoraciones.order_by(ValoracionesModel.comentario.desc())

        if request.args.get('sortby_id_libro'):
            if request.args.get('sortby_id_libro') == 'asc':
                valoraciones = valoraciones.order_by(ValoracionesModel.id_libro)
            if request.args.get('sortby_id_libro') == 'desc':
                valoraciones = valoraciones.order_by(ValoracionesModel.id_libro.desc())

        valoraciones = valoraciones.paginate(page=page, per_page=per_page, error_out=True)
        
        return jsonify({'valoraciones': [valoracion.to_json() for valoracion in valoraciones.items],
                        'total': valoraciones.total,
                        'pages': valoraciones.pages,
                        'page': page
                        })

    def post(self):
        valoracion = ValoracionesModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201