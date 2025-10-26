SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
00000000-0000-0000-0000-000000000000	c9177fb0-ec32-42bd-b5f1-1b475ebab44c	{"action":"user_confirmation_requested","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-05-04 19:25:35.184871+00	
00000000-0000-0000-0000-000000000000	36bf0891-fa73-47c2-9a08-54760f058efb	{"action":"user_signedup","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"team"}	2025-05-04 19:25:48.518536+00	
00000000-0000-0000-0000-000000000000	5bf94465-992b-40da-93c4-c42b13fffb59	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-04 19:45:45.302928+00	
00000000-0000-0000-0000-000000000000	d003bc5e-978b-48b3-9e71-ee04aa4e38f1	{"action":"logout","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account"}	2025-05-04 20:26:37.185635+00	
00000000-0000-0000-0000-000000000000	bd5a7195-375e-442e-8021-5d84d31b1e0b	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-04 20:26:46.242961+00	
00000000-0000-0000-0000-000000000000	8ea97386-e6b3-4d8b-aacc-29f55498799d	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-04 21:24:50.126553+00	
00000000-0000-0000-0000-000000000000	01e0c751-e977-4c39-9e0f-d34e3ed0ba73	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-04 21:24:50.128597+00	
00000000-0000-0000-0000-000000000000	46d05bac-fd21-42ba-8e90-3a9839fe4167	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 06:00:51.562631+00	
00000000-0000-0000-0000-000000000000	cc59a98b-e8d2-4909-98cd-dc79e689f58d	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 06:00:51.569757+00	
00000000-0000-0000-0000-000000000000	27990435-8ebc-4780-ae24-618999cfe9fb	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 10:44:44.552489+00	
00000000-0000-0000-0000-000000000000	83688e4e-1fb5-46e7-bf50-d5329dd1611b	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 10:44:44.56387+00	
00000000-0000-0000-0000-000000000000	c0f5d5f2-8ca0-4ba4-8671-3ce0b483c4fe	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 11:50:27.832766+00	
00000000-0000-0000-0000-000000000000	71d0b3d8-2e76-4c72-a107-80282b9a32f0	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 11:50:27.834308+00	
00000000-0000-0000-0000-000000000000	5393c7b5-72b9-4710-a2e2-f3a27ce29f72	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 14:49:58.568084+00	
00000000-0000-0000-0000-000000000000	ce869d66-5444-4cef-896c-00d617ba99d3	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 14:49:58.571118+00	
00000000-0000-0000-0000-000000000000	c5b0c5ac-1e8c-43c1-8215-cec5a4a411e1	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 17:33:20.859835+00	
00000000-0000-0000-0000-000000000000	4893f004-3c4b-4769-9097-b7fa8d50a065	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 17:33:20.867326+00	
00000000-0000-0000-0000-000000000000	906a6f28-3744-460e-abe3-c39fff244f0b	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 18:31:34.829911+00	
00000000-0000-0000-0000-000000000000	69f5c02d-38e9-4fb8-a08b-fccfe8017453	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 18:31:34.830662+00	
00000000-0000-0000-0000-000000000000	4e28cc72-ac41-467c-97d1-31115626a037	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 20:53:43.588384+00	
00000000-0000-0000-0000-000000000000	d4bd572b-f350-4598-a8da-a44c152485b8	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-05 20:53:43.592316+00	
00000000-0000-0000-0000-000000000000	cacc49d6-760c-4a6b-8b06-95cd8d51443c	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:28:02.883717+00	
00000000-0000-0000-0000-000000000000	e0c95b5b-4c13-4585-b6ac-4243e0370a8a	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 05:28:02.891167+00	
00000000-0000-0000-0000-000000000000	ef4895c8-b01a-4b5b-a2a2-03206a457a16	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 06:48:53.902519+00	
00000000-0000-0000-0000-000000000000	5c7592d0-875c-4b7c-8adb-c2776b5cfcca	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 06:48:53.909598+00	
00000000-0000-0000-0000-000000000000	804d628e-231f-4c3f-9929-664e002045ef	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 09:43:15.955557+00	
00000000-0000-0000-0000-000000000000	9e0d1759-fd09-4aea-9af6-fec98ea5b100	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 09:43:15.959472+00	
00000000-0000-0000-0000-000000000000	475fa2ce-56d8-47cb-b66c-f74e8d78d9a6	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:00:52.054933+00	
00000000-0000-0000-0000-000000000000	045166c9-c64d-4b86-84a4-5a709321fa7b	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:00:52.057459+00	
00000000-0000-0000-0000-000000000000	e451c75b-adcc-4350-bea1-f7ec18ce3895	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:03:36.845384+00	
00000000-0000-0000-0000-000000000000	ccad9039-8ceb-47e9-bc0e-c9b4517b1c17	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:03:36.847495+00	
00000000-0000-0000-0000-000000000000	94f242d7-c67b-4b53-ac90-4f351ac6c3fd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 18:44:35.993802+00	
00000000-0000-0000-0000-000000000000	4e79670a-7e72-4b33-8bc4-8162a3b53b6f	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 18:44:36.007954+00	
00000000-0000-0000-0000-000000000000	212b9a1c-a274-4177-9af1-36053f24f36a	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:07:18.290497+00	
00000000-0000-0000-0000-000000000000	0da9a403-f72c-41b1-91a0-e745b9d7badb	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-06 20:07:18.298593+00	
00000000-0000-0000-0000-000000000000	7a4b1549-0f4d-4ab1-9411-7e7fb8de158f	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:53:26.099074+00	
00000000-0000-0000-0000-000000000000	c3f8b671-0bad-473f-81dc-a184a3ef4f84	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 05:53:26.104043+00	
00000000-0000-0000-0000-000000000000	f12530dd-ef89-43b5-9b65-5ad85ff1a1ee	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 07:20:08.661839+00	
00000000-0000-0000-0000-000000000000	355570f0-82d7-4fd4-ae5c-bf1d353412e3	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 07:20:08.674226+00	
00000000-0000-0000-0000-000000000000	0ad25b5c-0145-4c58-addd-986e1092f584	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 08:38:37.872056+00	
00000000-0000-0000-0000-000000000000	0b740d31-372c-4441-969e-83dbc3918588	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 08:38:37.873529+00	
00000000-0000-0000-0000-000000000000	c6d798cf-5c9e-46dd-8520-94c629ff1962	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 10:22:13.826344+00	
00000000-0000-0000-0000-000000000000	f7ace8ae-a78e-46a7-a92b-68d537b74585	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 10:22:13.827785+00	
00000000-0000-0000-0000-000000000000	e92f8496-d959-4843-95ec-f810490bad16	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 12:13:47.230001+00	
00000000-0000-0000-0000-000000000000	487e0a1c-500b-4fbc-b3bd-b6a12c1e6fc1	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 12:13:47.231411+00	
00000000-0000-0000-0000-000000000000	e8e865c1-774a-4f3a-b3a5-7def7e40e78e	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:31:35.004476+00	
00000000-0000-0000-0000-000000000000	3211cc69-a755-439e-a6d7-83fa25af5da1	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 14:31:35.005846+00	
00000000-0000-0000-0000-000000000000	4bd7bab1-7d99-4914-bb2a-081d5e1fb653	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 15:31:32.493759+00	
00000000-0000-0000-0000-000000000000	b5e035ff-16d9-4ba8-bd19-21a50df1d4fc	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 15:31:32.495125+00	
00000000-0000-0000-0000-000000000000	70bb0e30-9a4c-4dc8-a878-c63518549841	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 17:42:42.895467+00	
00000000-0000-0000-0000-000000000000	37821d02-b416-428d-8fc7-e1cbf46b4243	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 17:42:42.897016+00	
00000000-0000-0000-0000-000000000000	f8d73bba-a1a9-41e2-b0f5-1295355e5f63	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 19:52:03.697118+00	
00000000-0000-0000-0000-000000000000	79c2375b-d14c-49d3-9ba2-98758a32cb87	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-07 19:52:03.6986+00	
00000000-0000-0000-0000-000000000000	85a328bf-b008-4695-ac8b-da449514bf8c	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-08 12:32:54.724874+00	
00000000-0000-0000-0000-000000000000	ac323483-e525-4702-a8c5-c6d230ca7c32	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-08 12:32:54.737029+00	
00000000-0000-0000-0000-000000000000	7cf59304-4dd2-4b4e-897f-c0abfb50ccf7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-09 06:13:08.161704+00	
00000000-0000-0000-0000-000000000000	a194423b-3e86-4064-ae1e-35ac02ffd20c	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-09 06:13:08.177343+00	
00000000-0000-0000-0000-000000000000	ef9a8f56-174b-49cd-92bb-0745f4991053	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-10 20:20:42.988083+00	
00000000-0000-0000-0000-000000000000	d6a35f57-0f1f-45d2-b95e-866c0296194d	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-10 20:20:43.010187+00	
00000000-0000-0000-0000-000000000000	b67dc384-112b-4474-ba90-1b18e8951b59	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-10 21:18:45.097016+00	
00000000-0000-0000-0000-000000000000	47f96aba-b50e-4091-b870-177b8c734c0a	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-10 21:18:45.101674+00	
00000000-0000-0000-0000-000000000000	f6321ee7-b6d9-42a2-a1a9-6de43903c0b6	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-12 06:05:49.685898+00	
00000000-0000-0000-0000-000000000000	f129bc7f-41b0-4f36-b75d-558e43d4f49b	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-12 06:05:49.691096+00	
00000000-0000-0000-0000-000000000000	384a3b2c-cea9-4640-949c-19c9d04a4580	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 17:44:16.318957+00	
00000000-0000-0000-0000-000000000000	ba24c8ef-507c-47c8-8155-4a2668c72cbd	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 17:44:16.334495+00	
00000000-0000-0000-0000-000000000000	bf5eae0b-6902-491a-a819-9a27bb168d5c	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 18:44:13.252549+00	
00000000-0000-0000-0000-000000000000	b4a7834a-bfda-415f-8577-1144c96e1751	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 18:44:13.260127+00	
00000000-0000-0000-0000-000000000000	e6a81e2b-3b4c-49f9-9e28-fd85c3f4afcd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 19:42:13.975251+00	
00000000-0000-0000-0000-000000000000	3bb52635-0488-4f59-a317-3e29ec835515	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 19:42:13.976813+00	
00000000-0000-0000-0000-000000000000	4cfbe4e3-21cd-4ef1-a5d5-0fd79169af3a	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 20:44:22.859211+00	
00000000-0000-0000-0000-000000000000	e609c29a-4e65-4895-99a7-8f4b20de8935	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-16 20:44:22.863318+00	
00000000-0000-0000-0000-000000000000	c1a4aca9-f29a-41e4-9c43-9312f00e40fd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 05:05:18.398959+00	
00000000-0000-0000-0000-000000000000	8f9d058f-1bd6-4269-8719-eb9fb5325ae8	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 05:05:18.403006+00	
00000000-0000-0000-0000-000000000000	d8fdac0d-9d46-4be6-a80a-f187fdae4ba9	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 06:03:47.156306+00	
00000000-0000-0000-0000-000000000000	4c42c2aa-b1fa-47ea-9602-ae40f499c793	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 06:03:47.157728+00	
00000000-0000-0000-0000-000000000000	b5f17ff0-070c-40a3-91d0-07cfe7cbd582	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 15:36:34.506694+00	
00000000-0000-0000-0000-000000000000	d90bff85-e6a3-48c7-807a-b18733750b6f	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 15:36:34.521899+00	
00000000-0000-0000-0000-000000000000	f7773875-b2ec-4fcd-977c-9ff2b90f729b	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 17:55:46.498945+00	
00000000-0000-0000-0000-000000000000	1e64ae8b-7e31-4e39-84d3-14360d9685db	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 17:55:46.501556+00	
00000000-0000-0000-0000-000000000000	38866408-a340-4767-9446-0052a82d39a7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 18:53:59.888937+00	
00000000-0000-0000-0000-000000000000	f34df638-052b-4b5c-a0ac-28b5da07651a	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 18:53:59.893684+00	
00000000-0000-0000-0000-000000000000	5ec69254-90a8-4209-81c9-c02c514b7faf	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 22:12:34.192816+00	
00000000-0000-0000-0000-000000000000	5b32e1ab-4da3-45c0-bdfe-e53fe830b787	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-17 22:12:34.197682+00	
00000000-0000-0000-0000-000000000000	087d5ea4-b37b-4192-b7f1-8e2879fb44de	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 11:13:16.223185+00	
00000000-0000-0000-0000-000000000000	9c71c7fb-343c-413a-8d55-8baf3d0e3aba	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 11:13:16.229487+00	
00000000-0000-0000-0000-000000000000	8f1609b3-7799-4b5c-a582-4894b939a09b	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 12:26:53.248534+00	
00000000-0000-0000-0000-000000000000	54194716-ceb7-4983-b618-eec5e9f261d9	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 12:26:53.255699+00	
00000000-0000-0000-0000-000000000000	00cb56b5-174e-4ce0-8014-894d77020fbd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 15:29:19.378672+00	
00000000-0000-0000-0000-000000000000	4c123836-5881-4f03-888c-c1419581e1b8	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 15:29:19.390597+00	
00000000-0000-0000-0000-000000000000	bff805fe-dc32-43d9-880e-074a14b9ccb8	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 18:31:16.823981+00	
00000000-0000-0000-0000-000000000000	dbbb4dbf-d21f-4465-8f5f-bc91b96b5bec	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 18:31:16.827537+00	
00000000-0000-0000-0000-000000000000	c14accc7-69ef-46a2-884f-916ab0675d21	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 19:52:53.836486+00	
00000000-0000-0000-0000-000000000000	98d6f5e4-6f60-4fd8-a11c-f6536fc9fe7a	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 19:52:53.839048+00	
00000000-0000-0000-0000-000000000000	90ee7576-8b4a-447c-9258-c8d2d41d5f17	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 20:51:32.781009+00	
00000000-0000-0000-0000-000000000000	ab7be5d5-1806-434a-9709-2f84fb964205	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-18 20:51:32.788766+00	
00000000-0000-0000-0000-000000000000	c79245d4-05ad-4190-bdef-6ba822df5afc	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 06:18:32.911468+00	
00000000-0000-0000-0000-000000000000	1c3419c5-dc9b-49e0-acba-feee79873fcc	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 06:18:32.921994+00	
00000000-0000-0000-0000-000000000000	d595257e-b4c4-40c7-bb5a-f9bb078c5675	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 07:28:15.923471+00	
00000000-0000-0000-0000-000000000000	7b95dbcf-c5ef-465f-996b-ac062be88b71	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 07:28:15.927506+00	
00000000-0000-0000-0000-000000000000	ef0ed703-d74f-4181-9649-15f7c578404d	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 10:00:32.227987+00	
00000000-0000-0000-0000-000000000000	d018fa6f-76f4-415f-904e-fdd119a7f734	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 10:00:32.241929+00	
00000000-0000-0000-0000-000000000000	2c5d2478-b7aa-42d7-a1ba-f57150ad074e	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 11:06:21.25258+00	
00000000-0000-0000-0000-000000000000	69c6ee78-8e41-49e0-a4f9-186f9f63131b	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 11:06:21.254673+00	
00000000-0000-0000-0000-000000000000	20bd33d5-35fe-4283-a5e2-2f910b8125a4	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 19:12:19.301589+00	
00000000-0000-0000-0000-000000000000	5a80e686-a7d7-4f4a-ae2a-a2246fc62b0e	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 19:12:19.317586+00	
00000000-0000-0000-0000-000000000000	6abc012f-c79c-49a1-a35f-c64cfabb33ce	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 20:18:31.920656+00	
00000000-0000-0000-0000-000000000000	1df56022-4e61-4d99-85fd-4a92af89e818	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-19 20:18:31.923568+00	
00000000-0000-0000-0000-000000000000	62fc0680-f8d6-4d7e-8741-de196ab835f9	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-20 06:32:56.969118+00	
00000000-0000-0000-0000-000000000000	88540763-f692-4ad5-a0c4-96ea18240f8d	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-20 06:32:56.983701+00	
00000000-0000-0000-0000-000000000000	650fa340-4b0d-45a7-b966-6f26c93d6728	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 12:48:45.778158+00	
00000000-0000-0000-0000-000000000000	4c45b059-16f4-4a5b-b870-5b23d31f60c3	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 12:48:45.799077+00	
00000000-0000-0000-0000-000000000000	466a69d3-8f26-4cac-9158-e042c0e22f40	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 15:10:24.079062+00	
00000000-0000-0000-0000-000000000000	429bb2e8-6bcd-404d-bb4d-18077c268b2f	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 15:10:24.081135+00	
00000000-0000-0000-0000-000000000000	a19c4aaf-83ad-49af-9e61-5dfdc23f9294	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 16:08:59.679741+00	
00000000-0000-0000-0000-000000000000	50e7fd13-ee09-49a0-8b63-d683a972c078	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 16:08:59.682493+00	
00000000-0000-0000-0000-000000000000	7b24ce86-82c3-4ce5-8be5-9fdfeb9d58c7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 17:46:24.627292+00	
00000000-0000-0000-0000-000000000000	80858f30-3312-4500-91c8-876ad64bed17	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 17:46:24.629925+00	
00000000-0000-0000-0000-000000000000	63241a42-0bcb-4c7b-8d1e-477f7612de74	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-25 18:24:39.896099+00	
00000000-0000-0000-0000-000000000000	f3066f0c-76f2-485c-a88d-1211922ce856	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-25 18:24:54.21887+00	
00000000-0000-0000-0000-000000000000	e2dd488d-7c2d-4312-b68d-f8dcd34f3628	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 19:23:22.50305+00	
00000000-0000-0000-0000-000000000000	ae87a5d2-db54-4e4f-8ad8-8c2e73c78fd1	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 19:23:22.511992+00	
00000000-0000-0000-0000-000000000000	7c6a92b3-cbcf-465e-992d-98298ecbbf75	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 20:21:28.570189+00	
00000000-0000-0000-0000-000000000000	957b2906-ae19-40be-a2d2-002261e0b261	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-25 20:21:28.572158+00	
00000000-0000-0000-0000-000000000000	a88d337d-f222-452a-bf64-d16d94a01498	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 06:35:41.457452+00	
00000000-0000-0000-0000-000000000000	cf4719a5-e8c0-4e9e-8cbb-e07fc89c7810	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 06:35:41.458986+00	
00000000-0000-0000-0000-000000000000	b170dd4a-0cee-4c4d-ac6a-bfd94e82e7b5	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 07:34:08.67473+00	
00000000-0000-0000-0000-000000000000	9fe6d01b-874a-440b-849b-1be71b70e8d8	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 07:34:08.684093+00	
00000000-0000-0000-0000-000000000000	2c8d85ad-32d5-4857-8965-0dd90285209b	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 08:32:35.872989+00	
00000000-0000-0000-0000-000000000000	a237f625-8ee5-4ddc-85c4-fcaa6c887c22	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 08:32:35.875633+00	
00000000-0000-0000-0000-000000000000	fc487364-36f0-4719-9e23-f3e4b0ff9d0e	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 09:30:35.86148+00	
00000000-0000-0000-0000-000000000000	aed1253c-d859-4d00-93d2-431dbecc5055	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 09:30:35.864222+00	
00000000-0000-0000-0000-000000000000	c2ebb908-b63c-4fde-a578-d308bbf3c7ee	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 10:34:58.862706+00	
00000000-0000-0000-0000-000000000000	5c91e167-af08-484e-aaa3-31bef1d060c5	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 10:34:58.864742+00	
00000000-0000-0000-0000-000000000000	a7c5538c-43ba-4165-bfeb-f3a25abeb84e	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 11:32:58.843674+00	
00000000-0000-0000-0000-000000000000	d3e7c73b-b5fa-4dff-9275-2d12a92dcee7	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 11:32:58.845832+00	
00000000-0000-0000-0000-000000000000	050ea977-2f1d-4b8a-9462-c201dc2ed2e7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 12:30:58.861132+00	
00000000-0000-0000-0000-000000000000	b38a4422-e1cc-443c-ba08-5acf91b18336	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 12:30:58.862706+00	
00000000-0000-0000-0000-000000000000	0260b68d-94c3-4d02-9ce5-af74fc803306	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 13:28:58.834184+00	
00000000-0000-0000-0000-000000000000	b50f9c39-19fe-4888-9ae3-e1e958f3777f	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 13:28:58.836339+00	
00000000-0000-0000-0000-000000000000	a6e8fb8c-49ec-4094-ad0d-5d0fc85c62bd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 14:27:11.300472+00	
00000000-0000-0000-0000-000000000000	7dfb4f2c-dce5-4e43-9588-f5835abb1a07	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 14:27:11.302475+00	
00000000-0000-0000-0000-000000000000	4a5c352d-ceb7-49cd-8cd0-ddd6d66ab560	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 17:29:04.291284+00	
00000000-0000-0000-0000-000000000000	98c0850f-69eb-4a32-81e3-1ba4e60dc3fb	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 17:29:04.293408+00	
00000000-0000-0000-0000-000000000000	4b4c6a65-5784-420a-b9d9-753ef2f5ce01	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 18:27:34.097567+00	
00000000-0000-0000-0000-000000000000	1fb35596-f22d-4d58-876f-2022979864cc	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 18:27:34.100088+00	
00000000-0000-0000-0000-000000000000	6ab13142-09a1-47e6-8823-6e8b4fa2c37c	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 19:26:04.038728+00	
00000000-0000-0000-0000-000000000000	7a3892c9-2f7e-48a7-9495-478fe4175e82	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-26 19:26:04.041447+00	
00000000-0000-0000-0000-000000000000	ed0d1874-3293-425c-b48e-58da531ae927	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 06:15:24.928947+00	
00000000-0000-0000-0000-000000000000	457af2cf-e8c0-4720-8505-dfe4bfff79a1	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 06:15:24.941945+00	
00000000-0000-0000-0000-000000000000	c721d506-cc35-44be-9662-899854f0dd3d	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 10:09:19.733925+00	
00000000-0000-0000-0000-000000000000	1ee38a0a-3ebd-4650-9aa2-fe8889751bcd	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 10:09:19.740388+00	
00000000-0000-0000-0000-000000000000	89db9e6d-6c1b-4079-b4cf-c142b4e12659	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 11:07:49.238669+00	
00000000-0000-0000-0000-000000000000	f3c680af-073b-4225-a094-07d56dbf6180	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 11:07:49.241277+00	
00000000-0000-0000-0000-000000000000	286abbad-fcd4-455b-a26f-e254507d31c8	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 12:06:19.204602+00	
00000000-0000-0000-0000-000000000000	1b3939e1-a640-483e-834d-6f046b37bc3f	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 12:06:19.210892+00	
00000000-0000-0000-0000-000000000000	5c7eacd4-142b-44bd-9a7e-56074834aca7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 13:08:13.226072+00	
00000000-0000-0000-0000-000000000000	0e5a3be5-dc9c-43c1-b846-14deaa55285c	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 13:08:13.22873+00	
00000000-0000-0000-0000-000000000000	3710bc18-8545-4b48-8eb3-ee71b9f077d0	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 14:06:43.229236+00	
00000000-0000-0000-0000-000000000000	33a04a7a-f0e5-4564-8ff7-9ce398fe2869	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 14:06:43.23207+00	
00000000-0000-0000-0000-000000000000	f53aadc4-68de-46a3-8db4-8d3a75b41c6d	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 20:01:21.707033+00	
00000000-0000-0000-0000-000000000000	c53f29c2-614e-4d1c-ba20-31d44179a1e9	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 20:01:21.710807+00	
00000000-0000-0000-0000-000000000000	59e3b0da-9101-40f5-936a-fe4d8e8ceb0d	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 20:59:22.887217+00	
00000000-0000-0000-0000-000000000000	8af8a1a7-c106-46a8-9523-2948a0e7f1c5	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-27 20:59:22.901176+00	
00000000-0000-0000-0000-000000000000	de0adc96-bea8-41b1-a7fa-bc840b843b5f	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 06:38:34.995251+00	
00000000-0000-0000-0000-000000000000	6c2a2043-3587-42b7-a0b1-b5061fdcd679	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 06:38:35.009692+00	
00000000-0000-0000-0000-000000000000	15862a41-b811-412f-9d63-428c417afebb	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 07:37:04.044463+00	
00000000-0000-0000-0000-000000000000	851838d8-c860-401e-bef2-805410a8fb69	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 07:37:04.048628+00	
00000000-0000-0000-0000-000000000000	e13be6c8-cce7-47f7-aaa8-e4edd649b2fa	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 08:35:34.256366+00	
00000000-0000-0000-0000-000000000000	c24a7cf6-9051-4683-9b8a-2b0c6ce05e93	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 08:35:34.259134+00	
00000000-0000-0000-0000-000000000000	398359b3-4ef0-49f1-976b-769b228eae3a	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 09:34:04.02884+00	
00000000-0000-0000-0000-000000000000	0536c0c5-b76b-4c74-bba5-d7b738d2d32b	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 09:34:04.031392+00	
00000000-0000-0000-0000-000000000000	17e24642-d09b-4fcc-b775-26743b76e2e1	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 10:32:34.087379+00	
00000000-0000-0000-0000-000000000000	10e95287-123f-43a3-a3c6-10cf06f535a2	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 10:32:34.090026+00	
00000000-0000-0000-0000-000000000000	f5ae1429-953c-4b4c-af1e-5db2caebf6b7	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 11:31:04.019831+00	
00000000-0000-0000-0000-000000000000	b95a1806-9888-4a5c-b25e-2251ca231915	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-05-28 11:31:04.022589+00	
00000000-0000-0000-0000-000000000000	1a7aad01-234c-4064-9309-002aaf09d23f	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 07:18:27.407034+00	
00000000-0000-0000-0000-000000000000	5b3868e1-2b42-4842-b7b0-57788366923d	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 07:18:27.418811+00	
00000000-0000-0000-0000-000000000000	75bb0726-3e86-4127-aa10-e91e0ebb4610	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 11:34:00.86911+00	
00000000-0000-0000-0000-000000000000	d4ebd323-1082-4e9d-a8cc-ca8e9cf3208d	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 11:34:00.877265+00	
00000000-0000-0000-0000-000000000000	42c12fdb-b248-49f2-bf9c-a0fb354d9493	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 12:33:45.794857+00	
00000000-0000-0000-0000-000000000000	09bfed15-33df-4370-98a9-902ab28cfc69	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 12:33:45.810491+00	
00000000-0000-0000-0000-000000000000	f4be760c-e386-4702-a2be-b59f50275db6	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 13:53:48.112302+00	
00000000-0000-0000-0000-000000000000	d0d80a9d-2912-45d3-a540-8e51c463ef28	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 13:53:48.115676+00	
00000000-0000-0000-0000-000000000000	e498de68-d277-4a65-a014-17563b6f295a	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 14:52:30.78646+00	
00000000-0000-0000-0000-000000000000	3744cfdf-75ea-4674-860b-d9035eaf69ff	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 14:52:30.795856+00	
00000000-0000-0000-0000-000000000000	0674d0cc-5ef1-43a0-b206-8d2a34b1e012	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:55:04.404709+00	
00000000-0000-0000-0000-000000000000	b0b7457d-73ad-44f6-8628-4e0f85d53702	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 15:55:04.409364+00	
00000000-0000-0000-0000-000000000000	6a51e4f5-f1f8-43ce-81b0-16588de03ebd	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 18:58:37.409+00	
00000000-0000-0000-0000-000000000000	ffd50da0-4f03-469e-8848-b3a4214e5862	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 18:58:37.423231+00	
00000000-0000-0000-0000-000000000000	270559e1-8265-4b6c-b5de-c4303b0e414a	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 19:04:15.531265+00	
00000000-0000-0000-0000-000000000000	b440ecdd-d1cc-4a9b-83d5-5eae8d3c43e4	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 19:04:15.534957+00	
00000000-0000-0000-0000-000000000000	705ae976-bca0-46b7-866d-3ea5bbe3eec2	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 20:01:55.842182+00	
00000000-0000-0000-0000-000000000000	40dba208-98db-4758-901e-a36f75a4a788	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 20:01:55.845438+00	
00000000-0000-0000-0000-000000000000	ba2e4639-61b0-4497-8694-3ddca2cef9fc	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 20:03:11.419922+00	
00000000-0000-0000-0000-000000000000	92cc533e-d204-455d-b2e4-49fb850dced3	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-01 20:03:11.420717+00	
00000000-0000-0000-0000-000000000000	737ca3c7-acc7-4530-9a6c-fe0618b51b5e	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 06:24:43.698572+00	
00000000-0000-0000-0000-000000000000	9e89b0a4-89de-4917-b56a-690e0ea99e02	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 06:24:43.697231+00	
00000000-0000-0000-0000-000000000000	795cd95f-b76f-44db-88d3-205c3fa67f09	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 06:24:43.711589+00	
00000000-0000-0000-0000-000000000000	06d1ddd2-c180-40d5-9641-9741a7209cad	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 06:24:43.711673+00	
00000000-0000-0000-0000-000000000000	4c0ce65e-2aef-4251-a529-4dc9ed1f4697	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 07:22:44.255911+00	
00000000-0000-0000-0000-000000000000	b028e7f8-222e-444d-a886-c3adf557d0cf	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-06-02 07:22:44.261929+00	
00000000-0000-0000-0000-000000000000	30c1d72c-2fbd-41f4-85cb-52bd1295fab8	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-09 11:15:31.34473+00	
00000000-0000-0000-0000-000000000000	3e67a5da-0571-4928-9095-64c256fd3115	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-09 11:25:17.599507+00	
00000000-0000-0000-0000-000000000000	26ddda0a-7690-4b8e-b382-f45b991dcec8	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-09 11:33:36.593051+00	
00000000-0000-0000-0000-000000000000	795a15ef-8ac0-4f19-a95b-434494696cbf	{"action":"user_confirmation_requested","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-09 11:49:40.636722+00	
00000000-0000-0000-0000-000000000000	5bd45d42-6a35-4cf4-934a-566fffac5e86	{"action":"user_signedup","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-06-09 11:49:58.971441+00	
00000000-0000-0000-0000-000000000000	009fb61b-6395-45a4-a6f4-db0895265268	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-09 11:50:00.797794+00	
00000000-0000-0000-0000-000000000000	d4b07d2b-a5e4-4c4c-93c4-ad9a5d47894c	{"action":"login","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-09 11:52:44.683575+00	
00000000-0000-0000-0000-000000000000	3e3d1aeb-0764-458c-a925-0e497dece41c	{"action":"logout","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account"}	2025-06-09 11:54:18.264365+00	
00000000-0000-0000-0000-000000000000	17ab9398-e4d3-443a-ad1f-566122dac5ac	{"action":"user_confirmation_requested","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-09 11:57:01.643361+00	
00000000-0000-0000-0000-000000000000	b5626541-121f-40a6-a0af-fe47c9592b4a	{"action":"user_signedup","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-06-09 11:57:58.967524+00	
00000000-0000-0000-0000-000000000000	af145e93-2a42-49c1-847f-ac5152f83d75	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 15:13:45.704798+00	
00000000-0000-0000-0000-000000000000	6f22b69c-dea3-4dca-8780-469b855b3a99	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 15:13:45.707633+00	
00000000-0000-0000-0000-000000000000	81cac528-18c4-4bdc-9034-a4529ee92926	{"action":"token_refreshed","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 15:35:46.261714+00	
00000000-0000-0000-0000-000000000000	49088a61-0ec4-404b-9380-c79a37459fce	{"action":"token_revoked","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 15:35:46.264557+00	
00000000-0000-0000-0000-000000000000	29f00455-717e-40a8-a7b0-5f8bf62ba841	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 20:01:24.16206+00	
00000000-0000-0000-0000-000000000000	88a49b8c-a6ae-43a5-a38d-27425c6c4f4c	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-09 20:01:24.166+00	
00000000-0000-0000-0000-000000000000	5aebd033-6686-4751-af19-95c1fcd42a22	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-10 08:06:35.415657+00	
00000000-0000-0000-0000-000000000000	49c1569a-7061-4aaa-a523-6a8bd45517d8	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-10 08:06:35.432051+00	
00000000-0000-0000-0000-000000000000	a7af3920-7706-4be8-ba92-18d958f4cacb	{"action":"token_refreshed","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-10 10:30:55.687811+00	
00000000-0000-0000-0000-000000000000	4731faf0-8f8c-410a-ad12-aa27384af445	{"action":"token_revoked","actor_id":"7b1dc254-0c0a-406c-96b9-9a200a280703","actor_username":"cpvanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-10 10:30:55.698501+00	
00000000-0000-0000-0000-000000000000	b722e157-189d-4d82-b3d8-08d9f9c04b77	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-11 08:33:39.966568+00	
00000000-0000-0000-0000-000000000000	45ef88eb-ad2f-4521-949e-45b44519a0ee	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-11 08:33:39.98344+00	
00000000-0000-0000-0000-000000000000	03a05bbf-98f1-45ea-aa5d-25da04454c63	{"action":"user_confirmation_requested","actor_id":"b51abc19-ad7a-438c-afeb-c18b600999b8","actor_username":"dirkvw102@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-17 19:36:14.240331+00	
00000000-0000-0000-0000-000000000000	b227414c-f4c0-456b-8722-ff7bbf167d3c	{"action":"user_confirmation_requested","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-17 19:37:44.018015+00	
00000000-0000-0000-0000-000000000000	ee10b764-a87a-4618-8a11-559b2b7959b6	{"action":"user_signedup","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"team"}	2025-06-17 19:38:18.173586+00	
00000000-0000-0000-0000-000000000000	349488f4-80b6-48c8-98db-8dbd80963246	{"action":"user_confirmation_requested","actor_id":"87c4c19d-ea7c-4870-8b62-6e628877c260","actor_username":"agnitavanwijk@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-06-18 18:44:29.103113+00	
00000000-0000-0000-0000-000000000000	52b8a612-b563-44a8-bf06-44e5f1ac2ceb	{"action":"user_signedup","actor_id":"87c4c19d-ea7c-4870-8b62-6e628877c260","actor_username":"agnitavanwijk@gmail.com","actor_via_sso":false,"log_type":"team"}	2025-06-18 18:45:27.491728+00	
00000000-0000-0000-0000-000000000000	9f75f4ff-e804-44a2-b46b-43c7b92db6cf	{"action":"login","actor_id":"87c4c19d-ea7c-4870-8b62-6e628877c260","actor_username":"agnitavanwijk@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-18 18:51:54.770453+00	
00000000-0000-0000-0000-000000000000	c295573d-0d5a-4ec7-9ce8-5087a774a5fb	{"action":"login","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-18 19:52:45.62766+00	
00000000-0000-0000-0000-000000000000	125afca1-6130-429e-8d28-b24117dfb504	{"action":"login","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-18 19:53:17.566719+00	
00000000-0000-0000-0000-000000000000	756a3120-ef1f-4788-b422-4ab38d622737	{"action":"token_refreshed","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-19 02:18:04.42057+00	
00000000-0000-0000-0000-000000000000	6b46bc12-6e8c-4b7c-a84c-3cf461a34439	{"action":"token_revoked","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-19 02:18:04.427712+00	
00000000-0000-0000-0000-000000000000	0788c094-dc89-40f5-91be-922a9e2e105c	{"action":"logout","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account"}	2025-06-19 02:18:09.748178+00	
00000000-0000-0000-0000-000000000000	51f8fdaa-497d-4e48-ac8c-9b26bd4604b5	{"action":"token_refreshed","actor_id":"87c4c19d-ea7c-4870-8b62-6e628877c260","actor_username":"agnitavanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-19 12:24:20.403879+00	
00000000-0000-0000-0000-000000000000	0d04faab-ad70-45e4-8e9c-6c89e8ea2d87	{"action":"token_revoked","actor_id":"87c4c19d-ea7c-4870-8b62-6e628877c260","actor_username":"agnitavanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-19 12:24:20.423378+00	
00000000-0000-0000-0000-000000000000	0dc10998-b037-497c-bea4-33df187453de	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-30 06:46:36.139647+00	
00000000-0000-0000-0000-000000000000	676b366a-4428-4138-a788-62fd0209bd73	{"action":"login","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-06 19:23:02.580596+00	
00000000-0000-0000-0000-000000000000	c3968faa-27a8-44e2-a13b-41c370bda232	{"action":"login","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-06 19:23:17.757349+00	
00000000-0000-0000-0000-000000000000	a0cad157-fc27-4c73-bb99-b2da758db3e5	{"action":"logout","actor_id":"24d42477-7f04-447f-b3bc-d044ac4c9e71","actor_username":"vanwijk-mulder@protonmail.com","actor_via_sso":false,"log_type":"account"}	2025-07-06 19:23:45.033905+00	
00000000-0000-0000-0000-000000000000	0bcb6ecd-4fa3-4c87-8600-3c962e5f28bc	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-07 14:49:32.610486+00	
00000000-0000-0000-0000-000000000000	bee7fae2-6411-4949-bc39-e0ac2d260809	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-07 14:49:32.619713+00	
00000000-0000-0000-0000-000000000000	7c9f313d-9c93-4947-b17d-12d0a2f1de87	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-14 08:24:27.802865+00	
00000000-0000-0000-0000-000000000000	2a41eed4-b6f5-4de0-8393-539cd5693774	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-14 08:24:27.812155+00	
00000000-0000-0000-0000-000000000000	dd8c90f9-22b1-4d37-9a6b-33be03997245	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 20:27:12.54009+00	
00000000-0000-0000-0000-000000000000	45721b3f-4f59-40cd-a0ce-0836503aeac4	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 20:27:12.548251+00	
00000000-0000-0000-0000-000000000000	c1031af7-7217-4903-b6db-6dd2cea6d47e	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-27 11:23:49.89001+00	
00000000-0000-0000-0000-000000000000	c7705633-54b6-494b-957c-2f6934625b69	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-27 11:24:05.830635+00	
00000000-0000-0000-0000-000000000000	f0b51a71-89a3-441f-a0b0-6de70cd239af	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-07-27 17:51:14.672914+00	
00000000-0000-0000-0000-000000000000	9d8da921-cc09-40ac-83ac-8a0454635720	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-07-27 17:51:14.67584+00	
00000000-0000-0000-0000-000000000000	f56df446-38f9-4446-b513-2a26fcb44a82	{"action":"token_refreshed","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 20:11:59.234933+00	
00000000-0000-0000-0000-000000000000	bc97cec7-8ae4-43cb-9eee-ef167248c750	{"action":"token_revoked","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 20:11:59.262835+00	
00000000-0000-0000-0000-000000000000	d032546e-b025-4705-a894-e6a15b72b35b	{"action":"logout","actor_id":"9dae8e88-9338-4379-91e2-793531742212","actor_username":"f.e.vanwijk@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-07 20:12:39.838754+00	
00000000-0000-0000-0000-000000000000	67f2e094-f950-411a-a704-c646ce356a15	{"action":"login","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-07 20:12:43.231981+00	
00000000-0000-0000-0000-000000000000	3d502d7f-e3d5-4eb4-b839-b3980e7efd99	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-08 18:55:30.173159+00	
00000000-0000-0000-0000-000000000000	329ba0f7-abfc-488a-b746-bf42d4de8f52	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-08 18:55:30.192667+00	
00000000-0000-0000-0000-000000000000	119d786c-b904-4fbe-a820-faf5abcac109	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-13 07:03:28.360098+00	
00000000-0000-0000-0000-000000000000	836ea7a1-0cb8-48b0-8aab-0b4985ca4d1c	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-13 07:03:28.384581+00	
00000000-0000-0000-0000-000000000000	f30ac78d-a66e-4876-99e7-ae8fc763be32	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-19 05:20:55.877778+00	
00000000-0000-0000-0000-000000000000	259e0cf6-6174-424b-a0aa-cab7e8a3bda9	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-08-19 05:20:55.902893+00	
00000000-0000-0000-0000-000000000000	64017f82-c5f3-4662-8767-5ff583489dee	{"action":"token_refreshed","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-09-03 20:17:19.537066+00	
00000000-0000-0000-0000-000000000000	93b6eb43-cbf8-40f8-bdb8-74df6465ff13	{"action":"token_revoked","actor_id":"5cfc8103-644c-4e79-8e87-630094168578","actor_username":"tuinapp@frankvanwijk.nl","actor_via_sso":false,"log_type":"token"}	2025-09-03 20:17:19.561548+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	87c4c19d-ea7c-4870-8b62-6e628877c260	authenticated	authenticated	agnitavanwijk@gmail.com	$2a$10$S9wXlX6b8HiW5Uiq8m3xZuqKZ/yY45kB7f8tc05o3ST9ub4.V6iZe	2025-06-18 18:45:27.492391+00	\N		2025-06-18 18:44:29.111941+00		\N			\N	2025-06-18 18:51:54.773906+00	{"provider": "email", "providers": ["email"]}	{"sub": "87c4c19d-ea7c-4870-8b62-6e628877c260", "email": "agnitavanwijk@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-06-18 18:44:29.059863+00	2025-06-19 12:24:20.449082+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b51abc19-ad7a-438c-afeb-c18b600999b8	authenticated	authenticated	dirkvw102@gmail.com	$2a$10$9Km3d5C0/73bzT/gDxrXAOZk8vp2sn45Bx3gABuvFAE.HGR8pdGSu	\N	\N	a424fa6a69e268c6312eee1497c06570ef92ae1c68519e59ef434223	2025-06-17 19:36:14.248938+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "b51abc19-ad7a-438c-afeb-c18b600999b8", "email": "dirkvw102@gmail.com", "email_verified": false, "phone_verified": false}	\N	2025-06-17 19:36:14.19241+00	2025-06-17 19:36:15.267557+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	24d42477-7f04-447f-b3bc-d044ac4c9e71	authenticated	authenticated	vanwijk-mulder@protonmail.com	$2a$10$LzCG6qANeZ1TzGBUKDzcJuaARVl.bdbg92y1OSRJlVPt7tsLoZkYW	2025-06-17 19:38:18.174253+00	\N		2025-06-17 19:37:44.018783+00		\N			\N	2025-07-06 19:23:17.759335+00	{"provider": "email", "providers": ["email"]}	{"sub": "24d42477-7f04-447f-b3bc-d044ac4c9e71", "email": "vanwijk-mulder@protonmail.com", "email_verified": true, "phone_verified": false}	\N	2025-06-17 19:37:44.006364+00	2025-07-06 19:23:17.768416+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7b1dc254-0c0a-406c-96b9-9a200a280703	authenticated	authenticated	cpvanwijk@gmail.com	$2a$10$bqHyfiQ0.MkWh3cN8xbrY.If6HeH2ep/G0PZta6oFHDSXN5.5wErK	2025-06-09 11:49:58.972773+00	\N		2025-06-09 11:49:40.640868+00		\N			\N	2025-06-09 11:52:44.68518+00	{"provider": "email", "providers": ["email"]}	{"sub": "7b1dc254-0c0a-406c-96b9-9a200a280703", "email": "cpvanwijk@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-06-09 11:49:40.617284+00	2025-06-10 10:30:55.708986+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9dae8e88-9338-4379-91e2-793531742212	authenticated	authenticated	f.e.vanwijk@gmail.com	$2a$10$.xJx1NAss9eY/PRX4jLVx.7CV9BYhrC9AxKH4h3SEw3rfzW3Tisiq	2025-06-09 11:57:58.968197+00	\N		2025-06-09 11:57:01.645609+00		\N			\N	2025-06-09 11:57:58.971954+00	{"provider": "email", "providers": ["email"]}	{"sub": "9dae8e88-9338-4379-91e2-793531742212", "email": "f.e.vanwijk@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-06-09 11:57:01.626042+00	2025-08-07 20:11:59.299476+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5cfc8103-644c-4e79-8e87-630094168578	authenticated	authenticated	tuinapp@frankvanwijk.nl	$2a$10$1uz.3ENvX24O2nOC3xXayepTSL7eqOeblD3JBnNbykA/Wcgo5ap1y	2025-05-04 19:25:48.521249+00	\N		2025-05-04 19:25:35.195176+00		\N			\N	2025-08-07 20:12:43.235087+00	{"provider": "email", "providers": ["email"]}	{"sub": "5cfc8103-644c-4e79-8e87-630094168578", "email": "tuinapp@frankvanwijk.nl", "email_verified": true, "phone_verified": false}	\N	2025-05-04 19:25:35.115971+00	2025-09-03 20:17:19.603456+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
5cfc8103-644c-4e79-8e87-630094168578	5cfc8103-644c-4e79-8e87-630094168578	{"sub": "5cfc8103-644c-4e79-8e87-630094168578", "email": "tuinapp@frankvanwijk.nl", "email_verified": true, "phone_verified": false}	email	2025-05-04 19:25:35.168147+00	2025-05-04 19:25:35.168216+00	2025-05-04 19:25:35.168216+00	dbbb481c-28ea-4c8d-9118-401466ea0478
7b1dc254-0c0a-406c-96b9-9a200a280703	7b1dc254-0c0a-406c-96b9-9a200a280703	{"sub": "7b1dc254-0c0a-406c-96b9-9a200a280703", "email": "cpvanwijk@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-06-09 11:49:40.631145+00	2025-06-09 11:49:40.631206+00	2025-06-09 11:49:40.631206+00	a982d9da-86c6-42f1-b52e-955be205cf87
9dae8e88-9338-4379-91e2-793531742212	9dae8e88-9338-4379-91e2-793531742212	{"sub": "9dae8e88-9338-4379-91e2-793531742212", "email": "f.e.vanwijk@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-06-09 11:57:01.63881+00	2025-06-09 11:57:01.638873+00	2025-06-09 11:57:01.638873+00	0bad8519-af06-4734-89a3-d6b1b041a55d
b51abc19-ad7a-438c-afeb-c18b600999b8	b51abc19-ad7a-438c-afeb-c18b600999b8	{"sub": "b51abc19-ad7a-438c-afeb-c18b600999b8", "email": "dirkvw102@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-06-17 19:36:14.233151+00	2025-06-17 19:36:14.233207+00	2025-06-17 19:36:14.233207+00	2f235904-af96-42cd-906c-ec9805430099
24d42477-7f04-447f-b3bc-d044ac4c9e71	24d42477-7f04-447f-b3bc-d044ac4c9e71	{"sub": "24d42477-7f04-447f-b3bc-d044ac4c9e71", "email": "vanwijk-mulder@protonmail.com", "email_verified": true, "phone_verified": false}	email	2025-06-17 19:37:44.015146+00	2025-06-17 19:37:44.015195+00	2025-06-17 19:37:44.015195+00	bee7b483-2ed0-4541-97e7-c4e5e816a858
87c4c19d-ea7c-4870-8b62-6e628877c260	87c4c19d-ea7c-4870-8b62-6e628877c260	{"sub": "87c4c19d-ea7c-4870-8b62-6e628877c260", "email": "agnitavanwijk@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-06-18 18:44:29.090271+00	2025-06-18 18:44:29.090327+00	2025-06-18 18:44:29.090327+00	64a76672-24ba-4c6c-8816-1f956c691da0
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id") FROM stdin;
20d96ca2-49db-4a0f-932a-b8b94a4941ce	7b1dc254-0c0a-406c-96b9-9a200a280703	2025-06-09 11:49:58.977046+00	2025-06-09 11:49:58.977046+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36	85.147.217.203	\N	\N
9ac29755-4e0a-4d91-8a2c-5fd813442a19	7b1dc254-0c0a-406c-96b9-9a200a280703	2025-06-09 11:52:44.685253+00	2025-06-10 10:30:55.712376+00	\N	aal1	\N	2025-06-10 10:30:55.712292	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36	85.147.217.203	\N	\N
82541abe-7cee-4904-a9c2-e3030585a414	87c4c19d-ea7c-4870-8b62-6e628877c260	2025-06-18 18:45:27.498672+00	2025-06-18 18:45:27.498672+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36	82.170.220.90	\N	\N
8a6167fa-8de3-453c-9f1d-26bbacc391e1	87c4c19d-ea7c-4870-8b62-6e628877c260	2025-06-18 18:51:54.773985+00	2025-06-19 12:24:20.457734+00	\N	aal1	\N	2025-06-19 12:24:20.457646	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36	82.170.220.90	\N	\N
3865989b-6560-4739-8c05-9b8cfa60f466	5cfc8103-644c-4e79-8e87-630094168578	2025-07-27 11:23:49.913973+00	2025-07-27 11:23:49.913973+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36	86.89.43.82	\N	\N
ea7afd6d-4cd2-4fb5-9766-eaada83e83b0	5cfc8103-644c-4e79-8e87-630094168578	2025-07-27 11:24:05.833874+00	2025-08-19 05:20:55.948605+00	\N	aal1	\N	2025-08-19 05:20:55.948506	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36	86.89.43.82	\N	\N
562a05b0-3330-48ea-968b-d2f88ff4f7a3	5cfc8103-644c-4e79-8e87-630094168578	2025-08-07 20:12:43.235177+00	2025-09-03 20:17:19.61273+00	\N	aal1	\N	2025-09-03 20:17:19.612634	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	86.89.43.82	\N	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
20d96ca2-49db-4a0f-932a-b8b94a4941ce	2025-06-09 11:49:58.982349+00	2025-06-09 11:49:58.982349+00	otp	8ff0e2fc-14f7-46c0-8d26-d7f72b305b1a
9ac29755-4e0a-4d91-8a2c-5fd813442a19	2025-06-09 11:52:44.689981+00	2025-06-09 11:52:44.689981+00	password	c99a1c96-bd8c-4930-b068-183f9ff67044
82541abe-7cee-4904-a9c2-e3030585a414	2025-06-18 18:45:27.524872+00	2025-06-18 18:45:27.524872+00	otp	bbbbeaa4-d1f7-43a6-96f1-a663d475f06d
8a6167fa-8de3-453c-9f1d-26bbacc391e1	2025-06-18 18:51:54.780971+00	2025-06-18 18:51:54.780971+00	password	306ce737-a3b1-47fc-9184-00962625ab36
3865989b-6560-4739-8c05-9b8cfa60f466	2025-07-27 11:23:49.954433+00	2025-07-27 11:23:49.954433+00	password	5c1f6836-b283-46b7-9ce4-14ca50b412f4
ea7afd6d-4cd2-4fb5-9766-eaada83e83b0	2025-07-27 11:24:05.839252+00	2025-07-27 11:24:05.839252+00	password	057a72de-9632-41e7-9288-38bfbd6196a7
562a05b0-3330-48ea-968b-d2f88ff4f7a3	2025-08-07 20:12:43.244581+00	2025-08-07 20:12:43.244581+00	password	30c82892-241e-4cc5-a036-ac75371c4607
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
b5750c86-87fb-42f7-a8c9-49fad03faa45	b51abc19-ad7a-438c-afeb-c18b600999b8	confirmation_token	a424fa6a69e268c6312eee1497c06570ef92ae1c68519e59ef434223	dirkvw102@gmail.com	2025-06-17 19:36:15.28169	2025-06-17 19:36:15.28169
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	118	wvmttsyesdk3	87c4c19d-ea7c-4870-8b62-6e628877c260	t	2025-06-18 18:51:54.776884+00	2025-06-19 12:24:20.424032+00	\N	8a6167fa-8de3-453c-9f1d-26bbacc391e1
00000000-0000-0000-0000-000000000000	122	ektsittnkuw7	87c4c19d-ea7c-4870-8b62-6e628877c260	f	2025-06-19 12:24:20.436801+00	2025-06-19 12:24:20.436801+00	wvmttsyesdk3	8a6167fa-8de3-453c-9f1d-26bbacc391e1
00000000-0000-0000-0000-000000000000	106	w4ubctyi33pz	7b1dc254-0c0a-406c-96b9-9a200a280703	f	2025-06-09 11:49:58.978071+00	2025-06-09 11:49:58.978071+00	\N	20d96ca2-49db-4a0f-932a-b8b94a4941ce
00000000-0000-0000-0000-000000000000	108	l54yzuwc7lmu	7b1dc254-0c0a-406c-96b9-9a200a280703	t	2025-06-09 11:52:44.687008+00	2025-06-09 15:35:46.265089+00	\N	9ac29755-4e0a-4d91-8a2c-5fd813442a19
00000000-0000-0000-0000-000000000000	111	ilh7vy6iu3br	7b1dc254-0c0a-406c-96b9-9a200a280703	t	2025-06-09 15:35:46.266567+00	2025-06-10 10:30:55.699144+00	l54yzuwc7lmu	9ac29755-4e0a-4d91-8a2c-5fd813442a19
00000000-0000-0000-0000-000000000000	114	5oezwsed4dub	7b1dc254-0c0a-406c-96b9-9a200a280703	f	2025-06-10 10:30:55.704+00	2025-06-10 10:30:55.704+00	ilh7vy6iu3br	9ac29755-4e0a-4d91-8a2c-5fd813442a19
00000000-0000-0000-0000-000000000000	117	wuhbdgvg4glh	87c4c19d-ea7c-4870-8b62-6e628877c260	f	2025-06-18 18:45:27.50806+00	2025-06-18 18:45:27.50806+00	\N	82541abe-7cee-4904-a9c2-e3030585a414
00000000-0000-0000-0000-000000000000	128	pmga63ymqtir	5cfc8103-644c-4e79-8e87-630094168578	f	2025-07-27 11:23:49.925489+00	2025-07-27 11:23:49.925489+00	\N	3865989b-6560-4739-8c05-9b8cfa60f466
00000000-0000-0000-0000-000000000000	129	jfqoruhqv47v	5cfc8103-644c-4e79-8e87-630094168578	t	2025-07-27 11:24:05.836069+00	2025-07-27 17:51:14.676389+00	\N	ea7afd6d-4cd2-4fb5-9766-eaada83e83b0
00000000-0000-0000-0000-000000000000	130	u2fabzdqyuoh	5cfc8103-644c-4e79-8e87-630094168578	t	2025-07-27 17:51:14.684866+00	2025-08-08 18:55:30.194593+00	jfqoruhqv47v	ea7afd6d-4cd2-4fb5-9766-eaada83e83b0
00000000-0000-0000-0000-000000000000	133	aipuahhpnnvl	5cfc8103-644c-4e79-8e87-630094168578	t	2025-08-08 18:55:30.217201+00	2025-08-13 07:03:28.387874+00	u2fabzdqyuoh	ea7afd6d-4cd2-4fb5-9766-eaada83e83b0
00000000-0000-0000-0000-000000000000	134	ml3mlapmx4ht	5cfc8103-644c-4e79-8e87-630094168578	t	2025-08-13 07:03:28.41474+00	2025-08-19 05:20:55.903652+00	aipuahhpnnvl	ea7afd6d-4cd2-4fb5-9766-eaada83e83b0
00000000-0000-0000-0000-000000000000	135	uixg66576nrd	5cfc8103-644c-4e79-8e87-630094168578	f	2025-08-19 05:20:55.928931+00	2025-08-19 05:20:55.928931+00	ml3mlapmx4ht	ea7afd6d-4cd2-4fb5-9766-eaada83e83b0
00000000-0000-0000-0000-000000000000	132	thkaerimzcxl	5cfc8103-644c-4e79-8e87-630094168578	t	2025-08-07 20:12:43.237743+00	2025-09-03 20:17:19.562255+00	\N	562a05b0-3330-48ea-968b-d2f88ff4f7a3
00000000-0000-0000-0000-000000000000	136	qnyd7pzcwy76	5cfc8103-644c-4e79-8e87-630094168578	f	2025-09-03 20:17:19.592628+00	2025-09-03 20:17:19.592628+00	thkaerimzcxl	562a05b0-3330-48ea-968b-d2f88ff4f7a3
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: borders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."borders" ("created_at", "name", "id", "user_id") FROM stdin;
2025-04-27 20:29:23.871679+00	Achter	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:29:33.337796+00	Midden	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:29:40.94726+00	Gevel	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:29:47.14421+00	Voor	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:29:56.978742+00	Water	08de6cda-3cc0-4910-8257-b261263bed2c	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:30:12.784231+00	Pot	1760aca3-3d7a-4b8f-a96a-86e06bc5bbf4	5cfc8103-644c-4e79-8e87-630094168578
2025-06-17 19:43:34.835554+00	Voortuin	2f7784a8-bb26-4b7d-8708-fde6ff28b0cb	24d42477-7f04-447f-b3bc-d044ac4c9e71
2025-06-17 19:43:40.556346+00	Achtertuin	fc2c9d38-b9a7-4552-a21d-dc48d198ace4	24d42477-7f04-447f-b3bc-d044ac4c9e71
2025-06-18 18:53:08.362971+00	Voor border	6cef9e33-bb63-4f74-abc3-45578692e1c1	87c4c19d-ea7c-4870-8b62-6e628877c260
2025-06-18 18:53:39.328467+00	Mediterrane berg	8103ed4c-7171-4ef8-af1f-6bed6c8deee5	87c4c19d-ea7c-4870-8b62-6e628877c260
\.


--
-- Data for Name: plants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."plants" ("name", "name_nl", "color", "border_text", "type", "comments", "alive", "id", "user_id", "created_at") FROM stdin;
Ligularia przewalskii	Tongkruiskruid	#FFFF00	Voor	vaste_plant	\N	t	98650a62-12df-46f5-9ad8-0d221bb0e748	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Monarda 'Beauty of Cobham'	Bergamot, Hanenkam	#FFC0CB	Midden	vaste_plant	Dood?	t	f3a9d944-5de4-4ead-a965-8e49a3473f35	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Lythrum salicaria	Grote kattenstaart	#800080	Water	vaste_plant	\N	t	0e78598e-c05e-4901-8c46-0c496f3b82c4	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Persicaria affinis 'Darjeeling Red'	Duizendknoop	#FFC0CB	Gevel	vaste_plant	Bodembedekker die bruin wordt	t	259aed0b-3bed-49f7-a3a5-cf97751c87d8	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Phlomis russeliana	Brandkruid, etagebloem	#FFFF00	Voor, Water	vaste_plant	Wordt erg groot, staat naast hebe	t	e8e4b615-7a62-44eb-bfa0-7e37015c8ce4	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Pulmonaria off. 'Sissinghurst White	Longkruid	#FFFFFF	Achter	vaste_plant	\N	t	86d3a21e-fea1-4d47-b6d8-884f631e2c1d	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Pulsatilla vulgaris 'Rubra'	Wildemanskruid	#8B0000	Midden	vaste_plant	\N	t	b4fc7b28-02b2-49f8-ad06-577b3aa41d58	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Rudbeckia ful. 'Goldsturm'	Gele zonnehoed	#FFFF00	Midden	vaste_plant	\N	t	7aaf19df-ce80-407e-826d-e47edd9438e6	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Salvia mic. 'Hot Lips'	Salie	#FF0000,#FFFFFF	Midden	vaste_plant	in de winter 1/3 snoeien en goed draineren, eetbare bloemen, niet snoeien in herfst	t	128716be-9fb5-4ac4-80c3-647862aa3042	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Salvia nemorosa 'Caradonna'	Salie	#4B0082	Midden	vaste_plant	\N	t	59dfba70-72bc-4549-a099-4e8a5455bd10	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Scabiosa col. 'Pink Mist'	Duifkruid	#FFC0CB	Midden	vaste_plant	Uitgebloeide bloemen weghalen of af en toe een uitgebloeide stengel	t	6c0a6706-3022-4301-94c0-913be8520902	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Stachys monieri 'Hummelo'	Andoorn	#800080	Midden	vaste_plant	\N	t	762b74e1-5f7c-442e-8597-f69f61ed5eaa	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Verbena  bonariensis 'Lollypop'	IJzerhard	#800080	Midden	vaste_plant	\N	t	c354edb2-751f-40e3-85d9-62beb570565c	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Aubrieta 'Cascade Red'	Blauwkussen	#800080	Midden	vaste_plant	Meteen dood?	t	f7ca19a2-754f-4b41-92b6-c4dce4f72d24	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Salvia nemorosa 'Ostfriesland'	Ostfriesland	#800080	Midden	vaste_plant	\N	t	46a019c2-983c-43e6-9de9-cabc704a5c89	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Persicaria amplexicaulis	Duizendknoop	#FFC0CB	Water	vaste_plant	Slootkant	t	71696364-d3cc-4b13-9e89-52488ee5952d	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Alstroemeria 'Indian Summer'	Incalelie	#FFA500,#FFFF00	Midden	vaste_plant	Eerste paar jaar mulchen, uitgebloeide stelen bij de grond afknippen	t	6b3ee280-be1d-4a47-abe4-75ee9acbed26	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Dianthus	Anjer	#FF00FF	Gevel	vaste_plant	\N	t	5dfb90c7-9765-421c-80b7-5d00f031686a	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Dianthus barbatus	Duizendschoon	#FF00FF	Midden	vaste_plant	\N	t	59e86fa2-ccfb-4108-aa74-c0fb7f0ef69b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Armeria martima	Engels gras	#FFC0CB	Midden, Pot	vaste_plant	\N	t	64492dae-7c91-44ff-85fc-71f1f5aeae71	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Erysimum 'Bowles Mauve'	Steenraket, muurbloem	#FF00FF	Midden	vaste_plant	\N	t	ed87d197-eb86-444c-88bd-3bb20eec0be3	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Primula vulgaris	Stengelloze sleutelbloem	#FFFFFF,#FFFF00,#FF0000	Pot	vaste_plant	\N	t	db1fa86f-cf0c-4134-b298-029af4580d45	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Akebia quinata	Klimbes, schijnaugurk	#008000	Midden	vaste_plant	\N	t	99355944-88a3-4da5-9b17-3b57df172b87	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Agapanthus 'Gletscher'	Afrikaanse lelie	#FFFFFF	Midden	vaste_plant	Blue Heaven, splisen in maart, boeit beter in potten, vloeibare tomatenvoeding tijdens bloei	t	f88269b5-141c-4c1a-a389-730e64f34613	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Paeonia	Pioen	\N	Gevel	vaste_plant	\N	t	8f2b3a60-5c1d-46ff-b585-f39d7a1952f7	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Actaea Brunette	Zilverkaars	#FFFFFF	Midden	vaste_plant	\N	t	e46a0536-9801-41b8-ac84-f86278b49d20	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Geranium macrorrhizum 'Czakor'	Rotsooievaarsbek	#FFC0CB	Voor	vaste_plant	\N	t	f8d309c8-e788-4d0d-90d8-0760a84f7b46	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Hemerocallis lilioasphodelus	Daglelie	#FFFF00	Midden	vaste_plant	Snoeien in voorjaar	t	a8d7c407-08c1-4c2b-b0f0-5df6d4c37b9c	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Acer palmatum 'Fireglow'	Japanse esdoorn	#8B0000	Achter	heester	\N	t	0b5c713b-b5ec-4cb4-9025-0972093ab566	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Clematis Montana 'Mayleen'	Bosrank	#FFC0CB	Midden	klimmer	Groep 1; hoeft geen snoei, mag wel (na bloei)	t	9c3b01ce-9161-43bc-8895-7c06c3dda2a3	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Agastache 'Blue Fortune'	Anijsnetel, dropplant, Koreaanse munt	#1E90FF	Midden, Voor	vaste_plant	\N	t	27c26082-1a3a-440f-bd43-a61382bdb957	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Allium afl. 'Purple Sensation'	Sierui	#800080	Midden	vaste_plant	\N	\N	6276f336-2972-439c-89eb-92b9a35781d9	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Anemone hupehensis 'Praecox'	Herfstanemoon	#FFC0CB	Achter	vaste_plant	\N	t	d888ad95-bdad-4d83-a717-a306501026c4	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Echineacea purpurea 'Alba'	Witte zonnehoed	#FFFFFF,#FFFF00	Gevel, Voor	vaste_plant	\N	t	de9af901-1a44-4705-8441-e5b5fa876ddc	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Aster dumosus 'Prof. Anton Kippenberg'	Herfstaster	#1E90FF	Midden, Achter	vaste_plant	\N	t	799e3366-a1d2-408a-9f21-6daa5aea3c05	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Brunnera macrophylla	Kaukasisch vergeet-mij-nietje	#1E90FF	Achter	vaste_plant	\N	t	4bd0c250-a780-43ca-a5c1-4e01bafb13c4	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Echinacea 'Sunseeker Red'	Zonnehoed	#FF0000	Voor	vaste_plant	\N	t	98593b5e-da24-4f58-afae-033fa4fe8dc2	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Echinacea 'Sympathy'	Zonnehoed	#FFA500	Voor	vaste_plant	\N	t	de85dd14-68fb-43e0-bbf0-c023e6db6dba	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Clematis 'Niobe'	Grootbloemige bosrank	#800080	Gevel	klimmer	Groep 2: Terugknippen naar 30-50cm in maart, koemest maart, uitgebloeide bloemen afknippen voor 2e bloei eind zomer	t	5bf9ef8b-fa77-4de9-adc8-0d2b2a70066a	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Buddleja Davedii 'Pink delight'	Vlinderstruik	#800080	Midden	heester	Snoeien in april tot 50-60cm van de grond, uitgebloeide bloemen wegknippen voor tweede bloei	t	d352a0c9-b451-4d4a-99bb-2d694a68ea1c	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Campsis x tagliabuana 'Dancing Flames'	Trompetklimmer	#FFA500,#FF0000	Midden	klimmer	Zijscheuten in maart terugsnoeien op 3-4 ogen	t	79783140-c528-4ec9-86f9-31a2bb725f62	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Clematis armandii	Bosrank	#FFFFFF	Midden	klimmer	Snoeien tot op de hoodtakken en dood hout direct na bloei (apr/mei), tussen maart-juli koemest, groep 1	t	04547b8a-b587-4c22-b0da-a580b767fc59	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Cornus kou. chinensis	Grootbloemige Japanse Kornoelje	#008000,#FFFFFF	Midden	heester	\N	t	1cfdc1d2-93cf-459a-9ecc-fdf3d1c6502a	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Hamamelis x intermedia 'Westerstede'	Toverhazelaar	#FFFF00	Gevel	heester	Dood	t	fc8e2437-11dd-4791-b486-bf4428f3c51c	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Hedera helix 'Hibernica'	Ierse of Atlantische klimop	#008000	Midden	klimmer	\N	t	0a2b9df1-9b24-42b2-afdb-dfb4787060b8	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Hydrangea quercifolia 'Snowflake'	Eikenbladhortensia	#FFFFFF	Achter	heester	Hoeft geen snoei, evt snoeien voor vorm in voorjaar/zomer	t	93c474dd-7342-4292-bb88-cd6d03307009	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Lonicera periclymenum 'Serotina'	Wilde kamperfoelie, rode boskamperfoelie	#FFFFFF,#FFC0CB	Midden	klimmer	Snoei een derde van zijscheuten terug na bloei (sept), knoppen voor volgend jaar zitten er al aan.	t	0a25ade2-4970-4d70-bff8-0c9e34020063	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Ligustrum ovalifolium	Haagliguster	#008000	Voor	heester	\N	t	14f2fa82-1870-4505-8e1d-075ed3632340	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Nandina domestica	Hemelse bamboe	#FF0000	Voor	heester	\N	t	f409a58d-8c72-4c56-b6da-5f261b4f80f8	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Parthenocissus quinquefolia	Wilde wingerd	#008000	Achter	klimmer	Hoeft geen snoei, evt alleen lange scheuten die in de weg zitten	t	30a78d40-253b-4c9a-814a-1b70525842bc	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Rosa Schneewitchen	Klimroos	#FFFFFF	Gevel	klimmer	Voorjaar (vriest niet meer) 10-15cm vanaf de grond snoeien op 7 (oude takken) of 5 (jonge takken) ogen, 5 takken overhouden, hoogste tak oog naar buiten., rozenmest maart en juni	\N	cce96c77-c81c-4df3-84d6-95f129a76786	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Sambucus nigra 'Eva' (Black Lace)	Gewone vlier	#8B0000	Achter	heester	Mag evt snoei in maart	t	4d4c3979-de7c-4230-9cd8-5618b1a8de0b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Syringa vulgaris 'Andenken an Ludwig Spaeth'	Sering	#800080	Voor	heester	Bloemen na bloeien snoeien, waterloten snoeien, bloeit op tweejarig hout	t	3824eb57-5970-4f32-a2bb-4485ce364f97	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Trachelospermum jasminoides	Toscaanse jasmijn, sterjasmijn	#FFFFFF	Midden	klimmer	\N	t	96a1b46c-c13a-4ce8-876b-16456fb67e7b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Weigela 'Red Prince'	Weigelia	#800080	Midden	heester	Niet snoeien, bloeit op oud hout	t	60a3f752-0367-4ba7-8d04-29b217242ffa	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Wisteria brachybotrys 'Okayama'	Japanse blauwe regen	#C8A2C8	Midden	klimmer	\N	t	5513de5c-08c2-416b-99b1-5babd444c464	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Vitis vinifera 'Boskoop Glory'	Druif	#800080	Achter	klimmer	\N	t	9e38c4d6-6967-4ea2-95b5-0987abfcff70	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Hebe	Struikveronica	#800080	Voor	heester	Koppen in september	t	e356b3c9-2715-497c-9734-903bc4b9f02f	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Ceanothus	Amerikaanse sering	#1E90FF	Pot	klimmer	\N	t	24c9ba6c-41d3-44d0-9db1-a1515c12277d	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Gazania	Middaggoud	#FFA500	Pot	eenjarige	\N	t	a8826486-5e4f-4002-919b-898f18b18129	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Myosotis	Vergeet-mij-nietje	#1E90FF	Midden, Pot	tweejarige	\N	t	8c58a1d2-aced-41f2-93f4-dd16fca6c96a	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Digitalis purpurea	Vingerhoedskruid	#FFC0CB	Midden, Achter	tweejarige	\N	t	9a446936-705e-4321-b32d-bf24e6dd380b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Vitis vinifera	Druif	#008000,#800080	Midden	klimmer	Gekregen van Dennis & Renée	t	30917ee6-0bb4-4044-bbf5-412a36cfd104	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Crocosmia 'Lucifer'	Montbretia	#FF0000	Midden	vaste_plant	Ieder voorjaar knollen opgraven en delen	t	22f2c244-9c71-476d-8803-7b00b7c3d9bb	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Geranium sanguineum	Ooievaarsbek	#800080	Midden, Voor	vaste_plant	\N	t	ee5a80c3-f9d1-4f83-8f31-1665f1ef64a4	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Geranium 'Rozanne'	Ooievaarsbek	#C8A2C8	Voor	vaste_plant	\N	t	65395133-0a55-487f-bf58-b402e17b17d2	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Geum cocconeum 'Borisii'	Nagelkruid	#FFA500	Gevel	vaste_plant	Iedere 3 a 4 jaar scheuren	t	17189e85-ba9e-45a1-ba66-88649738f115	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Heuchera 'Paris'	Purperklokje	#800080	Achter, Midden	vaste_plant	\N	t	b953187b-a27f-426b-8034-5824c42d3e1b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Heucherella alba 'Bridget Bloom'	Purperklokje	#FFC0CB	Achter, Midden	vaste_plant	\N	t	ca0f1a5a-7a37-4dc7-8b31-2453c9885afe	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Knautia macedonica	Beemdkroon	#FF0000	Midden	vaste_plant	\N	t	fef98746-dc30-4c4d-80d1-d30b13d17895	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Kniphofia 'Alcazar'	Raket, Vuurpijl	#FF0000	Voor, Water	vaste_plant	Uitgebloeide bloemen weghalen (tot de grond) heeft geen zin, oogt wel opgeruimd. Kalium voor meer bloei, snoeien en evt splitsen in maart	t	fbca4887-1137-4979-b305-eceba2760f74	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Lamium orvala	Dovenetel	#FFC0CB	Achter	vaste_plant	\N	t	6eabb723-8218-4848-a11b-a1eb2b0e3b9b	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
Lavandula angustigola 'Hidcote'	Lavendel	#800080	Gevel	vaste_plant	Snoeien (niet oud hout!) voor de vorst	t	cadd921d-b95a-4b38-bb6b-5d0c69f4a511	5cfc8103-644c-4e79-8e87-630094168578	2025-05-05 06:33:04.306902+00
nandina domestica	Hemelse bamboe	#008000,#FFFFFF,#FFC0CB	\N	Vaste plant	\N	t	6c2c8f10-f934-4cdb-b3c9-9c51a6b7e76e	24d42477-7f04-447f-b3bc-d044ac4c9e71	\N
Salix Integra	\N	#FFB6C1,#008000	\N	Vaste plant	\N	t	77d4548e-4e42-4101-937d-086f30f1e307	24d42477-7f04-447f-b3bc-d044ac4c9e71	\N
Hibiscus	\N	#FFC0CB	\N	vaste_plant	\N	t	6c2cc198-cd1d-4640-8a0c-69e204e7e3e8	24d42477-7f04-447f-b3bc-d044ac4c9e71	\N
Pieris japonica	Japanse rotsheide	#008000,#FF0000	\N	heester	\N	t	fd259876-7ef0-4013-bae5-f1028830ecc1	24d42477-7f04-447f-b3bc-d044ac4c9e71	\N
Lavatera Rosea	Struikmalva	#FFC0CB	\N	vaste_plant	\N	t	b7999c53-6c6c-484e-b031-eadd0b93d5fa	24d42477-7f04-447f-b3bc-d044ac4c9e71	\N
\.


--
-- Data for Name: plant_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."plant_tasks" ("id", "plant_id", "title", "description", "week_number", "created_at", "user_id") FROM stdin;
0d13cca6-4203-4f89-b0cc-3d789d3baa01	30917ee6-0bb4-4044-bbf5-412a36cfd104	Zijtakken snoeien tot 2 trossen	Dan heb je één hoofdrank met allemaal zijtakjes met trossen in plaats van dat het een grote zooi wordt	20	2025-05-16 19:20:03.894566+00	5cfc8103-644c-4e79-8e87-630094168578
83b80b24-e3cf-43db-8d92-86b207338542	77d4548e-4e42-4101-937d-086f30f1e307	Snoeien	\N	10	2025-06-17 19:48:06.400763+00	24d42477-7f04-447f-b3bc-d044ac4c9e71
8bb3bb17-e271-4b87-b9a1-e4dde4d01f0f	79783140-c528-4ec9-86f9-31a2bb725f62	Zijscheuten in maart terugsnoeien op 3-4 ogen	\N	10	2025-07-27 11:27:06.890091+00	5cfc8103-644c-4e79-8e87-630094168578
\.


--
-- Data for Name: completed_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."completed_tasks" ("id", "task_id", "plant_id", "year", "completed_at", "user_id") FROM stdin;
c290032f-de02-4d56-8721-ab62ce74aa60	0d13cca6-4203-4f89-b0cc-3d789d3baa01	30917ee6-0bb4-4044-bbf5-412a36cfd104	2025	2025-05-19 19:22:34.846374+00	5cfc8103-644c-4e79-8e87-630094168578
\.


--
-- Data for Name: garden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."garden" ("id", "width", "height", "floorplan_path", "user_id", "created_at", "scale", "position_x", "position_y") FROM stdin;
6649a58d-6052-4b1d-afb1-17b5b7c2f033	20	15	5cfc8103-644c-4e79-8e87-630094168578/floorplan.png	5cfc8103-644c-4e79-8e87-630094168578	2025-05-17 16:06:41.002614+00	0.872064423122565	1.7113238855690105	0.9981275676057221
2b7e6459-047c-4c35-8ee7-0f34665b3f26	12	25	87c4c19d-ea7c-4870-8b62-6e628877c260/floorplan.jpg	87c4c19d-ea7c-4870-8b62-6e628877c260	2025-06-18 18:56:03.371459+00	0.2175738324594309	4.1307490272316665	9.204411582379159
e102efcf-0063-4dcc-af6d-62ad75b4d65b	4	4	\N	24d42477-7f04-447f-b3bc-d044ac4c9e71	2025-06-17 19:40:13.159767+00	1.0	0	0
\.


--
-- Data for Name: garden_map_points; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."garden_map_points" ("id", "garden_id", "plant_id", "border_id", "x", "y", "radius", "created_at", "user_id") FROM stdin;
38a30fd4-0e8a-4d31-8f38-c047d5cb9883	6649a58d-6052-4b1d-afb1-17b5b7c2f033	\N	\N	14.110738	2.1332533	0.31683093	2025-06-01 19:01:20.020212+00	5cfc8103-644c-4e79-8e87-630094168578
99149278-5de5-4253-a338-60b3156684a5	6649a58d-6052-4b1d-afb1-17b5b7c2f033	\N	\N	13.909396	2.7715497	0.24206653	2025-06-01 19:01:26.359927+00	5cfc8103-644c-4e79-8e87-630094168578
\.


--
-- Data for Name: plants_borders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."plants_borders" ("created_at", "plant_id", "border_id", "user_id") FROM stdin;
2025-04-27 20:41:33.182571+00	0b5c713b-b5ec-4cb4-9025-0972093ab566	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:42:12.323405+00	799e3366-a1d2-408a-9f21-6daa5aea3c05	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-04-27 20:42:22.16466+00	799e3366-a1d2-408a-9f21-6daa5aea3c05	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 18:37:59.061241+00	f88269b5-141c-4c1a-a389-730e64f34613	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.105929+00	71696364-d3cc-4b13-9e89-52488ee5952d	08de6cda-3cc0-4910-8257-b261263bed2c	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.111465+00	59e86fa2-ccfb-4108-aa74-c0fb7f0ef69b	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.114361+00	f3a9d944-5de4-4ead-a965-8e49a3473f35	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.120736+00	46a019c2-983c-43e6-9de9-cabc704a5c89	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.127007+00	14f2fa82-1870-4505-8e1d-075ed3632340	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.127069+00	9e38c4d6-6967-4ea2-95b5-0987abfcff70	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.135408+00	6eabb723-8218-4848-a11b-a1eb2b0e3b9b	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.146934+00	27c26082-1a3a-440f-bd43-a61382bdb957	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.162492+00	ed87d197-eb86-444c-88bd-3bb20eec0be3	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.164401+00	24c9ba6c-41d3-44d0-9db1-a1515c12277d	1760aca3-3d7a-4b8f-a96a-86e06bc5bbf4	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.181401+00	17189e85-ba9e-45a1-ba66-88649738f115	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.255355+00	7aaf19df-ce80-407e-826d-e47edd9438e6	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.257181+00	cadd921d-b95a-4b38-bb6b-5d0c69f4a511	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.259716+00	65395133-0a55-487f-bf58-b402e17b17d2	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.260121+00	b953187b-a27f-426b-8034-5824c42d3e1b	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.262918+00	fef98746-dc30-4c4d-80d1-d30b13d17895	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.277569+00	5bf9ef8b-fa77-4de9-adc8-0d2b2a70066a	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.277127+00	6b3ee280-be1d-4a47-abe4-75ee9acbed26	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.277894+00	6c0a6706-3022-4301-94c0-913be8520902	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.284355+00	1cfdc1d2-93cf-459a-9ecc-fdf3d1c6502a	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.282272+00	96a1b46c-c13a-4ce8-876b-16456fb67e7b	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.298997+00	0e78598e-c05e-4901-8c46-0c496f3b82c4	08de6cda-3cc0-4910-8257-b261263bed2c	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.30377+00	e46a0536-9801-41b8-ac84-f86278b49d20	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.294137+00	b4fc7b28-02b2-49f8-ad06-577b3aa41d58	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.317096+00	99355944-88a3-4da5-9b17-3b57df172b87	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.307997+00	93c474dd-7342-4292-bb88-cd6d03307009	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.3238+00	59dfba70-72bc-4549-a099-4e8a5455bd10	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.328582+00	ca0f1a5a-7a37-4dc7-8b31-2453c9885afe	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.316282+00	d352a0c9-b451-4d4a-99bb-2d694a68ea1c	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.325987+00	128716be-9fb5-4ac4-80c3-647862aa3042	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.329462+00	a8826486-5e4f-4002-919b-898f18b18129	1760aca3-3d7a-4b8f-a96a-86e06bc5bbf4	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.359989+00	30a78d40-253b-4c9a-814a-1b70525842bc	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.360822+00	db1fa86f-cf0c-4134-b298-029af4580d45	1760aca3-3d7a-4b8f-a96a-86e06bc5bbf4	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.361944+00	fbca4887-1137-4979-b305-eceba2760f74	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.358655+00	5dfb90c7-9765-421c-80b7-5d00f031686a	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.368528+00	86d3a21e-fea1-4d47-b6d8-884f631e2c1d	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.366499+00	60a3f752-0367-4ba7-8d04-29b217242ffa	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.368524+00	79783140-c528-4ec9-86f9-31a2bb725f62	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.371707+00	8c58a1d2-aced-41f2-93f4-dd16fca6c96a	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.371808+00	98650a62-12df-46f5-9ad8-0d221bb0e748	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.369765+00	fc8e2437-11dd-4791-b486-bf4428f3c51c	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.373948+00	e8e4b615-7a62-44eb-bfa0-7e37015c8ce4	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.374026+00	9c3b01ce-9161-43bc-8895-7c06c3dda2a3	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.375508+00	3824eb57-5970-4f32-a2bb-4485ce364f97	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.376389+00	cce96c77-c81c-4df3-84d6-95f129a76786	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.376494+00	ee5a80c3-f9d1-4f83-8f31-1665f1ef64a4	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.380911+00	04547b8a-b587-4c22-b0da-a580b767fc59	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.380625+00	f7ca19a2-754f-4b41-92b6-c4dce4f72d24	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.382675+00	762b74e1-5f7c-442e-8597-f69f61ed5eaa	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.384477+00	259aed0b-3bed-49f7-a3a5-cf97751c87d8	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.370581+00	de9af901-1a44-4705-8441-e5b5fa876ddc	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.383448+00	30917ee6-0bb4-4044-bbf5-412a36cfd104	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.388654+00	6276f336-2972-439c-89eb-92b9a35781d9	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.385466+00	98593b5e-da24-4f58-afae-033fa4fe8dc2	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.388729+00	9a446936-705e-4321-b32d-bf24e6dd380b	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.367289+00	a8d7c407-08c1-4c2b-b0f0-5df6d4c37b9c	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.370727+00	64492dae-7c91-44ff-85fc-71f1f5aeae71	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.384834+00	c354edb2-751f-40e3-85d9-62beb570565c	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.391673+00	d888ad95-bdad-4d83-a717-a306501026c4	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.397394+00	5513de5c-08c2-416b-99b1-5babd444c464	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.397877+00	8f2b3a60-5c1d-46ff-b585-f39d7a1952f7	63b41b76-ebe3-496d-a89a-70e2afb8eec3	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.398095+00	0a2b9df1-9b24-42b2-afdb-dfb4787060b8	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.398165+00	0a25ade2-4970-4d70-bff8-0c9e34020063	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.400683+00	e356b3c9-2715-497c-9734-903bc4b9f02f	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.39826+00	22f2c244-9c71-476d-8803-7b00b7c3d9bb	e52c7b3b-ea04-41d4-9580-d659ff104a69	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.402056+00	de85dd14-68fb-43e0-bbf0-c023e6db6dba	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.401417+00	4d4c3979-de7c-4230-9cd8-5618b1a8de0b	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.398763+00	f8d309c8-e788-4d0d-90d8-0760a84f7b46	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.402369+00	4bd0c250-a780-43ca-a5c1-4e01bafb13c4	662e545d-5ef5-404a-a00b-36173792bec7	5cfc8103-644c-4e79-8e87-630094168578
2025-05-05 21:21:42.403513+00	f409a58d-8c72-4c56-b6da-5f261b4f80f8	a9ebc983-d00a-4b71-993a-773901d75e70	5cfc8103-644c-4e79-8e87-630094168578
2025-06-17 19:43:49.939398+00	6c2c8f10-f934-4cdb-b3c9-9c51a6b7e76e	2f7784a8-bb26-4b7d-8708-fde6ff28b0cb	24d42477-7f04-447f-b3bc-d044ac4c9e71
2025-06-17 19:47:37.808694+00	77d4548e-4e42-4101-937d-086f30f1e307	2f7784a8-bb26-4b7d-8708-fde6ff28b0cb	24d42477-7f04-447f-b3bc-d044ac4c9e71
2025-06-17 19:55:33.395556+00	6c2cc198-cd1d-4640-8a0c-69e204e7e3e8	2f7784a8-bb26-4b7d-8708-fde6ff28b0cb	24d42477-7f04-447f-b3bc-d044ac4c9e71
2025-06-18 19:55:10.136862+00	b7999c53-6c6c-484e-b031-eadd0b93d5fa	fc2c9d38-b9a7-4552-a21d-dc48d198ace4	24d42477-7f04-447f-b3bc-d044ac4c9e71
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
gardens	gardens	\N	2025-05-17 15:59:28.610171+00	2025-05-17 15:59:28.610171+00	f	f	10485760	{image/*}	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("id", "type", "format", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") FROM stdin;
14f11d50-043b-447e-b79c-5a4ab495a894	gardens	5cfc8103-644c-4e79-8e87-630094168578/floorplan.png	5cfc8103-644c-4e79-8e87-630094168578	2025-05-17 18:15:57.160046+00	2025-08-25 16:04:45.146562+00	2025-05-17 18:15:57.160046+00	{"eTag": "\\"74974a403d3d658e107ab33b83fa47c0\\"", "size": 452766, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-05-17T18:31:37.000Z", "contentLength": 452766, "httpStatusCode": 200}	a8216f26-1726-4084-bff1-c712ddedc902	5cfc8103-644c-4e79-8e87-630094168578	{}	2
78acf7da-a81d-43d4-9e74-3c6a873fda64	gardens	87c4c19d-ea7c-4870-8b62-6e628877c260/floorplan.jpg	87c4c19d-ea7c-4870-8b62-6e628877c260	2025-06-18 18:58:36.106784+00	2025-08-25 16:04:45.146562+00	2025-06-18 18:58:36.106784+00	{"eTag": "\\"202249ee222c7837b4e6970a369c52bd\\"", "size": 4518360, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-18T18:58:37.000Z", "contentLength": 4518360, "httpStatusCode": 200}	dce7c31a-85f1-4a06-8723-e158ab25910b	87c4c19d-ea7c-4870-8b62-6e628877c260	{}	2
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") FROM stdin;
gardens	5cfc8103-644c-4e79-8e87-630094168578	2025-08-25 16:04:44.538624+00	2025-08-25 16:04:44.538624+00
gardens	87c4c19d-ea7c-4870-8b62-6e628877c260	2025-08-25 16:04:44.538624+00	2025-08-25 16:04:44.538624+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 136, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
