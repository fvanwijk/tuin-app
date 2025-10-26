

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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."borders" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."borders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."completed_tasks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "task_id" "uuid" NOT NULL,
    "plant_id" "uuid" NOT NULL,
    "year" integer NOT NULL,
    "completed_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."completed_tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."garden" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "width" numeric DEFAULT 0 NOT NULL,
    "height" numeric DEFAULT 0 NOT NULL,
    "floorplan_path" "text",
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "scale" numeric DEFAULT 1.0 NOT NULL,
    "position_x" numeric DEFAULT 0 NOT NULL,
    "position_y" numeric DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."garden" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."garden_map_points" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "garden_id" "uuid" NOT NULL,
    "plant_id" "uuid",
    "border_id" "uuid",
    "x" real NOT NULL,
    "y" real NOT NULL,
    "radius" real DEFAULT 0.5 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"(),
    CONSTRAINT "has_valid_reference" CHECK ((("plant_id" IS NOT NULL) OR ("border_id" IS NOT NULL) OR (("plant_id" IS NULL) AND ("border_id" IS NULL))))
);


ALTER TABLE "public"."garden_map_points" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plant_tasks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "plant_id" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "week_number" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    CONSTRAINT "plant_tasks_week_number_check" CHECK ((("week_number" >= 1) AND ("week_number" <= 52))),
    CONSTRAINT "valid_week_number" CHECK ((("week_number" IS NULL) OR (("week_number" >= 1) AND ("week_number" <= 52))))
);


ALTER TABLE "public"."plant_tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plants" (
    "name" "text" NOT NULL,
    "name_nl" "text",
    "color" "text",
    "border_text" "text",
    "type" "text",
    "comments" "text",
    "alive" boolean,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone
);


ALTER TABLE "public"."plants" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plants_borders" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "plant_id" "uuid" NOT NULL,
    "border_id" "uuid" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);


ALTER TABLE "public"."plants_borders" OWNER TO "postgres";


ALTER TABLE ONLY "public"."borders"
    ADD CONSTRAINT "borders_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."borders"
    ADD CONSTRAINT "borders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."completed_tasks"
    ADD CONSTRAINT "completed_tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."garden_map_points"
    ADD CONSTRAINT "garden_map_points_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."garden"
    ADD CONSTRAINT "garden_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."plant_tasks"
    ADD CONSTRAINT "plant_tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."plants_borders"
    ADD CONSTRAINT "plants_borders_pkey" PRIMARY KEY ("plant_id", "border_id");



ALTER TABLE ONLY "public"."plants"
    ADD CONSTRAINT "plants_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."plants"
    ADD CONSTRAINT "plants_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."plants"
    ADD CONSTRAINT "plants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."completed_tasks"
    ADD CONSTRAINT "unique_task_completion_per_year" UNIQUE ("task_id", "year");



CREATE INDEX "idx_completed_tasks_plant_id" ON "public"."completed_tasks" USING "btree" ("plant_id");



CREATE INDEX "idx_completed_tasks_task_id" ON "public"."completed_tasks" USING "btree" ("task_id");



CREATE INDEX "idx_completed_tasks_user_id" ON "public"."completed_tasks" USING "btree" ("user_id");



CREATE INDEX "idx_completed_tasks_year" ON "public"."completed_tasks" USING "btree" ("year");



CREATE INDEX "idx_plant_tasks_plant_id" ON "public"."plant_tasks" USING "btree" ("plant_id");



CREATE INDEX "idx_plant_tasks_user_id" ON "public"."plant_tasks" USING "btree" ("user_id");



CREATE INDEX "idx_plant_tasks_week_number" ON "public"."plant_tasks" USING "btree" ("week_number");



ALTER TABLE ONLY "public"."completed_tasks"
    ADD CONSTRAINT "completed_tasks_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."completed_tasks"
    ADD CONSTRAINT "completed_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."plant_tasks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."completed_tasks"
    ADD CONSTRAINT "completed_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."garden_map_points"
    ADD CONSTRAINT "garden_map_points_border_id_fkey" FOREIGN KEY ("border_id") REFERENCES "public"."borders"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."garden_map_points"
    ADD CONSTRAINT "garden_map_points_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "public"."garden"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."garden_map_points"
    ADD CONSTRAINT "garden_map_points_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."garden_map_points"
    ADD CONSTRAINT "garden_map_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."garden"
    ADD CONSTRAINT "garden_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."plant_tasks"
    ADD CONSTRAINT "plant_tasks_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."plant_tasks"
    ADD CONSTRAINT "plant_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."plants_borders"
    ADD CONSTRAINT "plants_borders_border_id_fkey" FOREIGN KEY ("border_id") REFERENCES "public"."borders"("id");



ALTER TABLE ONLY "public"."plants_borders"
    ADD CONSTRAINT "plants_borders_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id");



CREATE POLICY "Enable delete for users based on user_id" ON "public"."borders" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."garden" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."garden_map_points" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."plant_tasks" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."plants" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."plants_borders" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."borders" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."garden" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."garden_map_points" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."plant_tasks" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."plants" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."plants_borders" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable update for users based on email" ON "public"."garden" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on email" ON "public"."garden_map_points" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."borders" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."plant_tasks" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."plants" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."borders" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."garden" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."garden_map_points" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."plant_tasks" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."plants" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."plants_borders" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Policy with table joins" ON "public"."plants_borders" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "plants"."user_id"
   FROM "public"."plants"
  WHERE ("plants_borders"."plant_id" = "plants"."id"))));



CREATE POLICY "Users can only access their own completed tasks" ON "public"."completed_tasks" USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."borders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."completed_tasks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."garden" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."garden_map_points" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."plant_tasks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."plants" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."plants_borders" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON TABLE "public"."borders" TO "anon";
GRANT ALL ON TABLE "public"."borders" TO "authenticated";
GRANT ALL ON TABLE "public"."borders" TO "service_role";



GRANT ALL ON TABLE "public"."completed_tasks" TO "anon";
GRANT ALL ON TABLE "public"."completed_tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."completed_tasks" TO "service_role";



GRANT ALL ON TABLE "public"."garden" TO "anon";
GRANT ALL ON TABLE "public"."garden" TO "authenticated";
GRANT ALL ON TABLE "public"."garden" TO "service_role";



GRANT ALL ON TABLE "public"."garden_map_points" TO "anon";
GRANT ALL ON TABLE "public"."garden_map_points" TO "authenticated";
GRANT ALL ON TABLE "public"."garden_map_points" TO "service_role";



GRANT ALL ON TABLE "public"."plant_tasks" TO "anon";
GRANT ALL ON TABLE "public"."plant_tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."plant_tasks" TO "service_role";



GRANT ALL ON TABLE "public"."plants" TO "anon";
GRANT ALL ON TABLE "public"."plants" TO "authenticated";
GRANT ALL ON TABLE "public"."plants" TO "service_role";



GRANT ALL ON TABLE "public"."plants_borders" TO "anon";
GRANT ALL ON TABLE "public"."plants_borders" TO "authenticated";
GRANT ALL ON TABLE "public"."plants_borders" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
