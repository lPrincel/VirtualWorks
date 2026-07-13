# Coffee Rating Application

A modern, responsive web application for rating different types of coffee. Built as part of the **VirtualWorks** internship tasks.

## ✨ Features
- **Asynchronous Voting:** Vote for your favorite coffee dynamically without any page reloads using the vanilla JS `fetch()` API.
- **Modern UI/UX:** Clean, visually stunning layout with a premium dark glassmorphism design, vibrant color gradients, and subtle hover animations.
- **Persistent Storage:** Backend API built with Python (Flask) utilizing an SQLite database to ensure votes are safely stored permanently.
- **Dynamic Content:** Fetches the latest vote counts directly from the backend server.

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
   git clone https://github.com/lPrincel/VirtualWorks.git
   cd VirtualWorks/coffee_rating_app
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

4. **Initialize the Database:**
   ```bash
   python init_db.py
   ```
   *(Note: This creates and populates the `coffees.db` file).*

5. **Run the Application:**
   ```bash
   python app.py
   ```

6. **Open in Browser:**
   Visit `http://127.0.0.1:5000` in your web browser to use the application.

## 📂 Project Structure
```text
VirtualWorks/
└── coffee_rating_app/
    ├── app.py                # Main Flask application and API routes
    ├── init_db.py            # Database initialization script
    ├── .gitignore            # Git ignore file
    ├── README.md             # Project documentation
    ├── templates/            
    │   └── index.html        # Main HTML layout
    └── static/               
        ├── css/              
        │   └── style.css     # UI Styling and animations
        └── js/               
            └── main.js       # Asynchronous voting logic
```

## 👨‍💻 Developer
Developed by **Prince Prajapati** as a task for VirtualWorks.
