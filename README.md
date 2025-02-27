# To-Do List App

A simple to-do list web application built with Node.js (Express) for the backend and SQLite for the database. It allows users to manage their tasks with authentication, including adding, updating, and deleting tasks.

## Features

- User authentication (sign up, log in, and session management with cookies)
- CRUD operations for tasks (create, read, update, delete)
- Simple and responsive user interface for managing tasks

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Authentication**: Cookie-based authentication
- **Version Control**: Git, GitHub

## Project Structure

```
/                  # Root directory
├── .env           # Environment variables
├── README.md      # Project documentation
├── package-lock.json # npm lock file
├── package.json    # npm configuration
├── frontend/       # Frontend code
│   ├── src/        # JavaScript source files
│   │   ├── main.js # Entry point for frontend logic
│   │   ├── scripts/ # Modular scripts for tasks and UI
│   └── public/      # Static files (index.html, styles)
├── backend/        # Backend code
│   ├── app.js       # Main server file
│   ├── routes/      # Routes for handling authentication and tasks
│   ├── databases/   # Database files (SQLite)
│   ├── models/      # Database models (userModel.js, taskModel.js)
└── .gitignore       # Git ignore file
```

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root of the project and add necessary variables (e.g., port, session secret).

5. Start the server:

   ```bash
   npm start
   ```

6. Open the app in your browser:

   ```bash
   http://localhost:3000
   ```

## Usage

- **Sign up**: Create a new account by providing a username and password.
- **Log in**: Use your credentials to log in and manage your to-do list.
- **Add tasks**: Add new tasks to your to-do list.
- **Update tasks**: mark tasks as completed.
- **Delete tasks**: Remove tasks from your list.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork the repository, open issues, or submit pull requests for any improvements or bug fixes!