INSERT INTO users (username, password, email) VALUES ('herda', 'herda', 'herda@email.com' );
INSERT INTO users (username, password, email) VALUES ('weijun', 'weijun', 'weijun@email.com' );
INSERT INTO users (username, password, email) VALUES ('chris', 'chris', 'chris@email.com' );
INSERT INTO users (username, password, email) VALUES ('andrew', 'andrew', 'andrew@email.com' );


INSERT INTO receipts (user_id, group_id, img_token, subtotal, total) VALUES (1, 1, 'guQnFRzRY4MXMm6F', null, null );



INSERT INTO groups (receipt_id, friend_id, amount) VALUES (1, 2, null);
INSERT INTO groups (receipt_id, friend_id, amount) VALUES (1, 3, null);