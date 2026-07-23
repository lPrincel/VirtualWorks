import sqlite3
import os

DB_PATH = 'team.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS team_availability (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            is_available BOOLEAN NOT NULL
        )
    ''')

    # Pre-populate the table if it's empty
    cursor.execute('SELECT COUNT(*) FROM team_availability')
    if cursor.fetchone()[0] == 0:
        users = [
            ('Alex Rivers', 'Senior Developer', True),
            ('Samantha Chen', 'UX Designer', False),
            ('Jordan Taylor', 'Project Manager', True),
            ('Maria Garcia', 'Marketing Lead', False)
        ]
        cursor.executemany(
            'INSERT INTO team_availability (name, role, is_available) VALUES (?, ?, ?)',
            users
        )

    conn.commit()
    conn.close()
    print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
