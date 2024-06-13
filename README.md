# Airbean

## Description:

This project provides a robust backend API for managing authentication, menu items, and promotional offers for a restaurant or similar business. It includes secure user authentication, CRUD operations for menu items, and management of promotional offers. The API ensures data security through authentication and authorization mechanisms, allowing only authorized administrators to perform sensitive operations.

### Key Features:

- User authentication with token-based security.
- CRUD operations for menu items, including image uploads.
- Management of promotional offers with admin-only access.
- Secure endpoints using middleware for authentication and authorization.

### Technologies Used:

- TypeScript
- Node.js
- Express.js
- MongoDB (or your preferred database)
- Multer for file uploads
- JSON Web Tokens (JWT) for authentication
- ES Modules for module loading

### Future Enhancements:

- Implementing user roles and permissions for more granular access control.
- Enhancing API responses with standardized error handling.

## API Documentation

#### Authentication Routes

**Logout**

- **Method:** `GET`
- **Endpoint:** `/api/auth/logout`
- **Description:** Logs out the authenticated user.

**Get Reset Token**

- **Method:** `POST`
- **Endpoint:** `/api/auth/getToken`
- **Description:** Generates a reset token for password recovery.

**Sign Up**

- **Method:** `POST`
- **Endpoint:** `/api/auth/signUp`
- **Description:** Registers a new user with optional profile image upload.

**Login**

- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Description:** Logs in an existing user.

**Reset Password**

- **Method:** `POST`
- **Endpoint:** `/api/auth/resetPassword`
- **Description:** Updates the password for a user.

**Update User**

- **Method:** `PATCH`
- **Endpoint:** `/api/auth/updateUser`
- **Description:** Updates user information, requires authentication and supports image upload.

#### Menu Routes

**Get All Menu Items**

- **Method:** `GET`
- **Endpoint:** `/api/menu/`
- **Description:** Retrieves all menu items.

**Create Menu Item**

- **Method:** `POST`
- **Endpoint:** `/api/menu/`
- **Description:** Creates a new menu item with optional image upload, requires admin privileges.

**Update Menu Item**

- **Method:** `PATCH`
- **Endpoint:** `/api/menu/:itemID`
- **Description:** Updates an existing menu item identified by `itemID`, requires admin privileges and supports image upload.

**Delete Menu Item**

- **Method:** `DELETE`
- **Endpoint:** `/api/menu/:itemID`
- **Description:** Deletes a menu item identified by `itemID`, requires admin privileges.

#### Promotional Offers Routes

**Get All Promotional Offers**

- **Method:** `GET`
- **Endpoint:** `/api/promotional/`
- **Description:** Retrieves all promotional offers.

**Create Promotional Offer**

- **Method:** `POST`
- **Endpoint:** `/api/promotional/`
- **Description:** Creates a new promotional offer, requires admin privileges.

**Update Promotional Offer**

- **Method:** `PATCH`
- **Endpoint:** `/api/promotional/:offerID`
- **Description:** Updates an existing promotional offer identified by `offerID`, requires admin privileges.

**Delete Promotional Offer**

- **Method:** `DELETE`
- **Endpoint:** `/api/promotional/:offerID`
- **Description:** Deletes a promotional offer identified by `offerID`, requires admin privileges.

#### Notes:

- Ensure proper authentication and authorization using JWT tokens and middleware (`protect` and `adminOnly`).
- Utilize Multer middleware (`upload.single('image')`) for handling file uploads, particularly for user avatars and menu item images.
- Implement error handling and validation to ensure robustness and security of API endpoints.
