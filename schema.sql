CREATE DATABASE resource_system;
\c resource_system;

-- UUID 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------
-- Core user
-------------------------------------------------
CREATE TABLE "user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    real_name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    nickname VARCHAR(50),
    role VARCHAR(20) CHECK(role IN ('student','department','company')),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-------------------------------------------------
-- Profile tables (1:1)
-------------------------------------------------

CREATE TABLE student_profile (
    user_id UUID PRIMARY KEY REFERENCES "user"(user_id),
    student_id VARCHAR(10) UNIQUE NOT NULL,
    department_id INT NOT NULL,
    entry_year INT,
    grade INT
);

CREATE TABLE department_profile (
    user_id UUID PRIMARY KEY REFERENCES "user"(user_id),
    department_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE company_profile (
    user_id UUID PRIMARY KEY REFERENCES "user"(user_id),
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(50),
    industry VARCHAR(50)
);

-------------------------------------------------
-- Student affiliation 
-------------------------------------------------
CREATE TABLE student_department (
    user_id UUID REFERENCES "user"(user_id),
    department_id INT NOT NULL,
    role VARCHAR(20) CHECK(role IN ('major','minor','double_major')),
    start_semester VARCHAR(10) NOT NULL,
    end_semester VARCHAR(10),
    PRIMARY KEY(user_id, department_id, role, start_semester)
);

-------------------------------------------------
-- History: GPA / Courses
-------------------------------------------------
CREATE TABLE student_gpa (
    user_id UUID REFERENCES "user"(user_id),
    semester VARCHAR(10) NOT NULL,
    gpa FLOAT CHECK(gpa BETWEEN 0 AND 4.3),
    PRIMARY KEY(user_id, semester)
);

CREATE TABLE student_course_record (
    user_id UUID REFERENCES "user"(user_id),
    semester VARCHAR(10) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    score FLOAT,
    PRIMARY KEY(user_id, semester, course_id)
);

-------------------------------------------------
-- Achievement
-------------------------------------------------
CREATE TABLE achievement (
    achievement_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES "user"(user_id),
    category VARCHAR(20),
    title VARCHAR(100),
    description TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT CHECK(status IN (0,1,2))
);

-------------------------------------------------
-- Resource 
-------------------------------------------------
CREATE TABLE resource (
    resource_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_type VARCHAR(20),
    quota INT,
    supplier_id UUID REFERENCES "user"(user_id),
    title VARCHAR(100),
    deadline DATE,
    description TEXT,
    email VARCHAR(50),
    status INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

-------------------------------------------------
-- Eligibility rule
-------------------------------------------------
CREATE TABLE resource_condition (
    resource_id UUID REFERENCES resource(resource_id),
    department_id INT NOT NULL,
    avg_gpa FLOAT,
    current_gpa FLOAT,
    is_poor BOOLEAN,
    PRIMARY KEY(resource_id, department_id)
);

-------------------------------------------------
-- Application
-------------------------------------------------
CREATE TABLE application (
    user_id UUID REFERENCES "user"(user_id),
    resource_id UUID REFERENCES resource(resource_id),
    apply_date DATE DEFAULT CURRENT_DATE,
    status BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(user_id, resource_id)
);

-------------------------------------------------
-- Push notification 
-------------------------------------------------
CREATE TABLE push_record (
    push_id SERIAL PRIMARY KEY,
    pusher_id UUID REFERENCES "user"(user_id),
    student_id UUID REFERENCES "user"(user_id),
    resource_id UUID REFERENCES resource(resource_id),
    push_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
