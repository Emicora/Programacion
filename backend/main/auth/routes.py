from flask import request, jsonify, Blueprint
from .. import db
from main.models import UsuariosModel
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from main.mail.functions import sendMail

#Blueprint para acceder a los métodos de autenticación
auth = Blueprint('auth', __name__, url_prefix='/auth')

#Método de logueo
@auth.route('/login', methods=['POST'])
def login():
    #Busca al usuario en la db por mail
    usuario = db.session.query(UsuariosModel).filter(UsuariosModel.mail == request.get_json().get("mail")).first_or_404()
    #Valida la contraseña
    if usuario.check_password(request.get_json().get("contrasena")):
        #Genera un nuevo token
        #Pasa el objeto usuario como identidad
        access_token = create_access_token(identity=usuario)
        #Devolver valores y token
        data = {
            'id': str(usuario.id_usuario),
            'correo': usuario.mail,
            'access_token': access_token,
            "rol": usuario.rol
        }

        return data, 200
    else:
        return 'Incorrect password', 401

#Método de registro
@auth.route('/register', methods=['POST'])
def signin():
    #Obtener usuario
    usuario = UsuariosModel.from_json(request.get_json())
    #Verificar si el mail ya existe en la db, scalar() para saber la cantidad de ese correo
    exists = db.session.query(UsuariosModel).filter(UsuariosModel.mail == usuario.mail).scalar() is not None
    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            #Agregar usuario a DB
            db.session.add(usuario)
            db.session.commit()
            send = sendMail([usuario.mail],"Welcome!",'register',usuario = usuario)
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return usuario.to_json() , 201