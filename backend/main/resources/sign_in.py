from flask_restful import Resource
from flask import request

class SignIn(Resource):
   
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        # Aquí deberías crear un nuevo usuario en la base de datos
        if not username or not password:
            return {'message': 'Username and password required'}, 400  # Bad Request
        return {'message': 'User created successfully'}, 201  # Created