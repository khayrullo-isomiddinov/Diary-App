# Diary Application

This is a simple **Diary web application** built with a **React (Vite) frontend** and a **Laravel backend**.  
Data is stored in a local **SQLite database**. The app demonstrates CRUD functionality for diary entries and basic page navigation.  

---

## Project Structure
|
├── client/ # React frontend (Vite)
│ ├── package.json
│ └── ... React code
│
└── server/ # Laravel backend (REST API)
├── composer.json
└── ... Laravel code


---

## Features
- **Navigation Bar** with links to Main, Diary, and About pages.
- **Main Page**: Static intro + shows number of diary entries and date range.
- **About Page**: Author info (name, Neptun ID, email).
- **Diary Page**: Lists all diary entries (title, date, content) with options to edit.
- **Add Page**: Add new diary entries via form.
- **Edit Page**: Edit existing diary entries via prefilled form.

---

## Technologies
- **Frontend**: React (Vite)
- **Backend**: Laravel (REST API)
- **Database**: SQLite
- **Language**: PHP, JavaScript

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/khayrullo-isomiddinov/Diary-App.git
cd Diary-App
```

### 2. Set up the back end 
```
cd server

# Install dependencies
composer install

# Copy environment config
cp .env.example .env

# Generate app key
php artisan key:generate

# Setup SQLite database
touch database/database.sqlite
php artisan migrate --seed

# Run Laravel server
php artisan serve

visit: http://127.0.0.1:8000
```

### 3. The Front 
```
cd ../client

# Install dependencies
npm install

# Start dev server
npm run dev

visit: http://127.0.0.1:5173
```

Name: Harry

git clone https://github.com/khayrullo-isomiddinov/Diary-App.git
cd Diary-App
