--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-11 19:46:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."EPPT_TEACHER_COURSE_PROGRAM" DROP CONSTRAINT IF EXISTS "FK_TEACHER";
ALTER TABLE IF EXISTS ONLY public."EPPM_COURSE_PROGRAM" DROP CONSTRAINT IF EXISTS "FK_STUDY_PLAN";
ALTER TABLE IF EXISTS ONLY public."EPPT_PHONE_SCHOOL" DROP CONSTRAINT IF EXISTS "FK_SCHOOL";
ALTER TABLE IF EXISTS ONLY public."EPPM_CAREER" DROP CONSTRAINT IF EXISTS "FK_SCHOOL";
ALTER TABLE IF EXISTS ONLY public."EPPM_USER" DROP CONSTRAINT IF EXISTS "FK_ROL";
ALTER TABLE IF EXISTS ONLY public."EPPM_USER" DROP CONSTRAINT IF EXISTS "FK_PREFERENCES_USER";
ALTER TABLE IF EXISTS ONLY public."EPPP_PREFERENCES" DROP CONSTRAINT IF EXISTS "FK_PREFERENCES";
ALTER TABLE IF EXISTS ONLY public."EPPT_PHONE_SCHOOL" DROP CONSTRAINT IF EXISTS "FK_PHONE";
ALTER TABLE IF EXISTS ONLY public."EPPT_FACULTY_PHONE" DROP CONSTRAINT IF EXISTS "FK_PHONE";
ALTER TABLE IF EXISTS ONLY public."EPPM_USER" DROP CONSTRAINT IF EXISTS "FK_PERSON";
ALTER TABLE IF EXISTS ONLY public."EPPM_TEACHER" DROP CONSTRAINT IF EXISTS "FK_PERSON";
ALTER TABLE IF EXISTS ONLY public."EPPT_FACULTY_PHONE" DROP CONSTRAINT IF EXISTS "FK_FACULTY";
ALTER TABLE IF EXISTS ONLY public."EPPM_SCHOOL" DROP CONSTRAINT IF EXISTS "FK_FACULTY";
ALTER TABLE IF EXISTS ONLY public."EPPT_TEACHER_COURSE_PROGRAM" DROP CONSTRAINT IF EXISTS "FK_COURSE_PROGRAM";
ALTER TABLE IF EXISTS ONLY public."EPPM_STUDY_PLAN" DROP CONSTRAINT IF EXISTS "FK_CAREER";
DROP INDEX IF EXISTS public."fki_FK_STUDY_PLAN";
DROP INDEX IF EXISTS public."fki_FK_SCHOOL";
DROP INDEX IF EXISTS public."fki_FK_ROL";
DROP INDEX IF EXISTS public."fki_FK_PREFERENCES_USER";
DROP INDEX IF EXISTS public."fki_FK_PREFERENCES";
DROP INDEX IF EXISTS public."fki_FK_PERSON";
DROP INDEX IF EXISTS public."fki_FK_COURSE_PROGRAM";
DROP INDEX IF EXISTS public."fki_FK_CAREER";
DROP INDEX IF EXISTS public."fki_FK";
ALTER TABLE IF EXISTS ONLY public."EPPM_SCHOOL" DROP CONSTRAINT IF EXISTS "UNIQUE_SCHOOL";
ALTER TABLE IF EXISTS ONLY public."EPPM_FACULTY" DROP CONSTRAINT IF EXISTS "UNIQUE_FACULTY";
ALTER TABLE IF EXISTS ONLY public."EPPM_TEACHER" DROP CONSTRAINT IF EXISTS "UNIQUE_EMAIL";
ALTER TABLE IF EXISTS ONLY public."EPPM_USER" DROP CONSTRAINT IF EXISTS "PK_USER";
ALTER TABLE IF EXISTS ONLY public."EPPT_TEACHER_COURSE_PROGRAM" DROP CONSTRAINT IF EXISTS "PK_TEACHER_COURSE_PROGRAM";
ALTER TABLE IF EXISTS ONLY public."EPPM_TEACHER" DROP CONSTRAINT IF EXISTS "PK_TEACHER";
ALTER TABLE IF EXISTS ONLY public."EPPM_STUDY_PLAN" DROP CONSTRAINT IF EXISTS "PK_STUDY_PLAN";
ALTER TABLE IF EXISTS ONLY public."EPPM_SCHOOL" DROP CONSTRAINT IF EXISTS "PK_SCHOOL";
ALTER TABLE IF EXISTS ONLY public."EPPM_ROL" DROP CONSTRAINT IF EXISTS "PK_ROL";
ALTER TABLE IF EXISTS ONLY public."EPPP_PREFERENCES" DROP CONSTRAINT IF EXISTS "PK_PREFERENCES";
ALTER TABLE IF EXISTS ONLY public."EPPT_PHONE_SCHOOL" DROP CONSTRAINT IF EXISTS "PK_PHONE_SCHOOL";
ALTER TABLE IF EXISTS ONLY public."EPPM_PHONE" DROP CONSTRAINT IF EXISTS "PK_PHONE";
ALTER TABLE IF EXISTS ONLY public."EPPM_PERSON" DROP CONSTRAINT IF EXISTS "PK_PERSON";
ALTER TABLE IF EXISTS ONLY public."EPPT_FACULTY_PHONE" DROP CONSTRAINT IF EXISTS "PK_FACULTY_PHONE";
ALTER TABLE IF EXISTS ONLY public."EPPM_FACULTY" DROP CONSTRAINT IF EXISTS "PK_FACULTY";
ALTER TABLE IF EXISTS ONLY public."EPPM_COURSE_PROGRAM" DROP CONSTRAINT IF EXISTS "PK_COURSE_PROGRAM";
ALTER TABLE IF EXISTS ONLY public."EPPM_CAREER" DROP CONSTRAINT IF EXISTS "PK_CAREER";
ALTER TABLE IF EXISTS ONLY public."EPPM_PHONE" DROP CONSTRAINT IF EXISTS "NUM_PHONE_NUMBER_UNIQUE";
ALTER TABLE IF EXISTS ONLY public."EPPM_ROL" DROP CONSTRAINT IF EXISTS "DSC_NAME_UNIQUE";
DROP SEQUENCE IF EXISTS public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq";
DROP TABLE IF EXISTS public."EPPT_TEACHER_COURSE_PROGRAM";
DROP SEQUENCE IF EXISTS public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq";
DROP TABLE IF EXISTS public."EPPT_PHONE_SCHOOL";
DROP SEQUENCE IF EXISTS public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq";
DROP TABLE IF EXISTS public."EPPT_FACULTY_PHONE";
DROP SEQUENCE IF EXISTS public."EPPP_PREFERENCES_ID_PREFERENCES_seq";
DROP TABLE IF EXISTS public."EPPP_PREFERENCES";
DROP SEQUENCE IF EXISTS public."EPPM_USER_ID_USER_seq";
DROP TABLE IF EXISTS public."EPPM_USER";
DROP SEQUENCE IF EXISTS public."EPPM_TEACHER_ID_TEACHER_seq";
DROP TABLE IF EXISTS public."EPPM_TEACHER";
DROP SEQUENCE IF EXISTS public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq";
DROP TABLE IF EXISTS public."EPPM_STUDY_PLAN";
DROP SEQUENCE IF EXISTS public."EPPM_SCHOOL_ID_SCHOOL_seq";
DROP TABLE IF EXISTS public."EPPM_SCHOOL";
DROP SEQUENCE IF EXISTS public."EPPM_ROL_ID_ROL_seq";
DROP TABLE IF EXISTS public."EPPM_ROL";
DROP SEQUENCE IF EXISTS public."EPPM_PHONE_ID_PHONE_seq";
DROP TABLE IF EXISTS public."EPPM_PHONE";
DROP SEQUENCE IF EXISTS public."EPPM_PERSON_ID_PERSON_seq";
DROP TABLE IF EXISTS public."EPPM_PERSON";
DROP SEQUENCE IF EXISTS public."EPPM_FACULTY_ID_FACULTY_seq";
DROP TABLE IF EXISTS public."EPPM_FACULTY";
DROP SEQUENCE IF EXISTS public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq";
DROP TABLE IF EXISTS public."EPPM_COURSE_PROGRAM";
DROP TABLE IF EXISTS public."EPPM_CAREER";
DROP SCHEMA IF EXISTS public;
--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16453)
-- Name: EPPM_CAREER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_CAREER" (
    "DSC_CARRER" text NOT NULL,
    "DSC_CODE" text,
    "ID_SCHOOL" integer,
    "UPDATED_BY" integer NOT NULL,
    "UPDATED AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char",
    "ID_CAREER" integer NOT NULL
);


