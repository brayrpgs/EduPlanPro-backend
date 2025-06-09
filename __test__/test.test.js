const app = require("..");
const request = require("supertest");

let server;
let cookie; // <-- aquí se almacenará la sesión

beforeEach(() => {
    server = app.listen(3005);
});

afterEach(async () => {
    await new Promise((resolve) => server.close(resolve));
});
//test de kendall fallas
describe("Test de inicio de sesiónes", () => {
    it("POST /session con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");

        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    it("GET /session con sesión activa", async () => {
        const response = await request(app)
            .get("/session")
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("DELETE /session con sesión activa", async () => {
        const response = await request(app)
            .delete("/session")
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });
});

//test de brayan rosales
describe("Test de facultades", () => {
    it("POST /faculty con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    it("POST /faculty crear una facultad", async () => {
        const response = await request(app)
            .post("/faculty")
            .send({ name: "test" })
            .set("Accept", "application/json")
            .set("Cookie", cookie);

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(["200", "500"]).toContain(response.body.code);
        expect([
            "La facultad Ya Esta Registrada",
            "La facultad fue creada correctamente"
        ]).toContain(response.body.data);
    });
    let idFaculty;
    it("GET /faculty mostrar las facultades", async () => {
        const response = await request(app)
            .get("/faculty")
            .set("Cookie", cookie);
        const data = Array.from(response.body.data).sort((a, b) => a.ID_FACULTY - b.ID_FACULTY).reverse()
        idFaculty = data[0].ID_FACULTY;
        console.log(data);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("DELETE /faculty con sesión activa", async () => {
        const response = await request(app)
            .delete("/faculty")
            .send({
                id: idFaculty
            })
            .set("Cookie", cookie);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
        expect(response.body.data).toBe("La facultad fue Eliminada correctamente");
    });
});

// test de ceasar calvo
describe("Test de Escuelas", () => {
    it("POST /session con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");

        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    let idFaculty;
    it("GET /faculty mostrar las facultades para asiganar la ultima", async () => {
        const response = await request(app)
            .get("/faculty")
            .set("Cookie", cookie);
        const data = Array.from(response.body.data).sort((a, b) => a.ID_FACULTY - b.ID_FACULTY).reverse()
        idFaculty = data[0].ID_FACULTY;
        console.log(data);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("POST /school crear una escuela", async () => {
        const response = await request(app)
            .post("/school")
            .send({
                "desc": "test",
                "id": idFaculty
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(["200", "500", "501", "400"]).toContain(response.body.code);
        expect([
            "La Escuela fue creada correctamente",
            "La Escuela Ya Esta Registrada",
            "Campos invalidos",
            "La Escuela No fue creada"
        ]).toContain(response.body.data);
    });
    let idSchool;
    it("GET /school mostrar las escuelas", async () => {
        const response = await request(app)
            .get("/school")
            .set("Cookie", cookie);
        const data = Array.from(response.body.data).sort((a, b) => a.ID_SCHOOL - b.ID_SCHOOL).reverse()
        idSchool = data[0].ID_SCHOOL;
        console.log(data);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("DELETE /school con sesión activa", async () => {
        const response = await request(app)
            .delete("/school")
            .send({
                id: idSchool
            })
            .set("Cookie", cookie);
        console.log(response.body);
        console.log(idSchool);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });
});

//test de Carlos orellana
describe("Test de Roles", () => {
    it("POST /session con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");

        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    it("POST /rol crear un rol", async () => {
        const response = await request(app)
            .post("/rol")
            .send({
                name: "test",
                desc: "test"
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(["200", "500", "400"]).toContain(response.body.code);
        expect([
            "El Rol fue creado correctamente",
            "El Rol No fue creado, porque ya existe uno con ese nombre",
            "El Rol No fue creado",
        ]).toContain(response.body.data);
    });

    let idRol;
    it("GET /rol mostrar los roles", async () => {
        const response = await request(app)
            .get("/rol")
            .set("Cookie", cookie);
        const data = Array.from(response.body.data).sort((a, b) => a.ID_ROL - b.ID_ROL).reverse()
        idRol = data[0].ID_ROL;
        console.log(data);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("DELETE /rol con sesión activa", async () => {
        const response = await request(app)
            .delete("/rol")
            .send({
                id: idRol
            })
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
        expect(response.body.data).toBe("El Rol fue Eliminado correctamente");
        console.log(response.body);
        console.log(idRol);

    });
});

//test de David Padilla
describe("Test de Preferencias", () => {
    it("POST /session con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");

        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    it("POST /preferences crear unas preferencias", async () => {
        const response = await request(app)
            .post("/preferences")
            .send({
                font: "Playfair Display SC",
                size_font: "Pequeño",
                header_footer_color: "Rojo",
                icon_size: "Mediano",
                theme: "Claro",
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(["200", "400"]).toContain(response.body.code);
        expect([
            "Las preferencias fueron creadas correctamente",
            "Las preferencias no fueron creadas correctamente",
        ]).toContain(response.body.data);
    });

    it("GET /preferences mostrar preferencias", async () => {
        const response = await request(app)
            .get("/preferences")
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
    });

    it("DELETE /preferences con sesión activa", async () => {
        const response = await request(app)
            .delete("/preferences")
            .set("Cookie", cookie);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");
        expect(response.body.data).toBe("Las preferencias fueron eliminadas correctamente");
    });
});


/**
 * test de intecciones de SQL
 */

// Test sesión con inyección SQL kendall fallas
describe("Test de sesión con inyección SQL", () => {
    it("POST /session con credenciales válidas", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.code).toBe("200");

        cookie = response.headers["set-cookie"];
        expect(cookie).toBeDefined();
    });

    it("POST /session con intento de inyección SQL en idcard", async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "' OR '1'='1",
                password: "anything"
            })
            .set("Accept", "application/json");
        console.log(response.body);
        expect(response.status).toBe(400);
    });
});

// Test facultades con sesión y prueba de inyección SQL brayan rosales
describe("Test de facultades con inyección SQL", () => {
    beforeAll(async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        cookie = response.headers["set-cookie"];
    });

    it("POST /faculty con intento de inyección SQL en name", async () => {
        const response = await request(app)
            .post("/faculty")
            .send({ name: "'; DROP TABLE faculties; --" })
            .set("Accept", "application/json")
            .set("Cookie", cookie);
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.code).not.toBe("200");
    });
});

// Test escuelas con sesión y prueba de inyección SQL ceasar calvo
describe("Test de escuelas con inyección SQL", () => {
    let cookie;
    let idFaculty;

    beforeAll(async () => {
        const sessionRes = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");
        cookie = sessionRes.headers["set-cookie"];

        const facultyRes = await request(app)
            .get("/faculty")
            .set("Cookie", cookie);

        const data = Array.from(facultyRes.body.data).sort((a, b) => a.ID_FACULTY - b.ID_FACULTY).reverse();
        idFaculty = data[0].ID_FACULTY;
    });


    it("POST /school con intento de inyección SQL en desc", async () => {
        const response = await request(app)
            .post("/school")
            .send({
                desc: "' OR 1=1 --",
                id: idFaculty
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.code).not.toBe("200");
    });
});

// Test roles con sesión y prueba de inyección SQL Carlos Orellana
describe("Test de roles con inyección SQL", () => {
    let cookie;

    beforeAll(async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        cookie = response.headers["set-cookie"];
    });


    it("POST /rol con intento de inyección SQL en name", async () => {
        const response = await request(app)
            .post("/rol")
            .send({
                name: "' OR 'x'='x",
                desc: "test"
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);

        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.code).not.toBe("200");
    });
});

// Test preferencias con sesión y prueba de inyección SQL
describe("Test de preferencias con inyección SQL", () => {
    let cookie;

    beforeAll(async () => {
        const response = await request(app)
            .post("/session")
            .send({
                idcard: "root",
                password: "root"
            })
            .set("Accept", "application/json");

        cookie = response.headers["set-cookie"];
    });

    it("POST /preferences con intento de inyección SQL en font", async () => {
        const response = await request(app)
            .post("/preferences")
            .send({
                font: "'; DROP TABLE preferences; --",
                size_font: "Pequeño",
                header_footer_color: "Rojo",
                icon_size: "Mediano",
                theme: "Claro",
            })
            .set("Accept", "application/json")
            .set("Cookie", cookie);

        expect(response.status).toBe(400);
        expect(response.body.code).not.toBe("200");
    });
});






