# Student Management System

## Overview
The **Student Management System** is a web-based application designed to manage student information efficiently. It provides functionality to add, view, update, and manage student records through a simple frontend interface and a Spring Boot REST API.

## Features
- Add new student records
- View all students
- View individual student details
- Edit and update student information
- Delete student records
- RESTful backend API
- MySQL database integration

## Technology Stack
### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

### Database
- MySQL

## Project Structure
```text
Student Management System/
├── backend/
│   └── student-management/
│       ├── src/
│       ├── pom.xml
│       └── application.properties
└── frontend/
    ├── index.html
    ├── students.html
    ├── student-details.html
    ├── edit-student.html
    ├── css/
    └── js/
```

## Prerequisites
Make sure the following software is installed:
- Java 17 or later
- Maven
- MySQL
- A modern web browser

## Database Setup
1. Open MySQL.
2. Create the database:

```sql
CREATE DATABASE student_management;
```

3. Open:

```text
backend/student-management/src/main/resources/application.properties
```

4. Configure your MySQL username and password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081
```

> Do not commit real database passwords to a public repository.

## Running the Backend
Navigate to the backend directory:

```bash
cd "Documents/Student Management System/backend/student-management"
```

Run the application with Maven:

```bash
mvn spring-boot:run
```

The backend will start on:

```text
http://localhost:8081
```

## Running the Frontend
Open the `frontend` folder and launch `index.html` in a web browser.

For better compatibility, you can also run the frontend using a local development server such as VS Code Live Server.

## API
The application uses REST APIs for student management. Refer to the `StudentController.java` file for the available endpoints and request mappings.

## Author
**Singarapu Veera**

## License
This project is created for educational and academic purposes.
