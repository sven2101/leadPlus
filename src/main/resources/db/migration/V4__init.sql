INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('superadmin@demo.com', true, 'Superadmin', 'DE', 'Superadmin', '$2a$10$P5.5V8TBh0BWnGL4Z9c3o.ILZFHzmlo7fraP5wjWYjE4fSotyS1pe', 'SUPERADMIN', 'superadmin@demo.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('admin@demo.com', true, 'Admin', 'DE', 'Admin', '$2a$10$FUSMIFoyWt4xuR18BkUxfeoUoZNoJ0Xwp0YRc/1NqF/PWuZZQfUfK', 'ADMIN', 'admin@demo.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('user@demo.com', true, 'User', 'DE', 'User', '$2a$10$nmV1Dppe302UgENpYVCnO.uQVzkx.Zp50.v.5QT4qjMJ1CQsS5RiK', 'USER', 'test@demo.com')
    ON CONFLICT DO NOTHING;

    -- VXRH1A7ZCURBafS9YZv6tXbKzMyaF4/I5oCELeXsEAc=
INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('api@demo', true, 'api', 'DE', 'user', '$2a$10$iJUUF.ysgHnaVVAC2YDm.uXowcWqKMX3NqQHCrAuhbOp9L3T6STFu', 'API', 'api@demo')
    ON CONFLICT DO NOTHING;
    
