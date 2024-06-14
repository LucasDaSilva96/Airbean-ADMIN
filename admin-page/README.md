# Airbean Admin UI

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a web application that facilitates user authentication, menu management, and offers management. It includes features for signing up, logging in, managing menu items, creating and editing offers, and accessing user-specific dashboards.

## Features

- **User Authentication:**
  - Sign Up
  - Login
  - Logout
- **Menu Management:**
  - Add Menu Items
  - Edit Menu Items
  - Delete Menu Items
  - View Menu
- **Offers Management:**
  - Create Offers
  - Edit Offers
  - Delete Offers
- **User Dashboard:**
  - View User-specific Information
  - Manage Profile

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```
   git clone https://github.com/LucasDaSilva96/Airbean-ADMIN.git
   cd AIRBEAN-FULLSTACK-INDIVIDUELL
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   VITE_API_URL=https://api.example.com
   VITE_DEMO_USER = email...
   VITE_DEMO_USER_PASSWORD = ....
   ```

   Replace `https://api.example.com` with the actual API URL.

4. **Run the development server:**

   ```
   npm run dev
   ```

   The application will be running at `http://localhost:5173/`.

## Usage

1. **User Authentication:**

   - Navigate to `/login` to log in as a user.
   - Use the Sign Up page (`/signup`) to create a new user account.

2. **Menu and Offers Management:**

   - Access the dashboard (`/dashboard`) to manage menu items and offers.
   - Add new menu items (`/addMenuItem`) and offers (`/createOffer`).
   - Edit existing menu items (`/menuEdit/:id`) and offers (`/offerEdit/:id`).

3. **User Dashboard:**

   - View personalized information and manage user profile details.

## API Integration

This project integrates with a backend API to perform CRUD operations on menu items and offers. The API endpoints used include:

- `POST /api/signUp`: Create a new user account.
- `POST /api/login`: Authenticate user login.
- `GET /api/menu/`: Fetch menu items.
- `GET /api/offers/`: Fetch offers.
- `POST /api/menu/`: Create a new menu item.
- `POST /api/offers/`: Create a new offer.
- `PATCH /api/menu/:id`: Update a menu item.
- `PATCH /api/offers/:id`: Update an offer.
- `DELETE /api/menu/:id`: Delete a menu item.
- `DELETE /api/offers/:id`: Delete an offer.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License.
