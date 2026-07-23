# Team Availability Tracker

A clean, responsive dashboard application that displays team members and allows toggling their availability status in real-time. Built as part of the **VirtualWorks** internship tasks.

## ✨ Features
- **Real-time Status Toggle:** Update a team member's availability dynamically without any page reloads using the vanilla JS `fetch()` API.
- **Modern Dashboard UI:** Clean layout with clear conditional styling (Green for Available, Red for Busy) indicating user states.
- **Persistent Storage:** Backend API built with Python (Flask) utilizing an SQLite database to ensure the availability state is saved permanently.
- **Dynamic Content:** Fetches the latest team members and their statuses directly from the backend server on load.

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
   cd VirtualWorks/team_availability_tracker
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
   *(Note: This creates the `team.db` file and populates it with the initial team members).*

5. **Run the Application:**
   ```bash
   python app.py
   ```

6. **Open in Browser:**
   Visit `http://127.0.0.1:5000` in your web browser to use the application.

## 📂 Project Structure
```text
VirtualWorks/
└── team_availability_tracker/
    ├── app.py                # Main Flask application and API routes
    ├── init_db.py            # Database initialization and population script
    ├── requirements.txt      # Python dependencies
    ├── README.md             # Project documentation
    ├── templates/            
    │   └── index.html        # Main HTML layout
    └── static/               
        ├── style.css         # UI Styling and conditional classes
        └── main.js           # Asynchronous toggle logic
```

## 👨‍💻 Developer
Developed by **Prince Prajapati** as a task for VirtualWorks.
