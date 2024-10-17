# 🚀 Triangle of Knowledge - API

The Triangle of Knowledge - API is a backend application built with NestJS and TypeScript, using MongoDB as the database. It is containerized with Docker for seamless deployment and scalability.

Features
- 🐈 NestJS Framework: Modular and structured backend using TypeScript.
- 🍃 MongoDB: NoSQL database to manage knowledge data.
- 🐳 Docker: Containerized for easy setup and environment management.

## Prerequisites
Before running the application, ensure you have the following installed on your system:

- 🐳 [Docker](https://www.docker.com/) – Containerization platform for building, sharing, and running applications
- 🐙 [Git](https://git-scm.com/downloads) – Git is a distributed version control system that tracks versions of files.

## Getting Started
Follow these steps to set up and run the application locally.

1. 📁***Clone the repository***
   ```bash
   $ git clone https://github.com/your-username/triangle-of-knowledge-api.git
   $ cd triangle-of-knowledge-api
   ```
2. 🛠️***Build and run the application using Docker***
   ```bash
   $ docker-compose up --build
   ```
   This command will build the Docker containers and start the application.
3. 📡***Access the API***
   ```bash
   http://localhost:5000
   ```
   Make sure to check the API documentation or specific routes in the project code.

## Project Structure
The project follows the default NestJS structure:

```
   src/
   │
   ├── auth/             # Module responsible for authentication and authorization logic
   ├── common/           # Shared utilities
   ├── knowledge-list/   # Handles the logic related to managing and retrieving knowledge lists
   ├── mail/             # Handles email-related functionalities such as sending notifications or confirmations
   ├── users/            # Manages user-related operations such as user data, profiles, and account management
   └── app.module.ts     # Root module that brings together all the application's modules
   └── app.controller.ts # Root controller managing core routes and API endpoints
   └── app.service.ts    # Root service containing the core business logic for the application
```

### Environment Variables
Ensure you set up the environment variables (copy from `.env.example`, create `.env` file and add them):

### Project API docs
```bash
http://localhost:5000/api-docs
```

## License

This project is licensed under the [MIT License](LICENSE).

Made with ❤️ by [Miqayel Srapionyan](https://github.com/miqo-srapionyan)
