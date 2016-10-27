 
INSERT INTO public.license(licenseType, trial, term)
    VALUES ('BASIC', false, now())
        ON CONFLICT DO NOTHING; 
        
INSERT INTO public.license(licenseType, trial, term)
    VALUES ('ULTIMATE', false, now())
        ON CONFLICT DO NOTHING;  

-- Table: tenant
INSERT INTO public.tenant (address, description, enabled, tenantkey, license_fk)
    VALUES ('Hauptstrasse 55', 'Demo Tenant', true, 'demo', 2)
        ON CONFLICT DO NOTHING; 