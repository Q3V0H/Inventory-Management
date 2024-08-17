-- CREATE TABLE sales(
--     id BIGSERIAL PRIMARY KEY,
--     product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
--     quantity BIGINT,
--     total_amount BIGINT
-- );

-- CREATE TABLE purchases(
--     id BIGSERIAL PRIMARY KEY,
--      product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
--     quantity BIGINT,
--     total_amount BIGINT
-- );


-- CREATE TYPE expense_status AS ENUM('pending', 'approved', 'cancelled');

-- CREATE TABLE expenses(
--     id BIGSERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     amount BIGINT NOT NULL,
--     approved_by BIGINT REFERENCES members(id) ON DELETE SET NULL,
--     status expense_status NOT NULL 
-- )