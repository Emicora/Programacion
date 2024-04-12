from .. import db

class Usuario(db.Model):
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