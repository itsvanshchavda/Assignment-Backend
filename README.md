# Assignment Backend

🚀 This repository contains the backend code for the assignment. It provides APIs for various functionalities related to the project.

## Check the frontend code

🔗 [Frontend Repository](https://github.com/itsvanshchavda/Assignment-Frontend)

## Technologies Used

- **Nest.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **Bcrypt**
- **Nodemailer**
- **Swagger**


## Features

- [ ] **Feature 1: Authentication with OTP** ✉️

  - Description: Implement authentication using OTP verification via SMTP.

- [ ] **Feature 2: Signup** ✍️

  - Description: Sign up functionality with proper password testing.

    - Hashing passwords with bcrypt.

    - Generating and verifying OTPs via email using Nodemailer.

    - Token generation and validation with JWT.

- [ ] **Feature 3: Signin** 🔐

  - Description: Sign-in functionality with fast performance.

    - Hashing passwords with bcrypt.

    - Generating and validating JWT tokens.

    - Comparing hashed passwords for authentication.

- [ ] **Feature 4: Logout** 🚪

  - Description: Logout functionality with JWT token blacklisting.

    - Using JWT for token-based authentication.

    - Blacklisting JWT tokens upon logout.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/assignment-backend.git`

2. Install the dependencies: `npm install`

3. Create a `dist` folder in the root directory.

4. Create a `.env` file in the root directory and add the following configuration:

  ```bash
  MONGO_URI = "mongodb://localhost:27017/assignment"
  JWT_SECRET = "your_secret"
  JWT_EXPIR_IN = "1d"
  ```

5. Run the server: `npm start dev`

6. Access the APIs: [http://localhost:3000/api](http://localhost:3000/api)

Usage
-----

1. Start the server: `npm start`
2. Access the APIs:
  - Swagger Documentation: [http://localhost:3000/api](http://localhost:3000/api)
  - Sign Up: `POST /auth/signup`
  - Sign In: `POST /auth/signin`
  - Logout: `POST /auth/logout`

API Documentation
-----------------

### API 1: Signup

- Endpoint: `/auth/signup`
- Method: POST
- Description: Signup the user with email and password and send OTP to the email.

### API 2: Signin

- Endpoint: `/auth/signin`
- Method: POST
- Description: Sign in the user with email and password and send JWT token and cookie.

### API 3: Logout

- Endpoint: `/auth/logout`
- Method: POST
- Description: Logout the user and remove the token from the database and remove the cookie from the browser.

Nest.js Implementation Details
------------------------------

This backend is built using Nest.js, a progressive Node.js framework. Here's how Nest.js is utilized in this project:

- Dependency Injection: Leveraging Nest.js' built-in dependency injection system to manage service dependencies and promote modularity.

- Decorators and Middleware: Utilizing decorators and middleware for request validation, authentication, and logging.

- Error Handling: Implementing global and local error filters to handle exceptions and provide consistent error responses.

- Interceptors: Using interceptors for request and response logging, header manipulation, and data transformation.

- Module-based Architecture: Organizing the codebase into modules to encapsulate related functionality and promote maintainability.

Contributing
------------

🤝 Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

Made By
-------

- [Vansh Chavda](https://github.com/itsvanshchavda)
- Linkedin: [Vansh Chavda](https://www.linkedin.com/in/vansh-chavda-0b0b3b1b2/)
- Email: vanshchavda328@gmail.com
- Twitter: [@vanshchavda_](https://twitter.com/vanshchavda_)
