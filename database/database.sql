CREATE DATABASE IF NOT EXISTS vacations_db;
USE vacations_db;

CREATE TABLE IF NOT EXISTS users (
    user_code INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS vacations (
    vacation_code INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_file VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS following (
    user_code INT,
    vacation_code INT,
    PRIMARY KEY (user_code, vacation_code),
    FOREIGN KEY (user_code) REFERENCES users(user_code) ON DELETE CASCADE,
    FOREIGN KEY (vacation_code) REFERENCES vacations(vacation_code) ON DELETE CASCADE
);

INSERT INTO vacations (destination, description, start_date, end_date, price, image_file) VALUES
('Paris, France', 'A wonderful vacation in Paris', '2024-05-01', '2024-05-10', 1200.00, 'paris.jpg'),
('New York, USA', 'Explore the city that never sleeps', '2024-06-15', '2024-06-25', 1800.00, 'newyork.jpg'),
('Tokyo, Japan', 'Experience the culture of Japan', '2024-07-01', '2024-07-12', 2000.00, 'tokyo.jpg'),
('Sydney, Australia', 'Visit the iconic Sydney Opera House', '2024-08-05', '2024-08-15', 1500.00, 'sydney.jpg'),
('London, UK', 'Discover the historic sites of London', '2024-09-10', '2024-09-20', 1700.00, 'london.jpg');
('Jerusalem, Israel', 'Come see the Western Wall and Shuk Mahane Yehuda', '2024-12-20', '2024-12-26', 5000.00, 'jerusalem.jpg' );
('Gaza, Narnia', 'Visit Hamas! Not sure you will return though...', '2024-11-01', '2024-11-30', 1.00, 'gaza.jpg');
('Tehran, Iran' 'A beautiful place destroyed by Jihad', '2024-10-03', '2024-10-10', 1200.00, 'tehran.jpg');
('San Jose, Costa Rica', 'The beauty of Costa Rica', '2025-01-10', '2025-05-12', 2500.00, 'sanjose.jpg');
('Rio de Janeiro, Brazil', 'Rio de Janeiro Festival. No words needed.', '2024-12-01', '2024-12-25', 3000.00, 'rio.jpg');
('Bangkok, Thailand', 'Welcome to your cheap yet most unique vacation yet with incredible sights', '2024-10-02', '2024-10-23', 800.00, 'bangkok.jpg');
('Berlin, Germany', 'No sense of humor here, just pure Germans, lots of alcohol.', '2024-12-22', '2024-12-31', 1400.00, 'berlin.jpg');
