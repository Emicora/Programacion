from flask_restful import Resource
from flask import jsonify, request
from main.models import UsuariosModel
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required
from sqlalchemy import func, desc , asc

class Usuario(Resource): 
    @jwt_required(optional=True)
    def get(self,id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        current_identity = get_jwt_identity()
        if current_identity:
            return usuario.to_json()
        else:
            return usuario.to_json_short()

    @role_required(roles=['admin','user'])
    def delete(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204

    @role_required(roles=['admin','user'])
    def put(self, id):
        usuario = db.session.query(UsuariosModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201   


class Usuarios(Resource):

    @role_required(['admin'])
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

        if request.args.get('email'):
            usuarios = usuarios.filter(UsuariosModel.mail.like('%' + request.args.get('mail') + '%'))

        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.nombre)
            if request.args.get('sortby_nombre') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.nombre.desc())

        if request.args.get('sortby_mail'):
            if request.args.get('sortby_email') == 'asc':
                usuarios = usuarios.order_by(UsuariosModel.mail)
            if request.args.get('sortby_email') == 'desc':
                usuarios = usuarios.order_by(UsuariosModel.mail.desc())

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