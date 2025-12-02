# UniConnect API Manual

**Base URL:** `http://localhost:3000/api` (Local) or configured host.
**Authentication:** JWT (JSON Web Token).
**Format:** JSON

## 1. Authentication (`/auth`)

Implemented in [`backend/src/modules/auth/auth.controller.ts`](../backend/src/modules/auth/auth.controller.ts) and [`auth.service.ts`](../backend/src/modules/auth/auth.service.ts).

### Register
Create a new user account.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "student123",
    "email": "student@example.com",
    "password": "password123",
    "real_name": "John Doe",
    "nickname": "Johnny",
    "role": "student" // "student" | "department" | "company"
  }
  ```
- **Response:**
  ```json
  {
    "user": { "user_id": "...", "username": "...", "role": "..." },
    "access_token": "...",
    "refresh_token": "...",
    "needProfile": true
  }
  ```

### Login
Authenticate a user.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "student123", // or email
    "password": "password123"
  }
  ```
- **Response:** (Tokens may be set in HttpOnly cookies depending on configuration)
  ```json
  {
    "user": { ... },
    "access_token": "...",
    "needProfile": false
  }
  ```

### Logout
Invalidate the current session.

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`

---

## 2. Common Utilities (`/common`)

Implemented in [`backend/src/common/common.controller.ts`](../backend/src/common/common.controller.ts).

### Get Departments
Retrieve a list of all departments (used for dropdowns).

- **URL:** `/common/departments`
- **Method:** `GET`
- **Response:**
  ```json
  [
    { "id": "5080", "name": "Biomedical Engineering" },
    { "id": "9020", "name": "Computer Science" }
  ]
  ```

### Set Admin
Promote a user to admin status.

- **URL:** `/common/set-admin/:userId`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Params:** `userId` (UUID of the target user)

---

## 3. Resources (`/resource`)

Implemented in [`backend/src/modules/resource/resource.controller.ts`](../backend/src/modules/resource/resource.controller.ts).

### Create Resource
Create a new scholarship, internship, lab opportunity, etc.
*Requires Role: `company` or `department`*

- **URL:** `/resource/create`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** ([`CreateResourceDto`](../backend/src/modules/resource/dto/create-resource.dto.ts))
  ```json
  {
    "resource_type": "Scholarship", // "Scholarship" | "Internship" | "Lab" | "Others"
    "title": "Fall 2025 Scholarship",
    "description": "Details here...",
    "quota": 5,
    "deadline": "2025-12-31"
  }
  ```

### Add Eligibility Condition
Add GPA or department requirements to a resource.
*Requires Role: `company` or `department`*

- **URL:** `/resource/:id/condition`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "department_id": "9020",
    "avg_gpa": 3.5,
    "current_gpa": 3.0,
    "is_poor": false
  }
  ```

### Get My Resources
Get resources created by the currently logged-in supplier.
*Requires Role: `company` or `department`*

- **URL:** `/resource/my`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`

### Get Resource by ID
Get details of a specific resource.

- **URL:** `/resource/:id`
- **Method:** `GET`

---

## 4. Student (Planned/Inferred)

Based on frontend calls in [`frontend/src/views/Student/StudentDashboard.vue`](../frontend/src/views/Student/StudentDashboard.vue).

### Get Student Info
- **URL:** `/student/info`
- **Method:** `GET`

### Get GPA Records
- **URL:** `/student/gpa`
- **Method:** `GET`

### Get Achievements
- **// filepath: /home/josh/NTU/114-1/DB/proj/docs/api_manual.md
# UniConnect API Manual

**Base URL:** `http://localhost:3000/api` (Local) or configured host.
**Authentication:** JWT (JSON Web Token).
**Format:** JSON

## 1. Authentication (`/auth`)

Implemented in [`backend/src/modules/auth/auth.controller.ts`](../backend/src/modules/auth/auth.controller.ts) and [`auth.service.ts`](../backend/src/modules/auth/auth.service.ts).

### Register
Create a new user account.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "student123",
    "email": "student@example.com",
    "password": "password123",
    "real_name": "John Doe",
    "nickname": "Johnny",
    "role": "student" // "student" | "department" | "company"
  }
  ```
- **Response:**
  ```json
  {
    "user": { "user_id": "...", "username": "...", "role": "..." },
    "access_token": "...",
    "refresh_token": "...",
    "needProfile": true
  }
  ```

### Login
Authenticate a user.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "student123", // or email
    "password": "password123"
  }
  ```
- **Response:** (Tokens may be set in HttpOnly cookies depending on configuration)
  ```json
  {
    "user": { ... },
    "access_token": "...",
    "needProfile": false
  }
  ```

### Logout
Invalidate the current session.

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`

---

## 2. Common Utilities (`/common`)

Implemented in [`backend/src/common/common.controller.ts`](../backend/src/common/common.controller.ts).

### Get Departments
Retrieve a list of all departments (used for dropdowns).

- **URL:** `/common/departments`
- **Method:** `GET`
- **Response:**
  ```json
  [
    { "id": "5080", "name": "Biomedical Engineering" },
    { "id": "9020", "name": "Computer Science" }
  ]
  ```

### Set Admin
Promote a user to admin status.

- **URL:** `/common/set-admin/:userId`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Params:** `userId` (UUID of the target user)

---

## 3. Resources (`/resource`)

Implemented in [`backend/src/modules/resource/resource.controller.ts`](../backend/src/modules/resource/resource.controller.ts).

### Create Resource
Create a new scholarship, internship, lab opportunity, etc.
*Requires Role: `company` or `department`*

- **URL:** `/resource/create`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** ([`CreateResourceDto`](../backend/src/modules/resource/dto/create-resource.dto.ts))
  ```json
  {
    "resource_type": "Scholarship", // "Scholarship" | "Internship" | "Lab" | "Others"
    "title": "Fall 2025 Scholarship",
    "description": "Details here...",
    "quota": 5,
    "deadline": "2025-12-31"
  }
  ```

### Add Eligibility Condition
Add GPA or department requirements to a resource.
*Requires Role: `company` or `department`*

- **URL:** `/resource/:id/condition`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "department_id": "9020",
    "avg_gpa": 3.5,
    "current_gpa": 3.0,
    "is_poor": false
  }
  ```

### Get My Resources
Get resources created by the currently logged-in supplier.
*Requires Role: `company` or `department`*

- **URL:** `/resource/my`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`

### Get Resource by ID
Get details of a specific resource.

- **URL:** `/resource/:id`
- **Method:** `GET`

---

## 4. Student (Planned/Inferred)

Based on frontend calls in [`frontend/src/views/Student/StudentDashboard.vue`](../frontend/src/views/Student/StudentDashboard.vue).

### Get Student Info
- **URL:** `/student/info`
- **Method:** `GET`

### Get GPA Records
- **URL:** `/student/gpa`
- **Method:** `GET`

### Get Achievements
- **URL:** `/student/achievements`
- **Method:** `GET`

### Get Recommended Resources
- **URL:** `/student/resources/recommended`
- **Method:** `GET`
