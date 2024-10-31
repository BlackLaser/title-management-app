# Title Management Application

## Overview
The Title Management Application is a frontend React application that allows users to manage a list of titles. The app includes user authentication and integrates with MetaMask for secure login and interactions. Users can view, add, and manage titles within the application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Testing](#testing)
5. [API Endpoints](#api-endpoints)
6. [Notes](#notes)

## Prerequisites
- **Node.js**: Version 20+
- **MySQL**: Required for backend services (optional if using mock API)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BlackLaser/title-management-app.git
   cd title-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment setup:
   - Ensure your environment variables for database connection (if applicable) are properly configured.
4. Start the application:
   ```bash
   npm start
   ```
   - The application will be available at http://localhost:3000.
## Usage
   - User Authentication: Users can log in and register through the app's frontend.
   - MetaMask Integration: MetaMask is used for connecting with users' wallets to validate certain actions.
   - Title Management: Users can add new titles to the list, view existing titles, and manage their list of titles.
## Testing
   To run the application’s tests, use:
   ```bash
   npm test
   ```
## API Endpoints
The backend API provides the following endpoints:
   - Authentication:
      - POST /auth/login: Login a user.
      - POST /auth/register: Register a new user.
   - Titles:
      - GET /titles: Retrieve a list of all titles.
      - POST /titles: Add a new title.
      - (In Development Assumed) DELETE /titles/:id: Delete a title by ID.
## Notes
   - The DELETE endpoint is not involved in backend project. While tests may reference this endpoint, it is not yet available in the backend API, so deletion-related tests will fail until it is fully implemented.