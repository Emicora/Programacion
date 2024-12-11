from flask import request, jsonify
from flask_restful import Resource
from sqlalchemy import func, desc
from .. import db
from main.models import ValoracionesModel
from main.auth.decorators import role_required

class Valoracion(Resource):

    def get(self, id):
        valoracion = db.session.query(ValoracionesModel).get_or_404(id)
        return valoracion.to_json()
    

    def put(self, id):
        valoracion = db.session.query(ValoracionesModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(valoracion, key, value)
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201

    def delete(self, id):
        valoracion = db.session.query(ValoracionesModel).get_or_404(id)
        db.session.delete(valoracion)
        db.session.commit()
        return '', 204  # No devuelve datos
    


class Valoraciones(Resource):

    def get(self):
        page = 1
        per_page = 10
        valoraciones = db.session.query(ValoracionesModel)

        # Aplicar filtros si están presentes
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
            if request.args.get('id_usuario'):
                valoraciones = valoraciones.filter(ValoracionesModel.id_usuario == request.args.get('id_usuario'))

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

        # Calcular promedios agrupados por id_libro
        promedio_valoraciones = db.session.query(
            ValoracionesModel.id_libro,
            func.avg(ValoracionesModel.valoracion).label('promedio')
        ).group_by(
            ValoracionesModel.id_libro
        ).order_by(
            desc('promedio')
        ).paginate(page=page, per_page=per_page, error_out=False)

        # Generar respuesta JSON
        promedios = [{'id_libro': r.id_libro, 'promedio': round(r.promedio, 2)} for r in promedio_valoraciones.items]
        lista_id_libros = [r.id_libro for r in promedio_valoraciones.items]

        return jsonify({
            'filtros_aplicados': [valoracion.to_json() for valoracion in valoraciones.paginate(page=page, per_page=per_page, error_out=False).items],
            'promedios': promedios,
            'ordenados': lista_id_libros,
            'total': promedio_valoraciones.total,
            'pages': promedio_valoraciones.pages,
            'page': page
        })

    
    def post(self):
        valoracion = ValoracionesModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201
    

