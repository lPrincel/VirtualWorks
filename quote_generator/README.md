# Quote Generator with History

A modern, responsive web application that fetches random quotes from an external API, displays them, and logs them into a persistent history list. Built as part of the **VirtualWorks** internship tasks.

## ✨ Features
- **External API Integration:** Dynamically fetches random quotes using the Python `requests` library.
- **Asynchronous UI Updates:** Generates new quotes and refreshes the history list smoothly without reloading the page using the vanilla JS `fetch()` API.
- **Modern UI/UX:** Clean, visually stunning layout with a premium dark mode, glassmorphism design, soft gradients, and micro-animations.
- **Persistent Storage:** Backend API built with Python (Flask) utilizing an SQLite database to ensure your quote history is saved permanently.

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla, Fetch API)
- **Backend:** Python, Flask (RESTful API), Requests
- **Database:** SQLite3

## 🚀 How to Run Locally

### Prerequisites
- Python 3.x installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lPrincel/VirtualWorks.git
   cd VirtualWorks/quote_generator
   ```

2. **Create a Virtual Environment (Optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the Database:**
   ```bash
   python init_db.py
   ```
   *(Note: This creates the `quotes.db` file and the `recently_viewed` table).*

5. **Run the Application:**
   ```bash
   python app.py
   ```

6. **Open in Browser:**
   Visit `http://127.0.0.1:5000` in your web browser to use the application.

## 📂 Project Structure
```text
VirtualWorks/
└── quote_generator/
    ├── app.py                # Main Flask application and API routes
    ├── init_db.py            # Database initialization script
    ├── requirements.txt      # Python dependencies
    ├── README.md             # Project documentation
    ├── templates/            
    │   └── index.html        # Main HTML layout
    └── static/               
        ├── style.css         # UI Styling and animations
        └── main.js           # Asynchronous frontend logic
```

## 👨‍💻 Developer
Developed by **Prince Prajapati** as a task for VirtualWorks.
