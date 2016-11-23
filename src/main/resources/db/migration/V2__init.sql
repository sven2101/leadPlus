INSERT INTO public.license(id, licenseType, trial, term)
    VALUES (1,'ULTIMATE', false, '2017-12-12')
        ON CONFLICT DO NOTHING;  

-- Table: tenant
INSERT INTO public.tenant (id, address, description, enabled, tenantkey, license_fk)
    VALUES (1, 'Hauptstrasse 55', 'Demo Tenant', true, 'demo', 1)
        ON CONFLICT DO NOTHING; 