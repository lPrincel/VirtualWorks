# Quick-Note SPA

A modern, responsive Single-Page Application (SPA) designed for quickly capturing and managing your thoughts. Built as the first internship task for **VirtualWorks**.

## ✨ Features
- **Asynchronous Operations:** Perform CRUD (Create, Read, Update, Delete) operations instantly without any page reloads using the vanilla JS `fetch()` API.
- **Modern UI/UX:** Clean, tablet-inspired layout with a premium glassmorphism design, vibrant color gradients, and subtle hover animations. 
- **Persistent Storage:** Backend API built with Python (Flask) utilizing an SQLite database to ensure your notes are safely stored permanently.
- **Real-time Formatting:** Timestamps are automatically captured and formatted (e.g. "Oct 27, 10:32 AM").

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla, Fetch API)
- **Backend:** Python, Flask (RESTful API)
- **Database:** SQLite3

## 🚀 How to Run Locally

### Prerequisites
- Python 3.x installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IPrinceI/VirtualWorks.git
   cd VirtualWorks/quick_note
   ```

2. **Create a Virtual Environment (Optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install flask
   ```

4. **Run the Application:**
   ```bash
   python app.py
   ```

5. **Open in Browser:**
   Visit `http://127.0.0.1:5000` in your web browser to use the application. 

*(Note: The database `notes.db` will be automatically generated upon your first startup).*

## 📂 Project Structure
```text
VirtualWorks/
└── quick_note/
    ├── app.py                # Main Flask application and API routes
    ├── .gitignore            # Git ignore file
    ├── templates/            
    │   └── index.html        # Main HTML layout
    └── static/               
        ├── css/              
        │   └── style.css     # UI Styling and animations
        └── js/               
            └── app.js        # Asynchronous CRUD logic
```

## 👨‍💻 Developer
Developed by **Prince Prajapati** as a task for VirtualWorks.
