from flask_restful import Resource
from flask import request

class Signin(Resource):

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        if not username or not password:
            return {'message': 'Username and password required'}, 400  
        return {'message': 'User created successfully'}, 201  

    