# Berties Books – Lab 8  
> *A continuation of Lab 6 and Lab 7*

Sample code for **Dynamic Web Applications** module.

Uses **Node.js** with **Express**, **EJS**, **MySQL2**, **bcryptjs**, **express-session**, `dotenv`, etc.

**Author:** Faizal Ali  
**Student ID:** 33781539  
**Lab 8: Sessions, Access Control, Validation & Security**

---

## 1. Overview

This project extends the earlier **Bertie’s Books** application from:

- **Lab 6** – Express + MySQL integration (books, list/add/search)
- **Lab 7** – Secure password hashing, login, and audit logging
- **Lab 8** – Session-based authentication, route protection, input validation and general security hardening

Key features now include:

- **MySQL-backed book store** (list, search, add books)
- **User registration** with passwords hashed using `bcryptjs`
- **Login + logout** using `express-session`
- **Protected routes** (only logged-in users can see sensitive pages)
- **Login audit log** (success and failure attempts are stored)
- **Default marker account** (`gold` / `smiths`) inserted via SQL script
- **Environment variables via `.env`** for database credentials and session secret
- **Server-side validation & sanitisation** (Lab 8b)
  - Registration form checked for required fields, basic structure and cleaned input
  - (Optional extra) book form validation/sanitisation to prevent obviously bad input
- **Validation & Sanitisation:**
  - This application uses express-validator for robust user input handling.
  - Examples include:
    - `body('email').isEmail()` – verifies valid email format
    - `body('username').trim().escape()` – trims whitespace & escapes HTML to prevent XSS
    - `body('password').isLength({ min: 8 })` – ensures password length
- These checks ensure only safe, valid data are stored in the database and improve app security.

---

## 2. Folder Structure

```text
berties-books/
├── node_modules/
├── public/
│   └── main.css
├── routes/
│   ├── books.js         # Book-related routes (list/add/search, bargains)
│   ├── main.js          # Home, about, logout
│   └── users.js         # Register, login, users list, audit log
├── views/
│   ├── about.ejs
│   ├── addbook.ejs
│   ├── audit.ejs
│   ├── index.ejs
│   ├── list.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── search.ejs
│   ├── search_results.ejs
│   └── users_list.ejs
├── create_db.sql        
├── insert_test_data.sql 
├── index.js             
├── package.json
├── .env                 # DB + session config (included for marking)
└── README.md
```


| Route                  | Method | Purpose                          |
| ---------------------- | ------ | -------------------------------- |
| `/`                    | GET    | Home page                        |
| `/about`               | GET    | About page                       |
| `/books/search`        | GET    | Book search form                 |
| `/books/search-result` | GET    | Displays searched keyword        |
| `/books/list`          | GET    | Lists all books (in a table)     |
| `/books/addbook`       | GET    | Add-book form                    |
| `/books/bookadded`     | POST   | Inserts a new book into DB       |
| `/users/register`      | GET    | User registration form           |
| `/users/registered`    | POST   | Hashes password + inserts user   |
| `/users/login`         | GET    | Login form                       |
| `/users/loggedin`      | POST   | Verifies password + logs attempt |
| `/users/list`          | GET    | Lists all users (no passwords)   |
| `/users/audit`         | GET    | View login audit log             |

### Routes protected by session (redirectLogin):

**Books**
- `GET /books/list`
- `GET /books/addbook`
- `POST /books/bookadded`

**Users**
- `GET /users/list`
- `GET /users/audit`

**Main**
- `GET /logout`

---

## Audit logging
Every login attempt is recorded:

| Field      | Description               |
| ---------- | ------------------------- |
| username   | Username attempted        |
| success    | 1 (success) or 0 (failed) |
| message    | Explanation               |
| ip_address | IP of the client          |
| user_agent | Browser/device details    |
| created_at | Timestamp                 |

## Default login (required for marking)

Inserted via ```insert_test_data.sql```:
```makefile
Username: gold
Password: smiths
```
Password is inserted as a correct bcryptjs hash.

---

## Setup

### Database setup

**__1️. Create Database__**
Run inside MySQL:
```sql
source create_db.sql;
source insert_test_data.sql;
```
This creates:
- `berties_books`
- `books`
- `users`
- `audit_log`
Application database user

And includes:
- `5 book entries`
- Default user gold / smiths (bcrypt hashed)

**__2. Verify__**
```sql
USE berties_books;
SELECT * FROM books;
```
---

### Running the app
```cmd
npm install
node index.js
npm install express ejs mysql2 bcryptjs dotenv express-session express-validator express-sanitizer
```
### Full list of dependencies used:
**Core**
- express – web framework
- ejs – templating engine
- mysql2 – MySQL client
- dotenv – loads `.env` variables
- express-session - ensures security & removes ability to enter certain links without being logged in
**Security**
- bcryptjs – password hashing
(Older bcrypt versions seem to incompatible or not work with the Goldsmiths VM)

---

**To access locally:** http://localhost:8000/
