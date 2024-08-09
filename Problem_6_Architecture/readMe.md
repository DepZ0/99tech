# API Documentation

## Run this Project

    Use npm run start

## Sign-Up

To sign up, send a `POST` request to `/auth/sign-up` with "email" and "password".

**Example:**

POST /auth/sign-up
{
"email": "99tech@yahoo.com",
"password": "123456"
}

## Login

To log in, send a `POST` request to `/auth/login` with your "email" and "password".

**Example:**

POST /auth/login
{
"email": "99tech@yahoo.com",
"password": "123456"
}

## Check Our Profile

To view your profile, send a `GET` request to `/profile`.

The profile will include your name, email, score, and position in the top users.

**Example:**

GET /profile

## Refreshing Access Token

You must be logged in. Send a `POST` request to `/refresh-token`.

After that, you will receive an Access Token in the Cookie.

**Example:**

POST /refresh-token

## Getting a Task and Giving an Answer

1. Log in first.
2. Send a `GET` request to `/task`. You will receive a math problem, e.g., "33 + 99 = ?".
3. Send a `POST` request to `/task` with your answer in the body.

   - If the answer is correct, you will earn 10 points.
   - If the answer is incorrect, you will lose 5
