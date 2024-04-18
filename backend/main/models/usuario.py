from .. import db

class Usuarios(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True)    
    nombre = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)

    def to_json(self):
        usuario_json = {
            'id_usuario': self.id_usuario,
            'nombre': self.nombre,
            'mail': self.mail,
            'contrasena': self.contrasena,
            'rol': self.rol
        }
        return usuario_json


    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        id_usuario = usuario_json.get('id_usuario')
        nombre = usuario_json.get('nombre')
        mail = usuario_json.get('mail')
        contrasena = usuario_json.get('contrasena')
        rol = usuario_json.get('rol')

        return Usuarios(id_usuario=id_usuario, 
                        nombre=nombre, 
                        mail=mail, 
                        contrasena=contrasena, 
                        rol=rol)
