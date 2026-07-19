from flask import Flask, render_template, jsonify
import sqlite3
import requests
import datetime
import os

app = Flask(__name__)
DB_PATH = 'quotes.db'
EXTERNAL_API_URL = 'https://dummyjson.com/quotes/random'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate_quote', methods=['GET'])
def generate_quote():
    try:
        # Fetch a random quote from the external API
        response = requests.get(EXTERNAL_API_URL)
        response.raise_for_status()
        data = response.json()
        
        quote_text = data.get('quote', 'No quote found.')
        author = data.get('author', 'Unknown')
        
        # Save to database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO recently_viewed (quote_text, author) VALUES (?, ?)',
            (quote_text, author)
        )
        conn.commit()
        conn.close()
        
        return jsonify({
            'quote': quote_text,
            'author': author,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        conn = get_db_connection()
        # Fetching all history ordered by newest first
        history = conn.execute('SELECT * FROM recently_viewed ORDER BY date_added DESC').fetchall()
        conn.close()
        
        # Convert rows to dictionaries
        history_list = []
        for row in history:
            history_list.append({
                'id': row['id'],
                'quote': row['quote_text'],
                'author': row['author'],
                'date_added': row['date_added']
            })
            
        return jsonify({'history': history_list, 'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    # Ensure db exists
    if not os.path.exists(DB_PATH):
        import init_db
        init_db.init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