ALTER TABLE public."EPPM_CAREER" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16561)
-- Name: EPPM_CAREER_ID_CAREER_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_CAREER" ALTER COLUMN "ID_CAREER" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_CAREER_ID_CAREER_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 16472)
-- Name: EPPM_COURSE_PROGRAM; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_COURSE_PROGRAM" (
    "ID_COURSE_PROGRAM" integer NOT NULL,
    "DSC_NAME" text NOT NULL,
    "DAT_YEAR" date,
    "ID_STUDY_PLAN" integer,
    "NRC" text,
    "CICLE" "char",
    "NUM_CREDITS" integer,
    "SIGNATURE" "char",
    "UPDATED_BY" integer NOT NULL,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "PDF_URL" text,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_COURSE_PROGRAM" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16471)
-- Name: EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq" OWNER TO postgres;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 226
-- Name: EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq" OWNED BY public."EPPM_COURSE_PROGRAM"."ID_COURSE_PROGRAM";


--
-- TOC entry 245 (class 1259 OID 16570)
-- Name: EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_COURSE_PROGRAM" ALTER COLUMN "ID_COURSE_PROGRAM" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16435)
-- Name: EPPM_FACULTY; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_FACULTY" (
    "ID_FACULTY" integer NOT NULL,
    "DSC_FACULTY" text,
    "UPDATED_BY" integer NOT NULL,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_FACULTY" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16434)
-- Name: EPPM_FACULTY_ID_FACULTY_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_FACULTY_ID_FACULTY_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_FACULTY_ID_FACULTY_seq" OWNER TO postgres;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 219
-- Name: EPPM_FACULTY_ID_FACULTY_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_FACULTY_ID_FACULTY_seq" OWNED BY public."EPPM_FACULTY"."ID_FACULTY";


--
-- TOC entry 246 (class 1259 OID 16571)
-- Name: EPPM_FACULTY_ID_FACULTY_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_FACULTY" ALTER COLUMN "ID_FACULTY" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_FACULTY_ID_FACULTY_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 16490)
-- Name: EPPM_PERSON; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_PERSON" (
    "ID_PERSON" integer NOT NULL,
    "DSC_NAME" text NOT NULL,
    "DSC_SECOND_NAME" text NOT NULL,
    "IDCARD" text NOT NULL,
    "UPDATED_BY" integer,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_PERSON" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16489)
-- Name: EPPM_PERSON_ID_PERSON_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_PERSON_ID_PERSON_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_PERSON_ID_PERSON_seq" OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 230
-- Name: EPPM_PERSON_ID_PERSON_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_PERSON_ID_PERSON_seq" OWNED BY public."EPPM_PERSON"."ID_PERSON";


--
-- TOC entry 247 (class 1259 OID 16572)
-- Name: EPPM_PERSON_ID_PERSON_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_PERSON" ALTER COLUMN "ID_PERSON" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_PERSON_ID_PERSON_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16425)
-- Name: EPPM_PHONE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_PHONE" (
    "ID_PHONE" integer NOT NULL,
    "NUM_PHONE_NUMBER" text NOT NULL,
    "UPDATE_BY" integer NOT NULL,
    "UPDATE_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_PHONE" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16424)
-- Name: EPPM_PHONE_ID_PHONE_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_PHONE_ID_PHONE_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_PHONE_ID_PHONE_seq" OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 217
-- Name: EPPM_PHONE_ID_PHONE_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_PHONE_ID_PHONE_seq" OWNED BY public."EPPM_PHONE"."ID_PHONE";


--
-- TOC entry 248 (class 1259 OID 16573)
-- Name: EPPM_PHONE_ID_PHONE_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_PHONE" ALTER COLUMN "ID_PHONE" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_PHONE_ID_PHONE_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 235 (class 1259 OID 16508)
-- Name: EPPM_ROL; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_ROL" (
    "ID_ROL" integer NOT NULL,
    "DSC_NAME" text NOT NULL,
    "DSC_DESCRIPTION" text,
    "UPDATED_BY" integer NOT NULL,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_ROL" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16507)
