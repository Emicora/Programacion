
from .. import db

class Libros(db.Model):
    id_libro = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(50), nullable=False)
    editorial = db.Column(db.String(50), nullable=False)
    fecha_publicacion = db.Column(db.String, nullable=False)
    num_paginas = db.Column(db.Integer, nullable=False)
    isbn = db.Column(db.String(50), nullable=False)
    genero = db.Column(db.String(50), nullable=False)
    disponibles = db.Column(db.Integer, nullable=False)
    autor = db.Column(db.String(50), nullable=False)
     
    valoraciones = db.relationship('Valoraciones', back_populates='libro', cascade='all, delete-orphan')
    prestamo = db.relationship('Prestamos', back_populates='libro', uselist=False, single_parent=True)


    def to_json(self):
        libro_json = {
            'id_libro': self.id_libro,
            'titulo': self.titulo,
            'editorial': self.editorial,
            'fecha_publicacion': self.fecha_publicacion,
            'num_paginas': self.num_paginas,
            'isbn': self.isbn,
            'genero': self.genero,
            'disponibles': self.disponibles,
            'autor': self.autor,
        }
        return libro_json

    @staticmethod
    def from_json(libro_json):
        id_libro = libro_json.get('id_libro')
        titulo = libro_json.get('titulo')
        editorial = libro_json.get('editorial')
        fecha_publicacion = libro_json.get('fecha_publicacion')
        num_paginas = libro_json.get('num_paginas')
        isbn = libro_json.get('isbn')
        genero = libro_json.get('genero')
        disponibles = libro_json.get('disponibles')
        autor = libro_json.get('autor')

        return Libros(id_libro=id_libro, 
                      titulo=titulo, 
                      editorial=editorial, 
                      fecha_publicacion=fecha_publicacion, 
                      num_paginas=num_paginas, 
                      isbn=isbn, 
                      genero=genero,
                      disponibles=disponibles,
                      autor=autor)