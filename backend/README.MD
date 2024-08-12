# Student Assignments Microservice

## Overview

A microservice for managing student assignments, built with Node.js, MySQL, and Redis.

## Getting Started

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd student_assignments_service
    ```

2. **Create a `.env` File**

    ```env
    DB_HOST=db
    DB_USER=user
    DB_PASSWORD=password
    DB_NAME=student_assignments
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=email@gmail.com
    EMAIL_PASS=email_password
    PORT=5000
    REDIS_HOST=host
    REDIS_PORT=6379
    ```

3. **Build and Run with Docker**

    ```bash
    docker-compose up --build
    ```

4. **API Endpoints**

    - **POST /api/user/register**: Register a new user.
    - **POST /api/user/login**: Login and get a JWT token.
    - **GET /api/users**: Get all users (admin only).
    - **PUT /api/users/:id**: Update a user (admin only).
    - **DELETE /api/users/:id**: Delete a user (admin only).
    - **POST /api/assignments**: Create a new assignment (admin only).
    - **GET /api/assignments**: Get all assignments.
    - **PUT /api/assignments/:id**: Update an assignment (admin only).
    - **DELETE /api/assignments/:id**: Delete an assignment (admin only).
    - **POST /api/assignments/:assignment_id/student_id/submit**: Submit an assignment.
    - **PUT /api/submissions/:id/grade**: Grade a submission (admin only).

## Environment Variables

- `DB_HOST`: Database host.
- `DB_USER`: Database user.
- `DB_PASSWORD`: Database password.
- `DB_NAME`: Database name.
- `JWT_SECRET`: Secret key for JWT.
- `EMAIL_USER`: Email user.
- `EMAIL_PASS`: Email password.
- `PORT`: Port number.
- `REDIS_HOST`: Redis host.
- `REDIS_PORT`: Redis port number.

## Database Setup

- Database schema is located in `db/schema.sql`.

## Testing

- Use tools like Postman to test the API endpoints.