-- Name: EPPM_ROL_ID_ROL_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_ROL_ID_ROL_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_ROL_ID_ROL_seq" OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 234
-- Name: EPPM_ROL_ID_ROL_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_ROL_ID_ROL_seq" OWNED BY public."EPPM_ROL"."ID_ROL";


--
-- TOC entry 249 (class 1259 OID 16574)
-- Name: EPPM_ROL_ID_ROL_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_ROL" ALTER COLUMN "ID_ROL" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_ROL_ID_ROL_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16444)
-- Name: EPPM_SCHOOL; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_SCHOOL" (
    "ID_SCHOOL" integer NOT NULL,
    "DSC_SCHOOL" text NOT NULL,
    "ID_FACULTY" integer,
    "UPDATED_BY" integer,
    "STATE" "char" DEFAULT '1'::"char",
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."EPPM_SCHOOL" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16443)
-- Name: EPPM_SCHOOL_ID_SCHOOL_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_SCHOOL_ID_SCHOOL_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_SCHOOL_ID_SCHOOL_seq" OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 221
-- Name: EPPM_SCHOOL_ID_SCHOOL_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_SCHOOL_ID_SCHOOL_seq" OWNED BY public."EPPM_SCHOOL"."ID_SCHOOL";


--
-- TOC entry 250 (class 1259 OID 16575)
-- Name: EPPM_SCHOOL_ID_SCHOOL_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_SCHOOL" ALTER COLUMN "ID_SCHOOL" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_SCHOOL_ID_SCHOOL_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16462)
-- Name: EPPM_STUDY_PLAN; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_STUDY_PLAN" (
    "ID_STUDY_PLAN" integer NOT NULL,
    "DSC_NAME" text NOT NULL,
    "DAT_INIT" date,
    "DAT_MAX" date,
    "ID_CAREER" integer,
    "UPDATED_BY" integer NOT NULL,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "PDF_URL" text,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_STUDY_PLAN" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16461)
-- Name: EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq" OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 224
-- Name: EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq" OWNED BY public."EPPM_STUDY_PLAN"."ID_STUDY_PLAN";


--
-- TOC entry 251 (class 1259 OID 16576)
-- Name: EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_STUDY_PLAN" ALTER COLUMN "ID_STUDY_PLAN" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 16481)
-- Name: EPPM_TEACHER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_TEACHER" (
    "ID_TEACHER" integer NOT NULL,
    "ID_PERSON" integer,
    "EMAIL" text NOT NULL,
    "UPDATED_BY" integer,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char"
);


ALTER TABLE public."EPPM_TEACHER" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16480)
-- Name: EPPM_TEACHER_ID_TEACHER_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_TEACHER_ID_TEACHER_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_TEACHER_ID_TEACHER_seq" OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 228
-- Name: EPPM_TEACHER_ID_TEACHER_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_TEACHER_ID_TEACHER_seq" OWNED BY public."EPPM_TEACHER"."ID_TEACHER";


--
-- TOC entry 252 (class 1259 OID 16577)
-- Name: EPPM_TEACHER_ID_TEACHER_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_TEACHER" ALTER COLUMN "ID_TEACHER" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_TEACHER_ID_TEACHER_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 16499)
-- Name: EPPM_USER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPM_USER" (
    "ID_USER" integer NOT NULL,
    "ID_PERSON" integer NOT NULL,
    "ID_ROL" integer,
    "PASSWORD" text NOT NULL,
    "UPDATED_BY" integer NOT NULL,
    "UPDATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CREATED_AT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "STATE" "char" DEFAULT '1'::"char",
    "ID_PREFERENCES" integer
);


ALTER TABLE public."EPPM_USER" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16498)
-- Name: EPPM_USER_ID_USER_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPM_USER_ID_USER_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPM_USER_ID_USER_seq" OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 232
-- Name: EPPM_USER_ID_USER_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPM_USER_ID_USER_seq" OWNED BY public."EPPM_USER"."ID_USER";


--
-- TOC entry 253 (class 1259 OID 16578)
-- Name: EPPM_USER_ID_USER_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPM_USER" ALTER COLUMN "ID_USER" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPM_USER_ID_USER_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 243 (class 1259 OID 16538)
-- Name: EPPP_PREFERENCES; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPP_PREFERENCES" (
    "ID_PREFERENCES" integer NOT NULL,
    "ID_USER" integer,
    "PREFERENCES" json
);


ALTER TABLE public."EPPP_PREFERENCES" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16537)
-- Name: EPPP_PREFERENCES_ID_PREFERENCES_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPP_PREFERENCES_ID_PREFERENCES_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPP_PREFERENCES_ID_PREFERENCES_seq" OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 242
-- Name: EPPP_PREFERENCES_ID_PREFERENCES_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPP_PREFERENCES_ID_PREFERENCES_seq" OWNED BY public."EPPP_PREFERENCES"."ID_PREFERENCES";


--
-- TOC entry 254 (class 1259 OID 16580)
-- Name: EPPP_PREFERENCES_ID_PREFERENCES_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPP_PREFERENCES" ALTER COLUMN "ID_PREFERENCES" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPP_PREFERENCES_ID_PREFERENCES_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 16531)
-- Name: EPPT_FACULTY_PHONE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPT_FACULTY_PHONE" (
    "ID_FACULTY_PHONE" integer NOT NULL,
    "ID_FACULTY" integer,
    "ID_PHONE" integer
);


ALTER TABLE public."EPPT_FACULTY_PHONE" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16530)
-- Name: EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq" OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 240
-- Name: EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq" OWNED BY public."EPPT_FACULTY_PHONE"."ID_FACULTY_PHONE";


--
-- TOC entry 255 (class 1259 OID 16581)
-- Name: EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPT_FACULTY_PHONE" ALTER COLUMN "ID_FACULTY_PHONE" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 16524)
-- Name: EPPT_PHONE_SCHOOL; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPT_PHONE_SCHOOL" (
    "ID_PHONE_SCHOOL" integer NOT NULL,
    "ID_SCHOOL" integer,
    "ID_PHONE" integer
);


