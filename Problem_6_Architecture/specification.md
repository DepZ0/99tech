## Backend Specification

### General Requirements

1. **Sign-Up and Login:**

   - **Endpoints:**
     - `POST /auth/sign-up`
     - `POST /auth/login`
   - **Request Parameters:**
     - `email` (string) - User's email address.
     - `password` (string) - User's password.
   - **Response:**
     - Success: Status `200 OK`.
     - Error: Status `400 Bad Request` or `401 Unauthorized` for invalid data.

2. **User Profile:**

   - **Endpoint:**
     - `GET /profile`
   - **Request Parameters:**
     - Requires authorization with a token.
   - **Response:**
     - Success:
       ```json
       {
         "name": "User Name",
         "email": "user@example.com",
         "score": 150,
         "createdAt": "2024-08-09T12:34:56Z",
         "updatedAt": "2024-08-09T12:34:56Z",
         "topPosition": 5
       }
       ```
     - Error: Status `401 Unauthorized` for invalid token.

3. **Refreshing Token:**

   - **Endpoint:**
     - `POST /refresh-token`
   - **Request Parameters:**
     - Requires authorization with a refresh token.
   - **Response:**
     - Success: Access token is saved in the Cookie.
     - Error: Status `401 Unauthorized` for invalid refresh token.

4. **Getting a Task and Providing an Answer:**

   - **Endpoints:**
     - `GET /task`
     - `POST /task`
   - **Request Parameters for `POST /task`:**
     - `answer` (number) - User's answer to the task.
   - **Response for `GET /task`:**
     - Success:
       ```json
       {
         "task": "33 + 99 = ?"
       }
       ```
     - Error: Status `401 Unauthorized` for invalid token.
   - **Response for `POST /task`:**
     - Success:
       ```json
       {
         "result": "Correct!" // Or "Incorrect! The correct answer was X."
       }
       ```
     - Error: Status `400 Bad Request` for invalid answer.

5. **Top 10 Users:**
   - **Endpoint:**
     - `GET /top10`
   - **Request Parameters:**
     - No authorization required.
   - **Response:**
     - Success:
       ```json
       [
         {
           "name": "User1",
           "score": 300
         },
         {
           "name": "User2",
           "score": 290
         },
         ...
       ]
       ```
     - Error: Status `500 Internal Server Error` if server error occurs.

### Testing

- **Sign-Up and Login:**

  - Test successful account creation and login with valid data.
  - Test error handling with invalid data.

- **User Profile:**

  - Ensure profile returns correctly with valid authorization.
  - Test behavior with invalid tokens.

- **Refreshing Token:**

  - Verify that a new access token is correctly saved in the Cookie.
  - Ensure errors are handled with invalid refresh tokens.

- **Getting a Task and Providing an Answer:**

  - Check that tasks are returned and processed correctly.
  - Verify correct points are awarded or deducted based on answers.

- **Top 10 Users:**
  - Ensure top-10 users are displayed correctly.
  - Test functionality without authorization and verify data accuracy in the response.
