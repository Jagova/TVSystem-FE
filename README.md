# TV Show Management System - Frontend

This is the frontend of the TV show management system, developed with Angular and Bootstrap.

## Features

- **User Authentication**: Registration, login, and logout.
- **User Roles**: Registered users and administrators.
- **TV Show Management**: Create, edit, and delete TV shows (administrators only).
- **TV Show Viewing**: Any user can view TV shows.
- **Likes**: Registered users can like and unlike TV shows.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

    ```bash
    git clone <repository_url>
    cd tv-show-management-system/frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the Angular application:

    ```bash
    ng serve
    ```

4. Open your browser at `http://localhost:4200`.

## Usage

1. Register on the application via the registration page.
2. Log in with your credentials.
3. Browse through TV shows and like them.
4. If you are an administrator, access the admin page to manage TV shows.

## Project Structure

```plaintext
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── tv-show-card/
│   │   │   ├── tv-show-dialog/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── models/
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.component.ts
│   ├── assets/
│   ├── environments/
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
