INSERT INTO users (username, password, email) VALUES ('herda', 'herda', 'herda@email.com' );
INSERT INTO users (username, password, email) VALUES ('weijun', 'weijun', 'weijun@email.com' );
INSERT INTO users (username, password, email) VALUES ('chris', 'chris', 'chris@email.com' );
INSERT INTO users (username, password, email) VALUES ('andrew', 'andrew', 'andrew@email.com' );


INSERT INTO receipts (user_id, group_id, img_token, subtotal, total) VALUES (1, 1, 'guQnFRzRY4MXMm6F', 30, null );



INSERT INTO groups (receipt_id, friend_id, amount) VALUES (1, 2, null);
INSERT INTO groups (receipt_id, friend_id, amount) VALUES (1, 3, null);


INSERT INTO items (receipt_id, item_name, price, quantity, users_id) VALUES( 2, 'Ice Mocha', 10.00, 1, ARRAY[1,2] );
INSERT INTO items (receipt_id, item_name, price, quantity, users_id) VALUES( 2, 'Ice Latte', 10.00, 1, ARRAY[1] );
INSERT INTO items (receipt_id, item_name, price, quantity, users_id) VALUES( 2, 'Ps.Fluffy Pancake', 10.00, 1, ARRAY[3] );