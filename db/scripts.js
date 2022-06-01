exports.modules = {
    initTables: `
        --drop table app_education;
        --drop table app_family;
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
            address varchar(255) NULL,
            city varchar(50) NULL,
            state varchar(50) NULL,
            zip varchar(50) NOT NULL,
            phone varchar(50) NOT NULL,
            mom varchar(255) NOT NULL,
            dad varchar(255) NOT NULL,
            shul varchar(255) NOT NULL,
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
        CREATE TABLE IF NOT EXISTS app_education (
            education_id serial PRIMARY KEY,
            zivug_id INT NOT NULL REFERENCES app_zivug (zivug_id),
            name varchar(255) NOT NULL,
            from_year INT NULL,
            to_year INT NULL,
            create_date TIMESTAMP default NOW(),
            created_by INT
        );
        CREATE TABLE IF NOT EXISTS app_family (
            family_id serial PRIMARY KEY,
            zivug_id INT NOT NULL REFERENCES app_zivug (zivug_id),
            name varchar(100) NOT NULL,
            description varchar(255) NULL,
            dob Date NULL,
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
        INSERT INTO app_zivug (name, gender, dob, height, address, city, state, zip, phone, dad, mom, shul, created_by) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
    createReference: `
        INSERT INTO app_references (zivug_id, name, phone_number, relationship, created_by) VALUES 
        ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    deleteReference: `
        Delete From app_references Where reference_id = $1;
    `,
    getReferencesForZivug: `
        Select * From app_references Where zivug_id = $1;
    `,
    createEducation: `
        INSERT INTO app_education (zivug_id, name, from_year, to_year, created_by) VALUES 
        ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    deleteEducation: `
        Delete From app_education Where education_id = $1;
    `,
    getEducationsForZivug: `
        Select * From app_education Where zivug_id = $1;
    `,
    createFamily: `
        INSERT INTO app_family (zivug_id, name, dob, description, created_by) VALUES 
        ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
    deleteFamily: `
        Delete From app_family Where family_id = $1;
    `,
    getFamilyForZivug: `
        Select * From app_family Where zivug_id = $1;
    `,
    searchForZivug: `
        Select * From app_zivug Where gender = $1 and zip > $2 and height > $3 and dob <= $4;
    `,
}