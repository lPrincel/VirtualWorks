import sqlite3
import os
# pyrefly: ignore [missing-import]
from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)
DB_FILE = 'notes.db'

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Initialize db at startup
init_db()

def format_timestamp(ts_string):
    try:
        # Example: '2023-10-27 10:32:00' to 'Oct 27, 10:32 AM'
        dt = datetime.strptime(ts_string, "%Y-%m-%d %H:%M:%S")
        return dt.strftime("%b %d, %I:%M %p")
    except Exception:
        return ts_string

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes', methods=['GET'])
def get_notes():
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes ORDER BY timestamp DESC').fetchall()
    conn.close()
    
    notes_list = []
    for note in notes:
        notes_list.append({
            'id': note['id'],
            'content': note['content'],
            'timestamp': format_timestamp(note['timestamp']),
            'raw_timestamp': note['timestamp']
        })
    return jsonify(notes_list)

@app.route('/api/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({'error': 'Content is required'}), 400
    
    content = data['content'].strip()
    if not content:
        return jsonify({'error': 'Content cannot be empty'}), 400
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = get_db_connection()
    cursor = conn.execute('INSERT INTO notes (content, timestamp) VALUES (?, ?)', (content, timestamp))
    conn.commit()
    note_id = cursor.lastrowid
    conn.close()
    
    return jsonify({
        'id': note_id,
        'content': content,
        'timestamp': format_timestamp(timestamp),
        'raw_timestamp': timestamp
    }), 201

@app.route('/api/notes/<int:id>', methods=['PUT', 'PATCH'])
def update_note(id):
    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({'error': 'Content is required'}), 400
    
    content = data['content'].strip()
    if not content:
        return jsonify({'error': 'Content cannot be empty'}), 400
        
    conn = get_db_connection()
    cursor = conn.execute('UPDATE notes SET content = ? WHERE id = ?', (content, id))
    conn.commit()
    changes = cursor.rowcount
    conn.close()
    
    if changes == 0:
        return jsonify({'error': 'Note not found'}), 404
        
    return jsonify({'message': 'Note updated successfully'}), 200

@app.route('/api/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    conn = get_db_connection()
    cursor = conn.execute('DELETE FROM notes WHERE id = ?', (id,))
    conn.commit()
    changes = cursor.rowcount
    conn.close()
    
    if changes == 0:
        return jsonify({'error': 'Note not found'}), 404
        
    return jsonify({'message': 'Note deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
