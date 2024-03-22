from main import create_app
import os

app = create_app()

app.app_context().push()

if __name__ == 'main':
    app.run(debug=True, port = os.getenv('PORT'))