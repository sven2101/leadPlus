

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('superadmin@eviarc.com', true, 'Superadmin', 'DE', 'Superadmin', '$2a$10$Qt047/OSJ..kpyeDq8Y6eOrlJQZ4RqAM7VuVnBVKpTbglpgYZ1VJm', 'SUPERADMIN', 'superadmin@eviarc.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('admin@eviarc.com', true, 'Admin', 'DE', 'Admin', '$2a$10$Qt047/OSJ..kpyeDq8Y6eOrlJQZ4RqAM7VuVnBVKpTbglpgYZ1VJm', 'ADMIN', 'admin@eviarc.com')
    ON CONFLICT DO NOTHING; 

INSERT INTO demo."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('test@eviarc.com', true, 'User', 'DE', 'User', '$2a$10$Qt047/OSJ..kpyeDq8Y6eOrlJQZ4RqAM7VuVnBVKpTbglpgYZ1VJm', 'USER', 'test@eviarc.com')
    ON CONFLICT DO NOTHING;
/*
-- Data Setup

INSERT INTO public.tenant(address, description, enabled, tenant_key)
    VALUES ('Hauptstrasse 55', 'Bester Tenant', true, 'eviarc');

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('andreas.foitzik@eviarc.com', true, 'Andreas', 'DE', 'Foitzik', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'SUPERADMIN', 'andreas.foitzik', 1);
    
INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('andreas.atrott@***REMOVED***.com', true, 'Andreas', 'DE', 'Atrott', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'SUPERADMIN', 'andreas.atrott', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('lars.graulo@***REMOVED***.com', true, 'Lars', 'DE', 'Graulo', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'lars.graulo', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('philipp.manzow@***REMOVED***.com', true, 'Philipp', 'DE', 'Manzow', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'philipp.manzow', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('kristina.evtuhova@***REMOVED***.com', true, 'Kristina', 'DE', 'Evtuhova', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'kristina.evtuhova', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('samuel.ilg@***REMOVED***.com', true, 'Samuel', 'DE', 'Ilg', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'samuel.ilg', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('jana.reusch@***REMOVED***.com', true, 'Jana', 'DE', 'Reusch', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'jana.reusch', 1); 

*/