ALTER TABLE public."EPPT_PHONE_SCHOOL" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16523)
-- Name: EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq" OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 238
-- Name: EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq" OWNED BY public."EPPT_PHONE_SCHOOL"."ID_PHONE_SCHOOL";


--
-- TOC entry 256 (class 1259 OID 16582)
-- Name: EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPT_PHONE_SCHOOL" ALTER COLUMN "ID_PHONE_SCHOOL" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 237 (class 1259 OID 16517)
-- Name: EPPT_TEACHER_COURSE_PROGRAM; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EPPT_TEACHER_COURSE_PROGRAM" (
    "ID_TEACHER_COUSE_PROGRAM" integer NOT NULL,
    "ID_TEACHER" integer,
    "ID_COURSE_PROGRAM" integer
);


ALTER TABLE public."EPPT_TEACHER_COURSE_PROGRAM" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16516)
-- Name: EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq" OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 236
-- Name: EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq" OWNED BY public."EPPT_TEACHER_COURSE_PROGRAM"."ID_TEACHER_COUSE_PROGRAM";


--
-- TOC entry 257 (class 1259 OID 16583)
-- Name: EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."EPPT_TEACHER_COURSE_PROGRAM" ALTER COLUMN "ID_TEACHER_COUSE_PROGRAM" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5016 (class 0 OID 16453)
-- Dependencies: 223
-- Data for Name: EPPM_CAREER; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_CAREER" VALUES ('Ingenieria en Sistemas de la Informacion', '85', 37, 1, '2025-02-07 00:15:40.943614', '2025-02-06 02:42:17.348206', '1', 7);


--
-- TOC entry 5020 (class 0 OID 16472)
-- Dependencies: 227
-- Data for Name: EPPM_COURSE_PROGRAM; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_COURSE_PROGRAM" VALUES (1, 'Optativa II - Inteligencia Artificial', '2025-03-11', 2, 'EIF4200', '2', 3, '1', 1, '2025-03-11 17:52:20.468941', '2025-03-11 17:52:20.468941', 'www.unpdf.com', '1');


--
-- TOC entry 5013 (class 0 OID 16435)
-- Dependencies: 220
-- Data for Name: EPPM_FACULTY; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_FACULTY" VALUES (9, 'Facultad de Filosofía y Letras', 1, '2024-10-20 23:48:31.936554', '2024-10-20 23:48:31.936554', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (12, 'actualizado desde postman por brayan', 1, '2024-10-20 21:23:35.413036', '2024-10-20 21:22:28.52555', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (13, 'prueba', 1, '2024-10-20 23:42:21.212443', '2024-10-20 23:42:21.212443', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (14, 'Facultad de Ciencias de la Salud', 1, '2024-10-22 07:45:09.236346', '2024-10-22 07:45:09.236346', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (15, 'Centro de Estudios Generales', 1, '2024-10-22 07:45:31.033155', '2024-10-22 07:45:31.033155', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (16, 'Facultad de Ciencias de la Tierra y el Mar', 1, '2024-10-22 07:45:43.010243', '2024-10-22 07:45:43.010243', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (17, 'Centro de Investigación y Docencia en Educación', 1, '2024-10-22 07:45:53.245161', '2024-10-22 07:45:53.245161', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (18, 'Facultad de Ciencias Sociales', 1, '2024-10-22 07:46:04.16838', '2024-10-22 07:46:04.16838', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (19, 'Facultad de Ciencias Exactas y Naturales', 1, '2024-10-22 07:46:17.572153', '2024-10-22 07:46:17.572153', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (20, 'Centro de Investigación, Docencia y Extensión Artística', 1, '2024-10-22 07:46:31.986771', '2024-10-22 07:46:31.986771', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (21, 'PRUEBA', 1, '2024-11-01 23:00:23.213049', '2024-11-01 23:00:23.213049', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (22, 'PRUEBA2', 1, '2024-11-01 23:00:27.286907', '2024-11-01 23:00:27.286907', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (23, 'PRUEBA3', 1, '2024-11-01 23:00:30.61658', '2024-11-01 23:00:30.61658', '1');
INSERT INTO public."EPPM_FACULTY" VALUES (24, 'PRUEBA4', 1, '2024-11-01 23:00:34.039193', '2024-11-01 23:00:34.039193', '1');


