DROP DATABASE dev_PracticalTest_SQL_DataOn;
CREATE DATABASE IF NOT EXISTS dev_PracticalTest_SQL_DataOn;

USE dev_PracticalTest_SQL_DataOn;

CREATE TABLE IF NOT EXISTS positions (
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	code CHAR(3) UNIQUE NOT NULL,
	name VARCHAR(255) NOT NULL
);

INSERT INTO positions (code, name)
VALUES
('SWD', 'Software Developer'),
('PRM', 'Project Manager'),
('QAR', 'Quality Assurance'),
('DIR', 'Director'),
('CEO', 'Chief Executive Officer');

CREATE TABLE IF NOT EXISTS countries (
	id TINYINT AUTO_INCREMENT PRIMARY KEY,
	code CHAR(2) UNIQUE NOT NULL,
	name VARCHAR(255) NOT NULL
);

INSERT INTO countries (code, name)
VALUES
('ID', 'Indonesia'),
('MY', 'Malaysia'),
('TH', 'Thailand'),
('GE', 'Germany');

CREATE TABLE IF NOT EXISTS employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	dob DATE NOT NULL,
	birth_place_id TINYINT NOT NULL,
	gender ENUM('M', 'F') NOT NULL,
	address TEXT NOT NULL,
	phone VARCHAR(64) NOT NULL,
	position_id SMALLINT NOT NULL,

	FOREIGN KEY (birth_place_id) REFERENCES countries(id),
	FOREIGN KEY (position_id) REFERENCES positions(id)
);

INSERT INTO employees (first_name, last_name, dob, birth_place_id, gender, address, phone, position_id)
VALUES
('Samuel', 'Widwood', '1975-04-20', 2, 'M', 'Jl. Kebayoran Lama No. 123', '021-8758814', 1),
('Pearl', 'Stefany', '1984-01-02', 1, 'F', 'Jl. Arteri Iskandar Muda No. 224', '021-5491240', 2),
('Avril', 'Johnson', '1985-09-11', 1, 'F', 'Kav. DKI Blok 155 No. 66', '021-5100891', 3),
('Brian', 'Dempsey', '1970-10-28', 3, 'M', 'Komplek Perumahan Meruya Blok 11 No. 90', '021-7551345', 1),
('Gerard', 'Anthony', '1973-07-19', 4, 'M', 'Apartemen Mediterania 2 Tower H 10EA', '021-6459756', 4),
('Yossi', 'Jackson', '1978-02-12', 2, 'M', 'Komplek Puri Indah Blok 121 No. 55', '021-5484590', 5);

CREATE TABLE IF NOT EXISTS attendance_statuses (
	id TINYINT AUTO_INCREMENT PRIMARY KEY,
	code CHAR(3) UNIQUE NOT NULL,
	label TINYTEXT NOT NULL
);

INSERT INTO attendance_statuses (code, label)
VALUES
('SWC', 'Sick'),
('PRS', 'Present'),
('ABS', 'Absent'),
('LVE', 'Leave');

CREATE TABLE IF NOT EXISTS attendance_records (
	id INT AUTO_INCREMENT PRIMARY KEY,
	employee_id INT NOT NULL,
	date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	attendance_status_id TINYINT,

	FOREIGN KEY (employee_id) REFERENCES employees(id),
	FOREIGN KEY (attendance_status_id) REFERENCES attendance_statuses(id)
);

INSERT INTO attendance_records (employee_id, date, start_time, end_time, attendance_status_id)
VALUES
(1, '2011-12-11', '00:00', '00:00', 1),
(1, '2011-12-12', '08:04', '17:55', 2),
(2, '2011-12-11', '08:00', '18:07', 2),
(2, '2011-12-12', '07:50', '17:45', 2),
(3, '2011-12-11', '07:54', '18:11', 2),
(3, '2011-12-12', '00:00', '00:00', 3),
(4, '2011-12-11', '00:00', '00:00', 4),
(4, '2011-12-12', '00:00', '00:00', 4),
(5, '2011-12-11', '07:58', '17:14', 2),
(5, '2011-12-12', '08:00', '18:29', 2),
(6, '2011-12-11', '07:53', '17:30', 2),
(6, '2011-12-12', '07:59', '18:23', 2);


-- Tampilan 1.
SELECT
  CONCAT('EMP', LPAD(e.id, 4, '0')) AS `Employee ID`,
  CONCAT(e.first_name, ' ', e.last_name) AS `Employee Name`,
  c.code AS `Birth Place ID`,
  c.name AS `Birth Place`,
  e.dob AS `Date of Birth`,
  e.address AS `Employee Address`,
  e.phone AS `Employee Phone`,
  e.gender AS `Employee Gender`,
  p.code AS `Position ID`,
  p.name AS `Position Name`
FROM employees e
JOIN countries c ON e.birth_place_id = c.id
JOIN positions p ON e.position_id = p.id
ORDER BY e.id ASC;


-- Tampilan 2.
SELECT
  CONCAT('EMP', LPAD(e.id, 4, '0')) AS `Employee ID`,
  ar.date AS `Attendance Date`,
  ar.start_time AS `Start Time`,
  ar.end_time AS `End Time`,
  ats.code AS `Attendance ID`,
  ats.label AS `Attendance Status`
FROM attendance_records ar
JOIN employees e ON ar.employee_id = e.id
JOIN attendance_statuses ats ON ar.attendance_status_id = ats.id;


-- Tambah kolom status & update status.
ALTER TABLE employees
ADD COLUMN status ENUM('Active', 'Inactive') NOT NULL;

UPDATE employees
SET status = 'Active';


-- Karyawan yang tidak datang bekerja pada tanggal 11 Desember 2011.
SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS `Employee Name`,
  e.gender AS `Employee Gender`,
  p.name AS `Employee Position`,
  ats.label AS `Attendance Status`
FROM attendance_records ar
JOIN employees e ON ar.employee_id = e.id
JOIN positions p ON e.position_id = p.id
JOIN attendance_statuses ats ON ar.attendance_status_id = ats.id
WHERE ar.date = '2011-12-11' AND ats.code != 'PRS';
