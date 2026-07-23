from flask import Flask, render_template, jsonify
import sqlite3
import os

app = Flask(__name__)
DB_PATH = 'team.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/team', methods=['GET'])
def get_team():
    try:
        conn = get_db_connection()
        team = conn.execute('SELECT * FROM team_availability').fetchall()
        conn.close()
        
        team_list = []
        for member in team:
            team_list.append({
                'id': member['id'],
                'name': member['name'],
                'role': member['role'],
                'is_available': bool(member['is_available'])
            })
            
        return jsonify({'team': team_list, 'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

@app.route('/api/toggle/<int:user_id>', methods=['POST'])
def toggle_status(user_id):
    try:
        conn = get_db_connection()
        user = conn.execute('SELECT is_available FROM team_availability WHERE id = ?', (user_id,)).fetchone()
        
        if user is None:
            conn.close()
            return jsonify({'error': 'User not found', 'status': 'error'}), 404
            
        new_status = not bool(user['is_available'])
        
        conn.execute('UPDATE team_availability SET is_available = ? WHERE id = ?', (new_status, user_id))
        conn.commit()
        conn.close()
        
        return jsonify({'is_available': new_status, 'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    if not os.path.exists(DB_PATH):
        import init_db
        init_db.init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