--
-- TOC entry 5024 (class 0 OID 16490)
-- Dependencies: 231
-- Data for Name: EPPM_PERSON; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_PERSON" VALUES (1, 'root', 'root', 'root', NULL, '2024-10-14 13:26:21.525194', '2024-10-14 13:26:21.525194', '1');
INSERT INTO public."EPPM_PERSON" VALUES (50, 'pepe', 'pepe', 'pepe', 1, '2024-10-26 16:17:57.297689', '2024-10-26 16:11:28.193575', '1');
INSERT INTO public."EPPM_PERSON" VALUES (53, 'brayan', 'rosales', '702770470', 1, '2024-10-27 00:45:31.957574', '2024-10-27 00:45:31.957574', '1');
INSERT INTO public."EPPM_PERSON" VALUES (78, 'CARLOS', 'ORELLANA', '12345678', 1, '2025-02-23 19:03:10.029951', '2025-02-23 19:03:10.029951', '1');
INSERT INTO public."EPPM_PERSON" VALUES (55, 'prueba', 'prueba', '12345678', 1, '2024-11-02 14:18:20.88868', '2024-11-02 14:18:20.88868', '1');
INSERT INTO public."EPPM_PERSON" VALUES (56, 'prueba2', 'prueba2', '12345678', 1, '2024-11-02 14:18:25.951996', '2024-11-02 14:18:25.951996', '1');
INSERT INTO public."EPPM_PERSON" VALUES (57, 'prueba3', 'prueba4', '12345678', 1, '2024-11-02 14:19:10.525487', '2024-11-02 14:19:10.525487', '1');
INSERT INTO public."EPPM_PERSON" VALUES (58, 'prueba5', 'prueba5', '12345678', 1, '2024-11-02 14:19:17.858702', '2024-11-02 14:19:17.858702', '1');
INSERT INTO public."EPPM_PERSON" VALUES (59, 'prueba6', 'prueba6', '12345678', 1, '2024-11-02 14:19:22.837892', '2024-11-02 14:19:22.837892', '1');
INSERT INTO public."EPPM_PERSON" VALUES (60, 'prueba7', 'prueba7', '12345678', 1, '2024-11-02 14:19:28.399109', '2024-11-02 14:19:28.399109', '1');
INSERT INTO public."EPPM_PERSON" VALUES (61, 'prueba8', 'prueba8', '12345678', 1, '2024-11-02 14:19:33.398873', '2024-11-02 14:19:33.398873', '1');
INSERT INTO public."EPPM_PERSON" VALUES (62, 'prueba9', 'prueba9', '12345678', 1, '2024-11-02 14:19:41.473892', '2024-11-02 14:19:41.473892', '1');
INSERT INTO public."EPPM_PERSON" VALUES (63, 'prueba10', 'prueba10', '12345678', 1, '2024-11-02 14:19:47.304327', '2024-11-02 14:19:47.304327', '1');
INSERT INTO public."EPPM_PERSON" VALUES (64, 'CARLOS', 'ORELLANA', '12345678', 1, '2024-11-02 14:49:43.617315', '2024-11-02 14:49:43.617315', '1');
INSERT INTO public."EPPM_PERSON" VALUES (73, 'BRAYAN', 'ROSALES', '12345678', 1, '2024-11-02 16:47:48.104294', '2024-11-02 16:47:48.104294', '1');
INSERT INTO public."EPPM_PERSON" VALUES (75, 'kennet', 'moreira', '703030376', 1, '2024-11-03 01:54:51.888069', '2024-11-03 01:54:51.888069', '1');
INSERT INTO public."EPPM_PERSON" VALUES (79, 'david', 'fallas', '87654321', 1, '2025-02-23 19:10:14.329553', '2025-02-23 19:10:14.329553', '1');
INSERT INTO public."EPPM_PERSON" VALUES (54, 'brayan', 'Rosales', '702770470', 1, '2024-11-03 20:05:02.78564', '2024-10-27 17:53:45.410448', '1');
INSERT INTO public."EPPM_PERSON" VALUES (80, 'brayan', 'rosales', '702770470', 1, '2025-02-23 19:11:26.521118', '2025-02-23 19:11:26.521118', '1');
INSERT INTO public."EPPM_PERSON" VALUES (81, 'CARLOS', 'ORELLANA', '12345678', 1, '2025-02-23 20:30:03.308535', '2025-02-23 20:18:22.4222', '1');


--
-- TOC entry 5011 (class 0 OID 16425)
-- Dependencies: 218
-- Data for Name: EPPM_PHONE; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_PHONE" VALUES (8, '83185484', 1, '2025-02-15 14:41:25.018937', '2025-02-19 14:41:25.018937', '1');
INSERT INTO public."EPPM_PHONE" VALUES (20, '11225588', 1, '2025-02-15 15:12:57.111971', '2025-02-19 15:07:58.707827', '1');
INSERT INTO public."EPPM_PHONE" VALUES (21, '11223344', 1, '2025-02-19 14:36:46.845659', '2025-02-19 14:36:46.845659', '1');
INSERT INTO public."EPPM_PHONE" VALUES (22, '11223341', 1, '2025-02-19 14:38:13.988924', '2025-02-19 14:38:13.988924', '1');
INSERT INTO public."EPPM_PHONE" VALUES (23, '11223342', 1, '2025-02-19 14:42:10.277921', '2025-02-19 14:42:10.277921', '1');
INSERT INTO public."EPPM_PHONE" VALUES (24, '11223343', 1, '2025-02-19 14:43:39.972742', '2025-02-19 14:43:39.972742', '1');
INSERT INTO public."EPPM_PHONE" VALUES (27, '11223345', 1, '2025-02-19 14:45:14.770284', '2025-02-19 14:45:14.770284', '1');


--
-- TOC entry 5028 (class 0 OID 16508)
-- Dependencies: 235
-- Data for Name: EPPM_ROL; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_ROL" VALUES (1, 'ROOT', 'ROOT', 1, '2024-10-14 13:29:31.991002', '2024-10-14 13:29:31.991002', '1');
INSERT INTO public."EPPM_ROL" VALUES (5, 'ADMIN', 'admin', 1, '2024-10-26 23:22:32.650823', '2024-10-26 23:22:32.650823', '1');
INSERT INTO public."EPPM_ROL" VALUES (14, 'PUBLIC', 'Acceso publico', 1, '2025-02-15 15:42:04.064882', '2024-10-26 23:42:37.173136', '1');


--
-- TOC entry 5015 (class 0 OID 16444)
-- Dependencies: 222
-- Data for Name: EPPM_SCHOOL; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_SCHOOL" VALUES (37, 'escuela de informatica', 9, 1, '1', '2024-11-03 01:56:18.595454', '2024-11-03 01:56:18.595454');
INSERT INTO public."EPPM_SCHOOL" VALUES (39, 'Escuela de Literatura y Ciencias del Lenguaje', 9, 1, '1', '2024-11-03 02:08:42.938097', '2024-11-03 02:08:42.938097');
INSERT INTO public."EPPM_SCHOOL" VALUES (40, 'Escuela Ecuménica de Ciencias de la Religión', 9, 1, '1', '2024-11-03 02:09:27.300122', '2024-11-03 02:09:27.300122');
INSERT INTO public."EPPM_SCHOOL" VALUES (41, 'prueba', 13, 1, '0', '2024-11-03 02:10:18.562174', '2024-11-03 02:12:12.954454');


--
-- TOC entry 5018 (class 0 OID 16462)
-- Dependencies: 225
-- Data for Name: EPPM_STUDY_PLAN; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_STUDY_PLAN" VALUES (2, 'Ingenieria en Sistemas', '2012-01-01', '2020-01-01', 7, 1, '2025-02-07 00:22:23.722837', '2025-02-06 23:52:28.135662', 'www.unpdf.com', '1');


--
-- TOC entry 5022 (class 0 OID 16481)
-- Dependencies: 229
-- Data for Name: EPPM_TEACHER; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_TEACHER" VALUES (27, 64, 'email', 1, '2024-11-02 14:49:43.617315', '2024-11-02 14:49:43.617315', '1');
INSERT INTO public."EPPM_TEACHER" VALUES (36, 73, 'PRUEBA@PRUEBA.COM', 1, '2024-11-02 16:47:48.104294', '2024-11-02 16:47:48.104294', '1');
INSERT INTO public."EPPM_TEACHER" VALUES (39, 78, 'carlos@gmail.com', 1, '2025-02-23 19:03:10.029951', '2025-02-23 19:03:10.029951', '1');
INSERT INTO public."EPPM_TEACHER" VALUES (40, 81, '1@gmail.com', 1, '2025-02-23 20:30:03.268015', '2025-02-23 20:18:22.4222', '0');


