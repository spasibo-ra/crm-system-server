# CRM System Server

## Description

CRM System Server is the backend part of a Customer Relationship Management (CRM) system built using NestJS. It includes various modules and services for managing users, customers, interactions, deals, companies, contacts, and tasks.

## Features

- **Authentication and Authorization**:
  - Support for JWT tokens for authentication.
  - Role-Based Access Control (RBAC) for managing access based on roles.
  - Support for refresh tokens to extend sessions.
  - Logout functionality and token revocation.

- **User Management**:
  - Create, update, and delete users.
  - Manage user roles and statuses.

- **Customer Management**:
  - Create, update, and delete customers.
  - Store customer contact information.

- **Interaction Management**:
  - Create, update, and delete interactions with customers.
  - Store interaction descriptions.

- **Deal Management**:
  - Create, update, and delete deals.
  - Manage deal stages and statuses.

- **Company Management**:
  - Create, update, and delete companies.
  - Store company information.

- **Contact Management**:
  - Create, update, and delete contacts.
  - Store contact information.

- **Task Management**:
  - Create, update, and delete tasks.
  - Manage task statuses and due dates.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/crm-system-server.git
   cd crm-system-server
   ```
2. Install dependencies:
    ```bash
    npm install
    ```