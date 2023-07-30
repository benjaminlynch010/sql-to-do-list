CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"description" VARCHAR (240) NOT NULL,
"status" BOOLEAN DEFAULT FALSE);

INSERT INTO "tasks" ("description")
VALUES ('Haircut at 2:00'), 
('Review physical full-stack notes'),
('Rewatch Andrew''s full stack summary'), 
('Experiment with Concepts - iPad whiteboarding'), 
('Get base functionality on weekend project'),
('Remember to take breaks!');