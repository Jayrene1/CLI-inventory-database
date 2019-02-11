DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(128) NULL,
  department_name VARCHAR(40) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(5) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitar Curriculum Book 1", "Books", 11, 500),
    ("Guitar Curriculum Book 2", "Books", 11, 500),
    ("Guitar Picks (6 count)", "Accessories", 2.95, 250),
    ("Guitar Strap (leather)", "Accessories", 24.99, 100),
    ("Play Nirvana Tab Book", "Books", 14.99, 500),
    ("Instrument Cable (10 ft)", "Accessories", 23.99, 150),
    ("Fender Twin Reverb (2x12 85 watt)", "Amplifiers", 1299.99, 28),
    ("Gibson Les Paul Electric", "Guitars", 2799, 14),
    ("Fender Telecaster Electric", "Guitars", 1449.99, 35),
    ("Yamaha FS800 Acoustic", "Guitars", 199.99, 52);

SELECT * FROM products;