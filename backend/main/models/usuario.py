from .. import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    mail = db.Column(db.String(100), nullable=False)
    contraseña = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(100), nullable=False)
    

    
    #Convertir objeto en JSON
    def to_json(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'mail': str(self.mail),
            'contraseña': str(self.contraseña),
            'rol': str(self.rol),
        }
        return usuario_json
