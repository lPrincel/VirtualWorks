import sqlite3
import os

DATABASE = 'coffees.db'

def init_db():
    # Remove existing db if any to ensure fresh start
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
        
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Create coffees_table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS coffees_table (
            coffee_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            votes INTEGER DEFAULT 0
        )
    ''')

    # Pre-populate items
    initial_coffees = [
        ('Ethiopian Yirgacheffe', 'Bright, clean taste with floral and citrus notes.'),
        ('Sumatra Mandheling', 'Smooth, full-bodied with earthy and complex flavors.'),
        ('Cold Brew Nitro', 'Velvety texture, sweet and creamy without sugar.'),
        ('Vanilla Latte', 'Classic espresso mixed with steamed milk and vanilla syrup.'),
        ('Mexican Chiapas', 'Light-medium roast, bright acidity with chocolate notes.'),
        ('Cold Brew', 'Smooth and refreshing, steeped slowly for low acidity.'),
        ('Pour over', 'Hand-crafted drip coffee highlighting nuanced flavors.')
    ]

    cursor.executemany(
        'INSERT INTO coffees_table (name, description, votes) VALUES (?, ?, 0)',
        initial_coffees
    )

    conn.commit()
    conn.close()
    print("Database initialized and populated with default coffees.")

if __name__ == '__main__':
    init_db()
