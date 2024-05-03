from flask_restful import Resource
from flask import jsonify, request
from main.models import UsuariosModel
from .. import db

class Usuario(Resource): 
    def get(self, id):
       usuario = db.session.query(UsuariosModel).get_or_404(id) 
       return usuario.to_json()

    def delete(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204

    def put(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201   


class Usuarios(Resource):
 
    def get(self):
        page = 1
        per_page = 10
        usuarios = db.session.query(UsuariosModel)
        if request.args:
            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

        if request.args.get('nombre'):
            usuarios = usuarios.filter(UsuariosModel.nombre.like('%' + request.args.get('nombre') + '%'))

        if request.args.get('apellidos'):
            usuarios = usuarios.filter(UsuariosModel.apellidos.like('%' + request.args.get('apellidos') + '%'))

        if request.args.get('email'):
            usuarios = usuarios.filter(UsuariosModel.email.like('%' + request.args.get('email') + '%'))

        if request.args.get('telefono'):
            usuarios = usuarios.filter(UsuariosModel.telefono.like('%' + request.args.get('telefono') + '%'))

        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.nombre)
            if request.args.get('sortby_nombre') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.nombre.desc())

        if request.args.get('sortby_apellidos'):
            if request.args.get('sortby_apellidos') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.apellidos)
            if request.args.get('sortby_apellidos') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.apellidos.desc())

        if request.args.get('sortby_email'):
            if request.args.get('sortby_email') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.email)
            if request.args.get('sortby_email') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.email.desc())

        if request.args.get('sortby_telefono'):
            if request.args.get('sortby_telefono') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.telefono)
            if request.args.get('sortby_telefono') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.telefono.desc())

        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)
        
        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios.items],
                        'total': usuarios.total,
                        'pages': usuarios.pages,
                        'page': page
                        })
    def post(self): 
        usuario = UsuariosModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201