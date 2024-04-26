from .. import db

class Prestamos(db.Model):
    id_prestamo = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    fecha_prestamo = db.Column(db.String, nullable=False)
    fecha_devolucion = db.Column(db.String, nullable=False)

    usuario = db.relationship('Usuarios', back_populates='prestamos', cascade='all, delete-orphan', uselist=False, single_parent=True)
    libro = db.relationship('Libros', back_populates='prestamo', cascade='all, delete-orphan')

    def to_json(self):
        prestamo_json = {
            'id_prestamo': self.id_prestamo,
            'id_usuario': self.id_usuario,
            'fecha_prestamo': self.fecha_prestamo,
            'fecha_devolucion': self.fecha_devolucion,
        }
        return prestamo_json

    @staticmethod
    def from_json(prestamo_json):
        id_prestamo = prestamo_json.get('id_prestamo')
        id_usuario = prestamo_json.get('id_usuario')
        fecha_prestamo = prestamo_json.get('fecha_prestamo')
        fecha_devolucion = prestamo_json.get('fecha_devolucion')

        return Prestamos(id_prestamo=id_prestamo, 
                        id_usuario=id_usuario, 
                        fecha_prestamo=fecha_prestamo, 
                        fecha_devolucion=fecha_devolucion)