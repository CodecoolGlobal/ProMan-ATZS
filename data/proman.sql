--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.board_status_card DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.board_status_card DROP CONSTRAINT IF EXISTS fk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.board_status_card DROP CONSTRAINT IF EXISTS fk_cards_id CASCADE;

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
    name varchar
);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    name varchar
);


DROP TABLE IF EXISTS public.board_status_card;
CREATE TABLE board_status_card (
    board_id integer NOT NULL,
    status_id integer,
    card_id integer
);


ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);


-- ALTER TABLE ONLY question_tag
--     ADD CONSTRAINT pk_question_tag_id PRIMARY KEY (question_id, tag_id);


ALTER TABLE ONLY board_status_card
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY board_status_card
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY board_status_card
    ADD CONSTRAINT fk_cards_id FOREIGN KEY (card_id) REFERENCES cards(id);



INSERT INTO boards VALUES (1, 'proMan projekt');
INSERT INTO boards VALUES (2, 'masik projekt');
SELECT pg_catalog.setval('boards_id_seq', 2, true);

INSERT INTO statuses VALUES (1, 'new');
INSERT INTO statuses VALUES (2, 'to do');
INSERT INTO statuses VALUES (3, 'in progress');
INSERT INTO statuses VALUES (4, 'done');
SELECT pg_catalog.setval('statuses_id_seq', 4, true);

INSERT INTO cards VALUES (1, 'environment');
INSERT INTO cards VALUES (2, 'something');
INSERT INTO cards VALUES (3, 'something1');
INSERT INTO cards VALUES (4, 'something2');
INSERT INTO cards VALUES (5, 'something3');
INSERT INTO cards VALUES (6, 'something4');
SELECT pg_catalog.setval('cards_id_seq', 6, true);

INSERT INTO board_status_card VALUES (1, 1, 1);
INSERT INTO board_status_card VALUES (1, 2, 2);
INSERT INTO board_status_card VALUES (1, 3, 3);
INSERT INTO board_status_card VALUES (1, 4, 4);
INSERT INTO board_status_card VALUES (1, 4, 5);
INSERT INTO board_status_card VALUES (1, 1, 6);
