INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('superadmin@eviarc.com', true, 'Superadmin', 'DE', 'Superadmin', '$2a$10$sMJ9QB33t9q5/ct0j.rSoeE6bZGYgGi/ybQ/9sZqDKUW8ZMcjGstS', 'SUPERADMIN', 'superadmin@eviarc.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('admin@eviarc.com', true, 'Admin', 'DE', 'Admin', '$2a$10$Vfjr4MHsZRMrfLfjReUEk.V77lCUnXXc/VwC5C3uEz1./V/xjRoyG', 'ADMIN', 'admin@eviarc.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('test@eviarc.com', true, 'User', 'DE', 'User', '$2a$10$hrTS64GHgGshns/VavWbQOf81MfoWbOND/qagVIL1xVVrLo2qxoNq', 'USER', 'test@eviarc.com')
    ON CONFLICT DO NOTHING;

    -- VXRH1A7ZCURBafS9YZv6tXbKzMyaF4/I5oCELeXsEAc=
INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('api@eviarc', true, 'api', 'DE', 'user', '$2a$10$2giR01Zq6.stHfGGg.uocuUgvgP2xzzLmoFMkwx0M1RtL74Pnqi3y', 'API', 'api@eviarc')
    ON CONFLICT DO NOTHING;