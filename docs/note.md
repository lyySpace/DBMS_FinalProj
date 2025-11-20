# notes

- from terminal connect to psql
sudo -u postgres psql

- At psql cli
list dbs: \l
connect to db: \c <db_name>
list tables: \dt
call system command: \! <command>(eg. \! clear)

- schema draft
user(user_id PK, real_name, email, username, password, nickname, role, registered_at, is_deleted)

student_profile(user_id FK→user, student_id, department_id, entry, grade)
department_profile(user_id FK→user, department_id, department_name)
company_profile(user_id FK→user, company_name, contact_person, industry)

student_department(user_id FK→user, department_id, role, start_semester, end_semester)
student_gpa(user_id FK→user, semester, gpa)
student_course_record(user_id FK→user, semester, course_id, score)
achievement(achievement_id PK, user_id FK→user, category, title, description, creation_date, status)
resource(resource_id PK, resource_type, quota, supplier_id FK→user, title, deadline, description, email, status, is_deleted)
resource_condition(resource_id FK→resource, department_id, avg_gpa, current_gpa, is_poor)

application(user_id FK→user, resource_id FK→resource, apply_date, status)

push_record(push_id PK, pusher_id FK→user, student_id FK→user, resource_id FK→resource, push_datetime)

- How to create the database from schema.sql

0. let your location be the folder where schema.sql is located

1. connect to db
```
sudo -u postgres psql
```
2. execute sql file
```
CREATE DATABASE group_7;
\c group_7;

\i schema.sql
```


proj/
  docker-compose.yml
  backend/
    Dockerfile
    requirements.txt
    alembic.ini
    alembic/
      env.py
      versions/
    app/
      __init__.py
      core/
        config.py
        security.py
      db/
        base.py
        session.py
        models/ # data tables
          __init__.py
      services/
        __init__.py
      interfaces/
        cli.py
        api.py

I remove all the old codes and start a new project structure as above.
Here are some commands:

To rebuild the whole docker environment from scratch:()
```
sudo docker compose down --volumes
sudo docker compose build --no-cache
sudo docker compose up -d
```

modify code
```
sudo docker compose restart backend
```

update the backend requirements.txt:
```
sudo docker compose build backend
sudo docker compose up -d
```

modify Dockerfile
```
sudo docker compose build --no-cache backend
sudo docker compose up -d
``` 

update alembic migration:
```
docker compose exec backend alembic revision --autogenerate -m "update xx"
docker compose exec backend alembic upgrade head
```