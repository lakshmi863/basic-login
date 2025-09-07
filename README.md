React.js & Node.js Login/Logout System
This is a full-stack authentication application built for the Klickks Assignment. It features a React.js frontend that communicates with a Node.js/Express backend to handle user registration, login, session management, and protected routes.

web site link( https://basic-login-front.onrender.com/login )

🚀 Core Features
User Registration: New users can sign up with an email and password.
User Login: Registered users can log in to access protected content.
Session Management: Uses express-session and cookies to keep users logged in across browser sessions.
Password Hashing: Passwords are securely hashed using bcrypt before being stored.
Protected Routes: A sample /dashboard route is only accessible to authenticated users.
Logout: Users can securely end their session, which clears their session data on the server.
🛠 Tech Stack
Frontend:
React.js
Axios (for API requests)
React Router DOM (for routing)
Backend:
Node.js
Express.js
Database:
SQLite (a lightweight, file-based database)
Authentication & Middleware:
bcrypt: For hashing passwords.
express-session: For managing sessions.
cookie-parser: To parse cookie headers.
cors: To enable Cross-Origin Resource Sharing.
📂 Project Structure

<img width="685" height="607" alt="image" src="https://github.com/user-attachments/assets/3b0249ad-460e-4aa0-9e1b-52ca48905ea4" />


1. Clone the Repository
code
Bash
git clone <your-repository-url>
cd project-root
2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.
code
Bash
# Move into the backend directory
cd backend

# Install dependencies
npm install

# Start the server
node server.js
The backend will start running on http://localhost:3001. The SQLite database file users.db will be automatically created in the backend/ directory.
3. Frontend Setup
In a new terminal window, navigate to the frontend directory, install dependencies, and start the React application.
code
Bash
# Move into the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start```

The frontend will start running on `http://localhost:3000` and will open automatically in your browser.

---

## ☁️ Deployment

This project is configured for easy deployment on **Render** using the `render.yaml` Blueprint file located in the project root.

### Steps to Deploy:

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Create a Blueprint on Render:**
    -   Go to your Render Dashboard and click **New > Blueprint Instance**.
    -   Connect your GitHub account and select the repository for this project.
    -   Render will automatically detect the `render.yaml` file and configure the backend service and the frontend static site.
3.  **Approve and Deploy:**
    -   Review the services that Render will create.
    -   Click **Approve** to begin the deployment process.

Render will automatically build and deploy both services, linking them together so the frontend can communicate with the backend API. Future pushes to your main branch will trigger automatic redeployments.
