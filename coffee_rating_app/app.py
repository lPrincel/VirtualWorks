from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = 'coffees.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    coffees = conn.execute('SELECT * FROM coffees_table ORDER BY votes DESC').fetchall()
    conn.close()
    return render_template('index.html', coffees=coffees)

@app.route('/vote/<int:coffee_id>', methods=['POST'])
def vote(coffee_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if coffee exists
    coffee = cursor.execute('SELECT * FROM coffees_table WHERE coffee_id = ?', (coffee_id,)).fetchone()
    if not coffee:
        conn.close()
        return jsonify({'error': 'Coffee not found'}), 404
        
    # Update votes
    cursor.execute('UPDATE coffees_table SET votes = votes + 1 WHERE coffee_id = ?', (coffee_id,))
    conn.commit()
    
    # Fetch updated vote count
    updated_coffee = cursor.execute('SELECT votes FROM coffees_table WHERE coffee_id = ?', (coffee_id,)).fetchone()
    updated_votes = updated_coffee['votes']
    
    conn.close()
    return jsonify({'votes': updated_votes})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
