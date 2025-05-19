const ConnectionDB = require("./ConnectionDB");

class RecycleBin {

    constructor(parameters) {
        this.coon = new ConnectionDB();
    }

    async getOffState(carrerState, schoolState, facultyState, teacherState, studyState, courseState) {
        const sqlCarreer = `SELECT
                                "DSC_CARRER" AS "DATA",
                                "DSC_CODE",
                                "ID_SCHOOL" ,
                                "UPDATED_BY",
                                "UPDATED AT",
                                "CREATED_AT",
                                "STATE",
                                "ID_CAREER" AS "id"
                            FROM
                                PUBLIC."EPPM_CAREER"
                            WHERE
                                "STATE" = $1`;

        const sqlSchool = `SELECT
                                "ID_SCHOOL" AS ID,
                                "DSC_SCHOOL" AS "DATA",
                                "ID_FACULTY" AS "DATA2",
                                "UPDATED_BY",
                                "STATE",
                                "CREATED_AT",
                                "UPDATED_AT"
                            FROM
                                PUBLIC."EPPM_SCHOOL"
                            WHERE "STATE" = $1`;

        const sqlFaculty = `SELECT
                                "ID_FACULTY" AS ID,
                                "DSC_FACULTY" AS "DATA",
                                "UPDATED_BY",
                                "UPDATED_AT",
                                "CREATED_AT",
                                "STATE"
                            FROM
                                PUBLIC."EPPM_FACULTY"
                            WHERE "STATE" = $1`;

        const sqlTeacher = `SELECT
                                "EPPM_TEACHER"."ID_TEACHER" AS "id",
                                "EPPM_PERSON"."DSC_NAME" AS "DATA",
                                "EPPM_PERSON"."DSC_SECOND_NAME" AS "DATA2",
                                "EPPM_PERSON"."IDCARD" AS "DATA3",
                                "EPPM_TEACHER"."EMAIL" AS "DATA4",
                                "EPPM_PERSON2"."DSC_NAME"
                            FROM
                                PUBLIC."EPPM_TEACHER"
                                INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                                INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                                INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                            WHERE "EPPM_TEACHER"."STATE" = $1`;


        const sqlStudyPlan = `SELECT
                            "ID_STUDY_PLAN" AS ID,
                            "DSC_NAME" AS "DATA",
                            "DAT_INIT" AS "DATA2",
                            "DAT_MAX",
                            "ID_CAREER",
                            "UPDATED_BY",
                            "UPDATED_AT",
                            "CREATED_AT",
                            "PDF_URL",
                            "STATE"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN"
                        WHERE "STATE" = $1`;

        const sqlCourseProgram = `SELECT
                            "ID_COURSE_PROGRAM" AS ID,
                            "DSC_NAME" AS "DATA",
                            "DAT_YEAR" AS "DATA2",
                            "ID_STUDY_PLAN",
                            "NRC" AS "DATA3",
                            "CICLE",
                            "NUM_CREDITS",
                            "SIGNATURE",
                            "UPDATED_BY",
                            "UPDATED_AT",
                            "CREATED_AT",
                            "PDF_URL",
                            "STATE"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE "STATE" = $1`;

        try {
            const conn = await this.coon.connect();

            const resultCarreer = await conn.query(sqlCarreer, [carrerState]);
            resultCarreer.rows.forEach(row => row.table = "carreer");

            const resultSchool = await conn.query(sqlSchool, [schoolState]);
            resultSchool.rows.forEach(row => row.table = "school");

            const resultFaculty = await conn.query(sqlFaculty, [facultyState]);
            resultFaculty.rows.forEach(row => row.table = "faculty");

            const resultTeacher = await conn.query(sqlTeacher, [teacherState]);
            resultTeacher.rows.forEach(row => row.table = "teacher");

            const resultStudy = await conn.query(sqlStudyPlan, [studyState]);
            resultStudy.rows.forEach(row => row.table = "study_plan");

            const resultCourse = await conn.query(sqlCourseProgram, [courseState]);
            resultCourse.rows.forEach(row => row.table = "course_program");

            let result = resultCarreer.rows
                .concat(resultSchool.rows)
                .concat(resultFaculty.rows)
                .concat(resultTeacher.rows)
                .concat(resultStudy.rows)
                .concat(resultCourse.rows);
            //console.log(result)
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = RecycleBin;
