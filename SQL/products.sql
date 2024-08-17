-- CREATE TABLE warehouse(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     manager_id BIGINT REFERENCES members(id) ON DELETE SET NULL,
--     location VARCHAR(500) NOT NULL,
--     description TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE products(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     quantity BIGINT NOT NULL,
--     description TEXT,
--     warehouse_id BIGINT REFERENCES warehouse(id) ON DELETE SET NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )


-- CREATE TYPE product_category AS ENUM('electronics', 'home_appliances', 'fashion','outdoor', 'other' );

-- ALTER TABLE products
-- ADD COLUMN in_stock BOOLEAN DEFAULT TRUE

-- CREATE TABLE product_images(
--     id BIGSERIAL PRIMARY KEY,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     image_url VARCHAR(500) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )



-- CREATE TYPE order_status AS ENUM('placed', 'to_cart', 'paid', 'assigned', 'delivered');
-- CREATE TYPE delivery_mode AS ENUM('pickup', 'delivery');

-- CREATE TABLE customer_order(
--     id BIGSERIAL PRIMARY KEY,
--     customer_id BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
--     quantity BIGINT NOT NULL,
--     delivery_mode delivery_mode DEFAULT 'pickup',
--     status order_status NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE customer_order_product(
--     id BIGSERIAL PRIMARY KEY,
--     customer_order_id BIGINT NOT NULL REFERENCES customer_order(id) ON DELETE CASCADE,
--     product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,   
--     quantity BIGINT NOT NULL,
--     amount BIGINT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );