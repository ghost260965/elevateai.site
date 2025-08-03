from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'c4yassinevan@gmail.com'
app.config['MAIL_PASSWORD'] = 'syxb bymh dygi shvo'
mail = Mail(app)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('contacts.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            message TEXT,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Store in database
    conn = sqlite3.connect('contacts.db')
    c = conn.cursor()
    c.execute('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', (name, email, message))
    conn.commit()
    conn.close()

    # Send confirmation email
    msg = Message(
        subject='Thank you for contacting ElevateAI!',
        sender=app.config['MAIL_USERNAME'],
        recipients=[email],
        body=f"Hi {name},\n\nThank you for reaching out! We received your message and will get back to you soon.\n\nBest,\nElevateAI Team"
    )
    #import pdb; pdb.set_trace()
    mail.send(msg)

    return jsonify({'message': 'Contact saved and email sent!'})

if __name__ == '__main__':
    app.run(debug=True)