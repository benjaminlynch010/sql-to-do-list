-- Database Name : weekend-to-do-app
CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"description" VARCHAR (240) NOT NULL,
"status" BOOLEAN);

INSERT INTO "tasks" ("description", "status")
VALUES ('Haircut at 2:00', false), 
('Review physical full-stack notes', true),
('Rewatch Andrew''s full stack summary', false), 
('Experiment with Concepts - iPad whiteboarding', true), 
('Get base functionality on weekend project', false),
('Remember to take breaks!', false);