--
-- TOC entry 5026 (class 0 OID 16499)
-- Dependencies: 233
-- Data for Name: EPPM_USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPM_USER" VALUES (1, 1, 1, '$2a$10$G1nIrht5pq.sd06IjdbfoeUz9ySD8gs.41t.X92Cuh1zY0fOKvzwi', 1, '2024-10-14 13:32:29.512893', '2024-10-14 13:32:29.512893', '1', NULL);
INSERT INTO public."EPPM_USER" VALUES (27, 75, 5, '$2b$10$.4M5u8WUZCk2hvKSQE1KA.4NRec8yDrU9EquSl1KFQVJuOBHvoE1W', 1, '2024-11-03 01:54:51.888069', '2024-11-03 01:54:51.888069', '1', NULL);
INSERT INTO public."EPPM_USER" VALUES (25, 54, 5, '$2b$10$uMM2BbyM3gK91NvxmDsS1elZEoZj3mWGtMokN1wstQ9anj3e2Pz9S', 1, '2024-11-03 20:05:02.827491', '2024-11-03 20:05:02.827491', '1', NULL);
INSERT INTO public."EPPM_USER" VALUES (28, 79, 5, '$2b$10$O/ZX7kJl96620wZlp2ZgguNDFTOPmA27Y3/b99L0jdA6EV4sKXlOC', 1, '2025-02-23 19:10:14.329553', '2025-02-23 19:10:14.329553', '1', NULL);
INSERT INTO public."EPPM_USER" VALUES (29, 80, 5, '$2b$10$po9UouGo/m6bWbOSTZn6Ze7PyIF3ckGt17U3r.KqLw6qeM6WJ.vGm', 1, '2025-02-23 19:11:26.521118', '2025-02-23 19:11:26.521118', '1', NULL);


--
-- TOC entry 5036 (class 0 OID 16538)
-- Dependencies: 243
-- Data for Name: EPPP_PREFERENCES; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5034 (class 0 OID 16531)
-- Dependencies: 241
-- Data for Name: EPPT_FACULTY_PHONE; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPT_FACULTY_PHONE" VALUES (2, 12, 22);
INSERT INTO public."EPPT_FACULTY_PHONE" VALUES (3, 13, 23);
INSERT INTO public."EPPT_FACULTY_PHONE" VALUES (4, 14, 24);
INSERT INTO public."EPPT_FACULTY_PHONE" VALUES (5, 12, 22);


--
-- TOC entry 5032 (class 0 OID 16524)
-- Dependencies: 239
-- Data for Name: EPPT_PHONE_SCHOOL; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EPPT_PHONE_SCHOOL" VALUES (2, 37, 8);


--
-- TOC entry 5030 (class 0 OID 16517)
-- Dependencies: 237
-- Data for Name: EPPT_TEACHER_COURSE_PROGRAM; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 244
-- Name: EPPM_CAREER_ID_CAREER_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_CAREER_ID_CAREER_seq"', 7, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 226
-- Name: EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq"', 1, false);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 245
-- Name: EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_COURSE_PROGRAM_ID_COURSE_PROGRAM_seq1"', 1, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 219
-- Name: EPPM_FACULTY_ID_FACULTY_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_FACULTY_ID_FACULTY_seq"', 1, false);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 246
-- Name: EPPM_FACULTY_ID_FACULTY_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_FACULTY_ID_FACULTY_seq1"', 38, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 230
-- Name: EPPM_PERSON_ID_PERSON_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_PERSON_ID_PERSON_seq"', 1, false);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 247
-- Name: EPPM_PERSON_ID_PERSON_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_PERSON_ID_PERSON_seq1"', 81, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 217
-- Name: EPPM_PHONE_ID_PHONE_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_PHONE_ID_PHONE_seq"', 1, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 248
-- Name: EPPM_PHONE_ID_PHONE_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_PHONE_ID_PHONE_seq1"', 27, true);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 234
-- Name: EPPM_ROL_ID_ROL_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_ROL_ID_ROL_seq"', 1, false);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 249
-- Name: EPPM_ROL_ID_ROL_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_ROL_ID_ROL_seq1"', 16, true);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 221
-- Name: EPPM_SCHOOL_ID_SCHOOL_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_SCHOOL_ID_SCHOOL_seq"', 1, false);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 250
-- Name: EPPM_SCHOOL_ID_SCHOOL_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_SCHOOL_ID_SCHOOL_seq1"', 41, true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 224
-- Name: EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq"', 1, false);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 251
-- Name: EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_STUDY_PLAN_ID_STUDY_PLAN_seq1"', 2, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 228
-- Name: EPPM_TEACHER_ID_TEACHER_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_TEACHER_ID_TEACHER_seq"', 1, false);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 252
-- Name: EPPM_TEACHER_ID_TEACHER_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_TEACHER_ID_TEACHER_seq1"', 40, true);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 232
-- Name: EPPM_USER_ID_USER_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_USER_ID_USER_seq"', 1, false);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 253
-- Name: EPPM_USER_ID_USER_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPM_USER_ID_USER_seq1"', 29, true);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 242
-- Name: EPPP_PREFERENCES_ID_PREFERENCES_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPP_PREFERENCES_ID_PREFERENCES_seq"', 1, false);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 254
-- Name: EPPP_PREFERENCES_ID_PREFERENCES_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPP_PREFERENCES_ID_PREFERENCES_seq1"', 1, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 240
-- Name: EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq"', 1, false);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 255
-- Name: EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_FACULTY_PHONE_ID_FACULTY_PHONE_seq1"', 5, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 238
-- Name: EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq"', 1, false);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 256
-- Name: EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_PHONE_SCHOOL_ID_PHONE_SCHOOL_seq1"', 2, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 236
-- Name: EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq"', 1, false);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 257
-- Name: EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EPPT_TEACHER_COURSE_PROGRAM_ID_TEACHER_COUSE_PROGRAM_seq1"', 1, false);


