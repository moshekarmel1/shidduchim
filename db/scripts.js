exports.modules = {
    initTables: `
        --drop table if exists app_references;
        --drop table if exists app_girl;
        --drop table if exists app_boy;
        --drop table if exists app_zivug;
        --drop table if exists app_user;
        CREATE TABLE IF NOT EXISTS app_user (
            user_id serial PRIMARY KEY,
            email varchar(500) NOT NULL,
            hash varchar(500) NULL,
            salt varchar(500) NULL,
            google_id varchar(500) NULL,
            create_date TIMESTAMP default NOW()
        );
        CREATE UNIQUE INDEX IF NOT EXISTS unique_email ON app_user (email);
        CREATE TABLE IF NOT EXISTS app_zivug (
            zivug_id serial PRIMARY KEY,
            gender char(1) not null default 'm' check(gender in ('m', 'f')),
            name varchar(50) NOT NULL,
            dob TIMESTAMP NOT NULL,
            zip_code varchar(50) NOT NULL,
            yeshivishness INT NULL,
            create_date TIMESTAMP default NOW(),
            created_by INT,
            CONSTRAINT fk_user_zivug
                FOREIGN KEY (created_by) 
                    REFERENCES app_user (user_id)
        );
        CREATE TABLE IF NOT EXISTS app_boy (
            zivug_id INT PRIMARY KEY REFERENCES app_zivug (zivug_id),
            create_date TIMESTAMP default NOW(),
            foreign key (zivug_id) references app_zivug (zivug_id)
        );
        CREATE TABLE IF NOT EXISTS app_girl (
            zivug_id INT PRIMARY KEY REFERENCES app_zivug (zivug_id),
            create_date TIMESTAMP default NOW(),
            foreign key (zivug_id) references app_zivug (zivug_id)
        );
        CREATE TABLE IF NOT EXISTS app_references (
            reference_id serial PRIMARY KEY,
            zivug_id INT NOT NULL REFERENCES app_zivug (zivug_id),
            name varchar(50) NOT NULL,
            phone_number varchar(50) NOT NULL,
            relationship varchar(50) NOT NULL,
            create_date TIMESTAMP default NOW(),
            created_by INT
        );
    `,
    createUser: `
        INSERT INTO app_user (email, hash, salt, google_id) VALUES 
        ($1, $2, $3, $4)
        RETURNING *
    `,
    findUser: `
        Select * From app_user Where user_id = $1;
    `,
    findUserByEmail: `
        Select * From app_user Where email = $1;
    `,
    findUserByGoogleId: `
        Select * From app_user Where google_id = $1;
    `,
    createZivug: `
        INSERT INTO app_zivug (name, gender, dob, zip_code, yeshivishness) VALUES 
        ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    updateZivug: `
        UPDATE app_zivug
        SET 1=1
        WHERE zivug_id = $1
        RETURNING *;
    `,
    deleteZivug: `
        Delete From app_zivug Where zivug_id = $1;
    `,
    findZivugId: `
        Select * From app_zivug Where zivug_id = $1;
    `,
}