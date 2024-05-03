from flask_restful import Resource
from main.models import PrestamosModel
from .. import db
from flask import request
from flask import jsonify
from sqlalchemy import func, desc, asc

class Prestamo(Resource): 
    def get(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        return prestamo.to_json()

    def delete(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return '', 204

    def put(self, id):
        prestamo = db.session.query(PrestamosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201

class Prestamos(Resource):
    def get(self):
        page = 1
        per_page = 10
        prestamos = db.session.query(PrestamosModel)
        if request.args:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

        if request.args.get('fecha_prestamo'):
            prestamos = prestamos.filter(PrestamosModel.fecha_prestamo.like('%' + request.args.get('fecha_prestamo') + '%'))

        if request.args.get('fecha_devolucion'):
            prestamos = prestamos.filter(PrestamosModel.fecha_devolucion.like('%' + request.args.get('fecha_devolucion') + '%'))

        if request.args.get('id_libro'):
            prestamos = prestamos.filter(PrestamosModel.id_libro == request.args.get('id_libro'))

        if request.args.get('id_usuario'):
            prestamos = prestamos.filter(PrestamosModel.id_usuario == request.args.get('id_usuario'))

        if request.args.get('sortby_fecha_prestamo'):
            if request.args.get('sortby_fecha_prestamo') == 'asc':
                prestamos = prestamos.order_by(PrestamosModel.fecha_prestamo)
            if request.args.get('sortby_fecha_prestamo') == 'desc':
                prestamos = prestamos.order_by(PrestamosModel.fecha_prestamo.desc())

        if request.args.get('sortby_fecha_devolucion'):
            if request.args.get('sortby_fecha_devolucion') == 'asc':
                prestamos = prestamos.order_by(PrestamosModel.fecha_devolucion)
            if request.args.get('sortby_fecha_devolucion') == 'desc':
                prestamos = prestamos.order_by(PrestamosModel.fecha_devolucion.desc())

        if request.args.get('sortby_id_libro'):
            if request.args.get('sortby_id_libro') == 'asc':
                prestamos = prestamos.order_by(PrestamosModel.id_libro)
            if request.args.get('sortby_id_libro') == 'desc':
                prestamos = prestamos.order_by(PrestamosModel.id_libro.desc())

        if request.args.get('sortby_id_usuario'):
            if request.args.get('sortby_id_usuario') == 'asc':
                prestamos = prestamos.order_by(PrestamosModel.id_usuario)
            if request.args.get('sortby_id_usuario') == 'desc':
                prestamos = prestamos.order_by(PrestamosModel.id_usuario.desc())

        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'prestamos': [prestamo.to_json() for prestamo in prestamos.items],
                        'total': prestamos.total,
                        'pages': prestamos.pages,
                        'page': page
                        })
    
    def post(self):
        prestamo = PrestamosModel.from_json(request.get_json())
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201