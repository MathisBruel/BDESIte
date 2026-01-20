INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt") 
VALUES (gen_random_uuid(), 'admin@suprennes.me', '$2b$10$7wzI78MMKGxg6YdNyPrpr.tBs8XUBsTA4idP5He36BsbgoeMGF4..', 'Admin', NOW(), NOW()) 
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;
