
# Student Registration System

A simple, single-page web application built with React for managing course and student registrations. This project provides a clean, intuitive dashboard to handle all aspects of the registration process, from creating course types to enrolling students.

## ✨ Features

This application allows for full CRUD (Create, Read, Update, Delete) functionality for the following modules:

* **Course Types Management**: Create, edit, and delete course categories like "Individual," "Group," or "Special."
* **Courses Management**: Add, update, and remove specific courses such as "Hindi," "English," or "Urdu."
* **Course Offerings Management**: Combine courses with course types to create specific offerings (e.g., "Group - Hindi"). This section also includes a feature to filter offerings by their type.
* **Student Registration**: Register students into available course offerings and view a list of all registered students for any specific offering.

## 🛠️ Tech Stack

* **React**: The core of the application is built using React (v18+). It uses the **Class Component** architecture for managing component logic and state.
* **State Management**: All application state is managed locally within the main `App` component using `this.state` and `this.setState`.
* **Styling**: The user interface is styled with **Tailwind CSS**, a utility-first CSS framework for creating a modern and responsive design directly within the JSX.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.
* [Node.js](https://nodejs.org/) (which includes npm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/student-registration-system.git](https://github.com/your-username/student-registration-system.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd student-registration-system
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

5.  **Run the application:**
    Start the development server.
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.
