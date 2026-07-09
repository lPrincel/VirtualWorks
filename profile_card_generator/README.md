# Profile Card Generator

A modern, responsive web application built with Python (Flask) and HTML/CSS that generates a professional User Profile Card. Built as a task for **VirtualWorks**.

## ✨ Features
- **Dynamic Content:** Users can input their Full Name, Bio, and Profile Image URL.
- **Modern UI/UX:** The generated card features a sleek, centered layout with a circular profile image, drop shadows, and clean typography.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3 (Vanilla)
- **Backend:** Python, Flask

## 🚀 How to Run Locally

### Prerequisites
- Python 3.x installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lPrincel/VirtualWorks.git
   cd VirtualWorks/profile_card_generator
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

4. **Run the Application:**
   ```bash
   python app.py
   ```

5. **Open in Browser:**
   Visit `http://127.0.0.1:5000` in your web browser.

## 📂 Project Structure
```text
VirtualWorks/
└── profile_card_generator/
    ├── app.py                # Main Flask application and routes
    ├── requirements.txt      # Python dependencies
    ├── .gitignore            # Git ignore file
    ├── templates/            
    │   ├── form.html         # Form template for input
    │   └── card.html         # Generated profile card template
    └── static/               
        └── css/              
            └── style.css     # UI Styling
```

## 👨‍💻 Developer
Developed by **Prince Prajapati** as a task for VirtualWorks.
