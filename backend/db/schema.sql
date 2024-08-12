-- Creating Table students

CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher') NOT NULL
);

-- Creating Table Assignments

CREATE TABLE assignments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATETIME,
  creator_id INT,
  FOREIGN KEY (creator_id) REFERENCES students(id)
);

-- Creating Table submissions

CREATE TABLE submissions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT,
  student_id INT,
  submission_date DATETIME,
  grade INT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
