from .. import db   

class Valoraciones(db.Model):

    id_valoracion = db.Column(db.Integer, primary_key=True)
    id_libro = db.Column(db.Integer, db.ForeignKey('libros.id_libro'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    valoracion = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(50), nullable=False)
    usuario = db.relationship('Usuario', back_populates='valoraciones', uselist=False, single_parent=True)
    libro = db.relationship('Libro', back_populates='valoraciones', uselist=False, single_parent=True)
    
    def to_json(self):
        valoracion_json = {
            'id_valoracion': self.id_valoracion,
            'id_libro': self.id_libro,
            'id_usuario': self.id_usuario,
            'valoracion': self.valoracion,
            'comentario': self.comentario,
        }
        return valoracion_json

    @staticmethod
    def from_json(valoracion_json):
        id_valoracion = valoracion_json.get('id_valoracion')
        id_libro = valoracion_json.get('id_libro')
        id_usuario = valoracion_json.get('id_usuario')
        valoracion = valoracion_json.get('valoracion')
        comentario = valoracion_json.get('comentario')

        return Valoraciones(id_valoracion=id_valoracion, 
                            id_libro=id_libro, 
                            id_usuario=id_usuario, 
                            valoracion=valoracion, 
                            comentario=comentario)