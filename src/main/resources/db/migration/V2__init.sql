
-- Data Setup

-- INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
   -- VALUES ('api@eviarc.com', true, 'api', 'DE', 'Foitzik', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'API', 'api');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('test@eviarc.com', true, 'Test', 'DE', 'testLastname', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'SUPERADMIN', 'test');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('andreas.foitzik@eviarc.com', true, 'Andreas', 'DE', 'Foitzik', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'SUPERADMIN', 'andreas.foitzik');
	
INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('andreas.atrott@***REMOVED***.com', true, 'Andreas', 'DE', 'Atrott', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'SUPERADMIN', 'andreas.atrott');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('lars.graulo@***REMOVED***.com', true, 'Lars', 'DE', 'Graulo', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'USER', 'lars.graulo');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('philipp.manzow@***REMOVED***.com', true, 'Philipp', 'DE', 'Manzow', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'USER', 'philipp.manzow');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('kristina.evtuhova@***REMOVED***.com', true, 'Kristina', 'DE', 'Evtuhova', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'USER', 'kristina.evtuhova');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('samuel.ilg@***REMOVED***.com', true, 'Samuel', 'DE', 'Ilg', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'USER', 'samuel.ilg');

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username)
    VALUES ('jana.reusch@***REMOVED***.com', true, 'Jana', 'DE', 'Reusch', '$2a$10$qHhzqUXWrGqKgdrRosVKPuNeWqVMpSmSkoCr0s3NyMui1sxOJuIge', 'USER', 'jana.reusch'); 
