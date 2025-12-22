# Library Management System (LMS)

## Overview
The Library Management System (LMS) is a modular application designed to manage library operations efficiently. It is built using a microservices architecture, with separate services for managing books, users, and borrowing operations. The frontend is implemented using multiple micro-frontend (MFE) applications.

## Project Structure

### Backend
The backend consists of multiple services, each responsible for a specific domain:

- **ApiGateway**: Acts as the entry point for all backend services, routing requests to the appropriate microservices.
- **BookService**: Manages book-related operations, such as adding, updating, and retrieving book information.
- **BorrowingService**: Handles borrowing and returning of books, as well as tracking due dates.
- **UserService**: Manages user-related operations, including user registration, authentication, and profile management.

Each backend service uses Prisma as the ORM and has its own database schema defined in `schema.prisma`.

### Frontend
The frontend is composed of multiple micro-frontend (MFE) applications, each targeting a specific user role or functionality:

- **admin-mfe**: Provides administrative functionalities for managing the library system.
- **librarian-mfe**: Designed for librarians to manage day-to-day library operations.
- **login-mfe**: Handles user authentication and login.
- **member-mfe**: Provides features for library members to browse and borrow books.
- **load-container**: A container application for loading and orchestrating the MFEs.
- **root-config**: Contains the configuration for integrating all MFEs.
- **utility**: Shared utilities and components used across MFEs.

### Shared Configurations
- **Babel**: Configured for transpiling modern JavaScript/TypeScript.
- **Webpack**: Used for bundling and managing dependencies.
- **Jest**: Configured for unit testing.
- **PostCSS**: Used for processing CSS.
- **TypeScript**: Provides type safety and modern JavaScript features.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LMS
   ```
2. Install dependencies for the root project:
   ```bash
   npm install
   ```
3. Install dependencies for each backend service:
   ```bash
   cd backend/ApiGateway && npm install
   cd ../BookService && npm install
   cd ../BorrowingService && npm install
   cd ../UserService && npm install
   ```
4. Install dependencies for each frontend MFE:
   ```bash
   cd frontend/admin-mfe && npm install
   cd ../librarian-mfe && npm install
   cd ../login-mfe && npm install
   cd ../member-mfe && npm install
   cd ../load-container && npm install
   cd ../root-config && npm install
   cd ../utility && npm install
   ```

## Running the Application

### Backend
1. Start the database using Docker:
   ```bash
   docker-compose up -d
   ```
2. Start each backend service:
   ```bash
   cd backend/ApiGateway && npm start
   cd ../BookService && npm start
   cd ../BorrowingService && npm start
   cd ../UserService && npm start
   ```

### Frontend
1. Start each MFE:
   ```bash
   cd frontend/admin-mfe && npm start
   cd ../librarian-mfe && npm start
   cd ../login-mfe && npm start
   cd ../member-mfe && npm start
   cd ../load-container && npm start
   cd ../root-config && npm start
   cd ../utility && npm start
   ```
2. Access the application in your browser at the configured URL (e.g., `http://localhost:3000`).

## Testing

### Backend
Run tests for each backend service:
```bash
cd backend/ApiGateway && npm test
cd ../BookService && npm test
cd ../BorrowingService && npm test
cd ../UserService && npm test
```

### Frontend
Run tests for each MFE:
```bash
cd frontend/admin-mfe && npm test
cd ../librarian-mfe && npm test
cd ../login-mfe && npm test
cd ../member-mfe && npm test
cd ../load-container && npm test
cd ../root-config && npm test
cd ../utility && npm test
```

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your fork.
4. Create a pull request to the main repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or issues, please contact the project maintainers.
