exports.modules = {
    initTables: `
        --drop table if exists app_references;
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
            name VARCHAR(50) NOT NULL,
            gender CHAR(1) not null default 'm' check(gender in ('m', 'f')),
            dob DATE NOT NULL,
            height INT NOT NULL,
            address varchar(50) NULL,
            state varchar(50) NULL,
            zip varchar(50) NOT NULL,
            phone varchar(50) NOT NULL,
            yeshivishness INT NULL,
            create_date TIMESTAMP default NOW(),
            created_by INT,
            CONSTRAINT fk_user_zivug
                FOREIGN KEY (created_by) 
                    REFERENCES app_user (user_id)
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
        INSERT INTO app_zivug (name, gender, dob, height, address, state, zip, phone, created_by) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `,
    updateZivug: `
        UPDATE app_zivug
        SET name=$2,
        gender=$3,
        
        WHERE zivug_id = $1
        RETURNING *;
    `,
    deleteZivug: `
        Delete From app_zivug Where zivug_id = $1;
    `,
    getZivugById: `
        Select * From app_zivug Where zivug_id = $1;
    `,
    getZivugimSubmittedByUser: `
        Select * From app_zivug Where created_by = $1;
    `,
}