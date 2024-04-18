from .. import db

class Autores(db.Model):

    id_autor = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    nacionalidad = db.Column(db.String(50), nullable=False)
    fecha_nacimiento = db.Column(db.String, nullable=False)

    def to_json(self):
        autor_json = {
            'id_autor': self.id_autor,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'nacionalidad': self.nacionalidad,
            'fecha_nacimiento': self.fecha_nacimiento,
        }
        return autor_json

    @staticmethod
    def from_json(autor_json):
        id_autor = autor_json.get('id_autor')
        nombre = autor_json.get('nombre')
        apellido = autor_json.get('apellido')
        nacionalidad = autor_json.get('nacionalidad')
        fecha_nacimiento = autor_json.get('fecha_nacimiento')

        return Autores(id_autor=id_autor, 
                      nombre=nombre, 
                      apellido=apellido, 
                      nacionalidad=nacionalidad, 
                      fecha_nacimiento=fecha_nacimiento)