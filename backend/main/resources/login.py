from flask_restful import Resource
from flask import request

class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        if username == 'admin' and password == 'admin':
            return {'message': 'Login success'}, 200
        return '', 201