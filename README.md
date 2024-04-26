# TaskMaster 

TaskMaster is a web application built with React, Vite, and tailwindcss. It provides a user-friendly interface for managing tasks and task lists.

## Features

- User authentication: Register and log in to access the application.
- Task management: Create, update, and delete tasks.
- Task category management: Create and update task categories.
- Task list management: View and manage task lists.

## Installation

To run the TaskMaster Frontend locally, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/oduyemi/taskMaster.git
   ```

2. Navigate to the project directory:

   ```bash
   cd taskmaster/client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application in your browser at `http://localhost:3000`.

## Usage

### User Authentication

- **Register**: Click on the "Register" button and fill in the required details to create a new account.
- **Log In**: Enter your email/username and password, then click on the "Log In" button to access the application.

### Task Management

- **Create Task**: Click on the "Add Task" button, fill in the task details, and click "Save" to create a new task.
- **Update Task**: Click on the task you want to update, make changes to the task details, and click "Save" to update the task.
- **Delete Task**: Click on the task you want to delete, then click on the "Delete" button to remove the task.

### Task Category Management

- **Create Category**: Navigate to the "Categories" section, click on the "Add Category" button, enter the category name, and click "Save" to create a new category.
- **Update Category**: Click on the category you want to update, edit the category name, and click "Save" to update the category.

### Task List Management

- **View Task Lists**: Navigate to the "Lists" section to view all available task lists.
- **View Task List Details**: Click on a task list to view its details, including tasks associated with the list.
- **Edit Task List**: Click on the "Edit" button next to a task list to edit its details.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Vite: A fast build tool for modern web development.
- tailwindcss: A utility-first CSS framework for rapidly building custom designs.
- Axios: A promise-based HTTP client for making API requests.
- React Router: A routing library for React applications.
- React Hook Form: A library for managing form state in React applications.

## Folder Structure

```
taskmaster-frontend/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   ├── styles/             # TailwindCSS styles
│   ├── App.js              # Main application component
│   ├── index.css           # Global styles
│   └── index.js            # Entry point
├── .gitignore              # Git ignore file
├── package.json            # npm package file
└── README.md               # Project README
```

## Contributing

Contributions to the TaskMaster Frontend project are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on GitHub.

## License

TaskMaster Frontend is licensed under the MIT License. See the [LICENSE](https://github.com/your-username/taskmaster-frontend/blob/main/LICENSE) file for details.

This documentation provides an overview of the TaskMaster Frontend application, its features, usage instructions, dependencies, and folder structure. For detailed information, refer to the project's source code and documentation.



# API Documentation (Server)

TaskMaster is a task management API designed for a to-do application. It provides endpoints for managing users, tasks, task categories, and task lists.

## Base URL

```
https://taskmaster-api.com
```

## Authentication

TaskMaster API uses JSON Web Tokens (JWT) for authentication. Users need to register and log in to obtain a JWT token, which they must include in the headers of subsequent requests.

### Register User

- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  - `username` (string, required): User's username.
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
  - `cpwd` (string, required): Confirm password.
- **Response**: 
  - Status: 201 - Created
  - JSON object containing:
    - `message`: "User registered successfully"
    - `token`: JWT token
    - `nextStep`: Next page URL

### Log In User

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  - `email` (string): User's email address.
  - `username` (string): User's username.
  - `password` (string, required): User's password.
- **Response**:
  - Status: 200 - OK
  - JSON object containing:
    - `message`: "User login successful!"
    - `nextStep`: Next page URL
    - `token`: JWT token

### Update User Details

- **URL**: `/users/:userId`
- **Method**: `PUT`
- **Description**: Updates user details.
- **Request Parameters**:
  - `userId` (string, required): User ID.
- **Request Body**:
  - `username` (string): User's new username.
  - `email` (string): User's new email address.
- **Response**:
  - Status: 200 - OK
  - JSON object containing:
    - `message`: "User details updated successfully"

### Reset User Password

- **URL**: `/users/:userId/resetpassword`
- **Method**: `PUT`
- **Description**: Resets user password.
- **Request Parameters**:
  - `userId` (string, required): User ID.
- **Request Body**:
  - `oldPassword` (string, required): User's old password.
  - `newPassword` (string, required): User's new password.
  - `confirmNewPassword` (string, required): Confirm new password.
- **Response**:
  - Status: 200 - OK
  - JSON object containing:
    - `message`: "Password reset successfully"

## Tasks

Task endpoints allow users to manage their tasks.

### Create Task

- **URL**: `/task`
- **Method**: `POST`
- **Description**: Creates a new task.
- **Request Body**:
  - `title` (string, required): Task title.
  - `description` (string, required): Task description.
  - `task_category_id` (string, required): Task category ID.
  - `due_date` (Date): Task due date.
- **Response**:
  - Status: 201 - Created
  - JSON object containing:
    - `message`: "Task created successfully"

### Update Task

- **URL**: `/tasks/:taskId`
- **Method**: `PUT`
- **Description**: Updates an existing task.
- **Request Parameters**:
  - `taskId` (string, required): Task ID.
- **Request Body**:
  - `title` (string): New task title.
  - `description` (string): New task description.
  - `task_category_id` (string): New task category ID.
  - `due_date` (Date): New task due date.
- **Response**:
  - Status: 200 - OK
  - JSON object containing:
    - `message`: "Task updated successfully"

### Delete Task

- **URL**: `/tasks/:taskId/delete`
- **Method**: `DELETE`
- **Description**: Deletes a task.
- **Request Parameters**:
  - `taskId` (string, required): Task ID.
- **Response**:
  - Status: 200 - OK
  - JSON object containing:
    - `message`: "Task deleted successfully"

## Task Lists

Task list endpoints allow users to manage their task lists.

### Get Task Lists

- **URL**: `/tasks/lists`
- **Method**: `GET`
- **Description**: Retrieves all task lists.
- **Response**:
  - Status: 200 - OK
  - JSON array of task lists

### Get Task List by ID

- **URL**: `/tasks/lists/:listId`
- **Method**: `GET`
- **Description**: Retrieves a task list by ID.
- **Request Parameters**:
  - `listId` (string, required): Task list ID.
- **Response**:
  - Status: 200 - OK
  - JSON object representing the task list

This documentation provides an overview of the TaskMaster API's endpoints and their functionalities. For detailed usage instructions, refer to the provided endpoint descriptions.