--
-- TOC entry 4837 (class 2606 OID 24930)
-- Name: EPPM_ROL DSC_NAME_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_ROL"
    ADD CONSTRAINT "DSC_NAME_UNIQUE" UNIQUE ("DSC_NAME");


--
-- TOC entry 4804 (class 2606 OID 41312)
-- Name: EPPM_PHONE NUM_PHONE_NUMBER_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_PHONE"
    ADD CONSTRAINT "NUM_PHONE_NUMBER_UNIQUE" UNIQUE ("NUM_PHONE_NUMBER");


--
-- TOC entry 4816 (class 2606 OID 16563)
-- Name: EPPM_CAREER PK_CAREER; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_CAREER"
    ADD CONSTRAINT "PK_CAREER" PRIMARY KEY ("ID_CAREER");


--
-- TOC entry 4823 (class 2606 OID 16587)
-- Name: EPPM_COURSE_PROGRAM PK_COURSE_PROGRAM; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_COURSE_PROGRAM"
    ADD CONSTRAINT "PK_COURSE_PROGRAM" PRIMARY KEY ("ID_COURSE_PROGRAM");


--
-- TOC entry 4808 (class 2606 OID 16589)
-- Name: EPPM_FACULTY PK_FACULTY; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_FACULTY"
    ADD CONSTRAINT "PK_FACULTY" PRIMARY KEY ("ID_FACULTY");


--
-- TOC entry 4846 (class 2606 OID 16605)
-- Name: EPPT_FACULTY_PHONE PK_FACULTY_PHONE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_FACULTY_PHONE"
    ADD CONSTRAINT "PK_FACULTY_PHONE" PRIMARY KEY ("ID_FACULTY_PHONE");


--
-- TOC entry 4831 (class 2606 OID 16634)
-- Name: EPPM_PERSON PK_PERSON; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_PERSON"
    ADD CONSTRAINT "PK_PERSON" PRIMARY KEY ("ID_PERSON");


--
-- TOC entry 4806 (class 2606 OID 16591)
-- Name: EPPM_PHONE PK_PHONE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_PHONE"
    ADD CONSTRAINT "PK_PHONE" PRIMARY KEY ("ID_PHONE");


--
-- TOC entry 4844 (class 2606 OID 16607)
-- Name: EPPT_PHONE_SCHOOL PK_PHONE_SCHOOL; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_PHONE_SCHOOL"
    ADD CONSTRAINT "PK_PHONE_SCHOOL" PRIMARY KEY ("ID_PHONE_SCHOOL");


--
-- TOC entry 4848 (class 2606 OID 16603)
-- Name: EPPP_PREFERENCES PK_PREFERENCES; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPP_PREFERENCES"
    ADD CONSTRAINT "PK_PREFERENCES" PRIMARY KEY ("ID_PREFERENCES");


--
-- TOC entry 4839 (class 2606 OID 16593)
-- Name: EPPM_ROL PK_ROL; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_ROL"
    ADD CONSTRAINT "PK_ROL" PRIMARY KEY ("ID_ROL");


--
-- TOC entry 4812 (class 2606 OID 16595)
-- Name: EPPM_SCHOOL PK_SCHOOL; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_SCHOOL"
    ADD CONSTRAINT "PK_SCHOOL" PRIMARY KEY ("ID_SCHOOL");


--
-- TOC entry 4819 (class 2606 OID 16597)
-- Name: EPPM_STUDY_PLAN PK_STUDY_PLAN; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_STUDY_PLAN"
    ADD CONSTRAINT "PK_STUDY_PLAN" PRIMARY KEY ("ID_STUDY_PLAN");


--
-- TOC entry 4826 (class 2606 OID 16599)
-- Name: EPPM_TEACHER PK_TEACHER; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_TEACHER"
    ADD CONSTRAINT "PK_TEACHER" PRIMARY KEY ("ID_TEACHER");


--
-- TOC entry 4841 (class 2606 OID 16609)
-- Name: EPPT_TEACHER_COURSE_PROGRAM PK_TEACHER_COURSE_PROGRAM; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_TEACHER_COURSE_PROGRAM"
    ADD CONSTRAINT "PK_TEACHER_COURSE_PROGRAM" PRIMARY KEY ("ID_TEACHER_COUSE_PROGRAM");


--
-- TOC entry 4833 (class 2606 OID 16601)
-- Name: EPPM_USER PK_USER; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_USER"
    ADD CONSTRAINT "PK_USER" PRIMARY KEY ("ID_USER");


--
-- TOC entry 4828 (class 2606 OID 33117)
-- Name: EPPM_TEACHER UNIQUE_EMAIL; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_TEACHER"
    ADD CONSTRAINT "UNIQUE_EMAIL" UNIQUE ("EMAIL");


--
-- TOC entry 4810 (class 2606 OID 33119)
-- Name: EPPM_FACULTY UNIQUE_FACULTY; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_FACULTY"
    ADD CONSTRAINT "UNIQUE_FACULTY" UNIQUE ("DSC_FACULTY");


--
-- TOC entry 4814 (class 2606 OID 33121)
-- Name: EPPM_SCHOOL UNIQUE_SCHOOL; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_SCHOOL"
    ADD CONSTRAINT "UNIQUE_SCHOOL" UNIQUE ("DSC_SCHOOL");


--
-- TOC entry 4820 (class 1259 OID 16569)
-- Name: fki_FK; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK" ON public."EPPM_STUDY_PLAN" USING btree ("ID_CAREER");


--
-- TOC entry 4821 (class 1259 OID 16651)
-- Name: fki_FK_CAREER; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_CAREER" ON public."EPPM_STUDY_PLAN" USING btree ("ID_CAREER");


--
-- TOC entry 4842 (class 1259 OID 16711)
-- Name: fki_FK_COURSE_PROGRAM; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_COURSE_PROGRAM" ON public."EPPT_TEACHER_COURSE_PROGRAM" USING btree ("ID_COURSE_PROGRAM");


--
-- TOC entry 4829 (class 1259 OID 16657)
-- Name: fki_FK_PERSON; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_PERSON" ON public."EPPM_TEACHER" USING btree ("ID_PERSON");


--
-- TOC entry 4849 (class 1259 OID 16674)
-- Name: fki_FK_PREFERENCES; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_PREFERENCES" ON public."EPPP_PREFERENCES" USING btree ("ID_USER");


