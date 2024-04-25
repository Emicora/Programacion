from .. import db

class Notificaciones(db.Model):

    id_notificacion = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    mensaje = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.String, nullable=False)
    usuario = db.relationship('Usuarios', back_populates='notificaciones', uselist=False, single_parent=True)

    def to_json(self):
        notificacion_json = {
            'id_notificacion': self.id_notificacion,
            'id_usuario': self.id_usuario,
            'mensaje': self.mensaje,
            'fecha': self.fecha,
        }
        return notificacion_json

    @staticmethod
    def from_json(notificacion_json):
        id_notificacion = notificacion_json.get('id_notificacion')
        id_usuario = notificacion_json.get('id_usuario')
        mensaje = notificacion_json.get('mensaje')
        fecha = notificacion_json.get('fecha')

        return Notificaciones(id_notificacion=id_notificacion, 
                            id_usuario=id_usuario, 
                            mensaje=mensaje, 
                            fecha=fecha)