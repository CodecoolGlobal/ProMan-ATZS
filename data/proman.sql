--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_statuses_id CASCADE;


DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
CREATE TABLE boards (
    id serial NOT NULL,
    name varchar
);

DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
CREATE TABLE statuses (
    id serial NOT NULL,
    name varchar,
    board_id integer NOT NULL

);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    name varchar,
    status_id integer NOT NULL

);


ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);


ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses(id);


INSERT INTO boards VALUES (1, 'proMan projekt');
INSERT INTO boards VALUES (2, 'masik projekt');
INSERT INTO boards VALUES (3, 'harmadik tabla');
INSERT INTO boards VALUES (4, 'negyedik tabla');
INSERT INTO boards VALUES (5, 'ötödik üres tábla ékezetekkeláéíóőúöüű');
SELECT pg_catalog.setval('boards_id_seq', 5, true);

INSERT INTO statuses VALUES (1, 'new', 1);
INSERT INTO statuses VALUES (2, 'to do',2);
INSERT INTO statuses VALUES (3, 'in progress', 3);
INSERT INTO statuses VALUES (4, 'in progress', 3);
INSERT INTO statuses VALUES (5, 'done', 4);
INSERT INTO statuses VALUES (6, 'done2', 5);
INSERT INTO statuses VALUES (7, 'done3', 5);
INSERT INTO statuses VALUES (8, 'done4', 4);
INSERT INTO statuses VALUES (9, 'done5', 3);
SELECT pg_catalog.setval('statuses_id_seq', 9, true);

INSERT INTO cards VALUES (1, 'environment', 1);
INSERT INTO cards VALUES (2, 'something', 2);
INSERT INTO cards VALUES (3, 'something1', 3);
INSERT INTO cards VALUES (4, 'something2', 4);
INSERT INTO cards VALUES (5, 'something3', 5);
INSERT INTO cards VALUES (6, 'something4', 6);
INSERT INTO cards VALUES (7, 'something4', 7);
INSERT INTO cards VALUES (8, 'something4', 8);
SELECT pg_catalog.setval('cards_id_seq', 8, true);

