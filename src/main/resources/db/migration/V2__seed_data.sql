INSERT INTO categories (name, slug, description) VALUES
('Điện thoại', 'dien-thoai', 'Các dòng điện thoại thông minh'),
('Laptop', 'laptop', 'Máy tính xách tay các hãng'),
('Phụ kiện', 'phu-kien', 'Phụ kiện công nghệ'),
('Tai nghe', 'tai-nghe', 'Tai nghe Bluetooth, có dây'),
('Đồng hồ thông minh', 'dong-ho-thong-minh', 'Smartwatch và phụ kiện');

INSERT INTO products (name, slug, description, price, category_id, image_url, status) VALUES
('iPhone 16 Pro Max', 'iphone-16-pro-max', 'Apple iPhone 16 Pro Max 256GB', 34990000, 1, '/images/iphone-16-pro-max.jpg', 'ACTIVE'),
('iPhone 16 Pro', 'iphone-16-pro', 'Apple iPhone 16 Pro 128GB', 28990000, 1, '/images/iphone-16-pro.jpg', 'ACTIVE'),
('iPhone 16', 'iphone-16', 'Apple iPhone 16 128GB', 22990000, 1, '/images/iphone-16.jpg', 'ACTIVE'),
('Samsung Galaxy S25 Ultra', 'samsung-galaxy-s25-ultra', 'Samsung Galaxy S25 Ultra 512GB', 32990000, 1, '/images/galaxy-s25-ultra.jpg', 'ACTIVE'),
('Samsung Galaxy S25', 'samsung-galaxy-s25', 'Samsung Galaxy S25 256GB', 21990000, 1, '/images/galaxy-s25.jpg', 'ACTIVE'),
('Xiaomi 15 Pro', 'xiaomi-15-pro', 'Xiaomi 15 Pro 512GB', 15990000, 1, '/images/xiaomi-15-pro.jpg', 'ACTIVE'),
('MacBook Pro 16 M4', 'macbook-pro-16-m4', 'Apple MacBook Pro 16 M4 Pro 512GB', 59990000, 2, '/images/macbook-pro-16.jpg', 'ACTIVE'),
('MacBook Air M4', 'macbook-air-m4', 'Apple MacBook Air M4 256GB', 28990000, 2, '/images/macbook-air-m4.jpg', 'ACTIVE'),
('Dell XPS 16', 'dell-xps-16', 'Dell XPS 16 Intel Core Ultra 9 32GB', 45990000, 2, '/images/dell-xps-16.jpg', 'ACTIVE'),
('Lenovo ThinkPad X1', 'lenovo-thinkpad-x1', 'Lenovo ThinkPad X1 Carbon Gen 12', 42990000, 2, '/images/thinkpad-x1.jpg', 'ACTIVE'),
('ASUS ROG Zephyrus G16', 'asus-rog-zephyrus-g16', 'ASUS ROG Zephyrus G16 RTX 4070', 52990000, 2, '/images/rog-zephyrus-g16.jpg', 'ACTIVE'),
('HP Spectre x360', 'hp-spectre-x360', 'HP Spectre x360 2-in-1 16GB', 35990000, 2, '/images/spectre-x360.jpg', 'ACTIVE'),
('AirPods Pro 2', 'airpods-pro-2', 'Apple AirPods Pro 2 USB-C', 6990000, 4, '/images/airpods-pro-2.jpg', 'ACTIVE'),
('Samsung Galaxy Buds3 Pro', 'samsung-galaxy-buds3-pro', 'Samsung Galaxy Buds3 Pro ANC', 4990000, 4, '/images/galaxy-buds3-pro.jpg', 'ACTIVE'),
('Sony WH-1000XM6', 'sony-wh-1000xm6', 'Sony WH-1000XM6 Wireless ANC', 8990000, 4, '/images/sony-wh-1000xm6.jpg', 'ACTIVE'),
('Apple Watch Ultra 3', 'apple-watch-ultra-3', 'Apple Watch Ultra 3 49mm', 21990000, 5, '/images/watch-ultra-3.jpg', 'ACTIVE'),
('Apple Watch Series 10', 'apple-watch-series-10', 'Apple Watch Series 10 45mm', 12990000, 5, '/images/watch-series-10.jpg', 'ACTIVE'),
('Samsung Galaxy Watch7', 'samsung-galaxy-watch7', 'Samsung Galaxy Watch7 44mm', 8990000, 5, '/images/galaxy-watch7.jpg', 'ACTIVE'),
('Ốp lưng iPhone 16', 'op-lung-iphone-16', 'Ốp lưng silicon chính hãng iPhone 16', 499000, 3, '/images/op-iphone-16.jpg', 'ACTIVE'),
('Cáp sạc USB-C 2m', 'cap-sac-usb-c-2m', 'Cáp sạc USB-C to USB-C 2m', 299000, 3, '/images/cap-usb-c.jpg', 'ACTIVE');