--
-- TOC entry 4834 (class 1259 OID 16680)
-- Name: fki_FK_PREFERENCES_USER; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_PREFERENCES_USER" ON public."EPPM_USER" USING btree ("ID_PREFERENCES");


--
-- TOC entry 4835 (class 1259 OID 16668)
-- Name: fki_FK_ROL; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_ROL" ON public."EPPM_USER" USING btree ("ID_ROL");


--
-- TOC entry 4817 (class 1259 OID 16558)
-- Name: fki_FK_SCHOOL; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_SCHOOL" ON public."EPPM_CAREER" USING btree ("ID_SCHOOL");


--
-- TOC entry 4824 (class 1259 OID 16626)
-- Name: fki_FK_STUDY_PLAN; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_STUDY_PLAN" ON public."EPPM_COURSE_PROGRAM" USING btree ("ID_STUDY_PLAN");


--
-- TOC entry 4852 (class 2606 OID 16646)
-- Name: EPPM_STUDY_PLAN FK_CAREER; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_STUDY_PLAN"
    ADD CONSTRAINT "FK_CAREER" FOREIGN KEY ("ID_CAREER") REFERENCES public."EPPM_CAREER"("ID_CAREER");


--
-- TOC entry 4858 (class 2606 OID 16706)
-- Name: EPPT_TEACHER_COURSE_PROGRAM FK_COURSE_PROGRAM; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_TEACHER_COURSE_PROGRAM"
    ADD CONSTRAINT "FK_COURSE_PROGRAM" FOREIGN KEY ("ID_COURSE_PROGRAM") REFERENCES public."EPPM_COURSE_PROGRAM"("ID_COURSE_PROGRAM");


--
-- TOC entry 4850 (class 2606 OID 16641)
-- Name: EPPM_SCHOOL FK_FACULTY; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_SCHOOL"
    ADD CONSTRAINT "FK_FACULTY" FOREIGN KEY ("ID_FACULTY") REFERENCES public."EPPM_FACULTY"("ID_FACULTY");


--
-- TOC entry 4862 (class 2606 OID 16681)
-- Name: EPPT_FACULTY_PHONE FK_FACULTY; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_FACULTY_PHONE"
    ADD CONSTRAINT "FK_FACULTY" FOREIGN KEY ("ID_FACULTY") REFERENCES public."EPPM_FACULTY"("ID_FACULTY");


--
-- TOC entry 4854 (class 2606 OID 16652)
-- Name: EPPM_TEACHER FK_PERSON; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_TEACHER"
    ADD CONSTRAINT "FK_PERSON" FOREIGN KEY ("ID_PERSON") REFERENCES public."EPPM_PERSON"("ID_PERSON");


--
-- TOC entry 4855 (class 2606 OID 16658)
-- Name: EPPM_USER FK_PERSON; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_USER"
    ADD CONSTRAINT "FK_PERSON" FOREIGN KEY ("ID_PERSON") REFERENCES public."EPPM_PERSON"("ID_PERSON");


--
-- TOC entry 4863 (class 2606 OID 16686)
-- Name: EPPT_FACULTY_PHONE FK_PHONE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_FACULTY_PHONE"
    ADD CONSTRAINT "FK_PHONE" FOREIGN KEY ("ID_PHONE") REFERENCES public."EPPM_PHONE"("ID_PHONE");


--
-- TOC entry 4860 (class 2606 OID 16696)
-- Name: EPPT_PHONE_SCHOOL FK_PHONE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_PHONE_SCHOOL"
    ADD CONSTRAINT "FK_PHONE" FOREIGN KEY ("ID_PHONE") REFERENCES public."EPPM_PHONE"("ID_PHONE");


--
-- TOC entry 4864 (class 2606 OID 16669)
-- Name: EPPP_PREFERENCES FK_PREFERENCES; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPP_PREFERENCES"
    ADD CONSTRAINT "FK_PREFERENCES" FOREIGN KEY ("ID_USER") REFERENCES public."EPPM_USER"("ID_USER");


--
-- TOC entry 4856 (class 2606 OID 16675)
-- Name: EPPM_USER FK_PREFERENCES_USER; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_USER"
    ADD CONSTRAINT "FK_PREFERENCES_USER" FOREIGN KEY ("ID_PREFERENCES") REFERENCES public."EPPP_PREFERENCES"("ID_PREFERENCES");


--
-- TOC entry 4857 (class 2606 OID 16663)
-- Name: EPPM_USER FK_ROL; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_USER"
    ADD CONSTRAINT "FK_ROL" FOREIGN KEY ("ID_ROL") REFERENCES public."EPPM_ROL"("ID_ROL");


--
-- TOC entry 4851 (class 2606 OID 16610)
-- Name: EPPM_CAREER FK_SCHOOL; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_CAREER"
    ADD CONSTRAINT "FK_SCHOOL" FOREIGN KEY ("ID_SCHOOL") REFERENCES public."EPPM_SCHOOL"("ID_SCHOOL");


--
-- TOC entry 4861 (class 2606 OID 16691)
-- Name: EPPT_PHONE_SCHOOL FK_SCHOOL; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_PHONE_SCHOOL"
    ADD CONSTRAINT "FK_SCHOOL" FOREIGN KEY ("ID_SCHOOL") REFERENCES public."EPPM_SCHOOL"("ID_SCHOOL");


--
-- TOC entry 4853 (class 2606 OID 16621)
-- Name: EPPM_COURSE_PROGRAM FK_STUDY_PLAN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPM_COURSE_PROGRAM"
    ADD CONSTRAINT "FK_STUDY_PLAN" FOREIGN KEY ("ID_STUDY_PLAN") REFERENCES public."EPPM_STUDY_PLAN"("ID_STUDY_PLAN");


--
-- TOC entry 4859 (class 2606 OID 16701)
-- Name: EPPT_TEACHER_COURSE_PROGRAM FK_TEACHER; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EPPT_TEACHER_COURSE_PROGRAM"
    ADD CONSTRAINT "FK_TEACHER" FOREIGN KEY ("ID_TEACHER") REFERENCES public."EPPM_TEACHER"("ID_TEACHER");


-- Completed on 2025-03-11 19:46:50

--
-- PostgreSQL database dump complete
--

