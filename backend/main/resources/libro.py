from flask_restful import Resource
from main.models import LibrosModel, AutoresModel, ValoracionesModel, PrestamosModel
from flask import jsonify, request
from .. import db
from flask import request
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Libro(Resource): 
    def get(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        return libro.to_json()

    @role_required(roles=['admin'])
    def delete(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        db.session.delete(libro)
        db.session.commit()
        return '', 204

   
    def put(self, id):
        libro = db.session.query(LibrosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201



 
class Libros(Resource):
    def get(self):
        page = 1
        per_page = 10
        libros = db.session.query(LibrosModel)
        
        if request.args:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

        # Filtro por `disponibles > 0`
        libros = libros.filter(LibrosModel.disponibles > 0)

        if request.args.get('titulo'):
            libros = libros.filter(LibrosModel.titulo.like(request.args.get('titulo') + '%'))

        if request.args.get('editorial'):
            libros = libros.filter(LibrosModel.editorial.like('%' + request.args.get('editorial') + '%'))

        if request.args.get('genero'):
            libros = libros.filter(LibrosModel.genero.like('%' + request.args.get('genero') + '%'))

        if request.args.get('isbn'):
            libros = libros.filter(LibrosModel.isbn.like('%' + request.args.get('isbn') + '%'))

        if request.args.get('id_libro'):
            libros = libros.filter(LibrosModel.id_libro == request.args.get('id_libro'))

        if request.args.get('id_prestamo'):
            libros = libros.filter(LibrosModel.id_prestamo == request.args.get('id_prestamo'))

        if request.args.get('sortby_num_paginas'):
            if request.args.get('sortby_num_paginas') == 'asc':
                libros = libros.order_by(LibrosModel.num_paginas)
            if request.args.get('sortby_num_paginas') == 'desc':
                libros = libros.order_by(LibrosModel.num_paginas.desc())

        if request.args.get('sortby_titulo'):
            if request.args.get('sortby_titulo') == 'asc':
                libros = libros.order_by(LibrosModel.titulo)
            if request.args.get('sortby_titulo') == 'desc':
                libros = libros.order_by(LibrosModel.titulo.desc())

        if request.args.get('sortby_genero'):
            if request.args.get('sortby_genero') == 'asc':
                libros = libros.order_by(LibrosModel.genero)
            if request.args.get('sortby_genero') == 'desc':
                libros = libros.order_by(LibrosModel.genero.desc())

        if request.args.get('sortby_nrPrestamos'):
            if request.args.get('sortby_nrPrestamos') == 'asc':
                libros = libros.outerjoin(PrestamosModel).group_by(LibrosModel.id_libro).order_by(db.func.count(PrestamosModel.id_prestamo).asc())
            if request.args.get('sortby_nrPrestamos') == 'desc':
                libros = libros.outerjoin(PrestamosModel).group_by(LibrosModel.id_libro).order_by(db.func.count(PrestamosModel.id_prestamo).desc())

        if request.args.get('sortby_nrAutores'):
            if request.args.get('sortby_nrAutores') == 'asc':
                libros = libros.outerjoin(LibrosModel.autores).group_by(LibrosModel.id_libro).order_by(db.func.count(AutoresModel.id_autor).asc())
            if request.args.get('sortby_nrAutores') == 'desc':
                libros = libros.outerjoin(LibrosModel.autores).group_by(LibrosModel.id_libro).order_by(db.func.count(AutoresModel.id_autor).desc())
                
        libros = libros.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({
            'libros': [libro.to_json() for libro in libros],
            'total': libros.total,
            'pages': libros.pages,
            'page': page
        })

    
    @role_required(roles=['admin'])
    def post(self):
        autores_id = request.get_json().get('autores')
        libro = LibrosModel.from_json(request.get_json())
        if autores_id:
            autores = db.session.query(AutoresModel).filter(AutoresModel.id_autor.in_(autores_id)).all()
            libro.autores.extend(autores)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201