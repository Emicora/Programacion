from .. import db

class Comentarios(db.Model):
    id_comentario = db.Column(db.Integer, primary_key=True)
    id_libro = db.Column(db.Integer, db.ForeignKey('libros.id_libro'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    comentario = db.Column(db.String(50), nullable=False)
    fecha_comentario = db.Column(db.String, nullable=False)

    def to_json(self):
        comentario_json = {
            'id_comentario': self.id_comentario,
            'id_libro': self.id_libro,
            'id_usuario': self.id_usuario,
            'comentario': self.comentario,
            'fecha_comentario': self.fecha_comentario,
        }
        return comentario_json

    @staticmethod
    def from_json(comentario_json):
        id_comentario = comentario_json.get('id_comentario')
        id_libro = comentario_json.get('id_libro')
        id_usuario = comentario_json.get('id_usuario')
        comentario = comentario_json.get('comentario')
        fecha_comentario = comentario_json.get('fecha_comentario')

        return Comentarios(id_comentario=id_comentario, 
                          id_libro=id_libro, 
                          id_usuario=id_usuario, 
                          comentario=comentario, 
                          fecha_comentario=fecha_comentario)