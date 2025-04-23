const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const backup = (app) => {
    app.get("/backup", async (req, res) => {
        const envVars = {
            PGPASSWORD: "123", //depende de la base de datos y usuario
            PGDATABASE: "EDUPLANPRO",
            PGHOST: "localhost",
            PGPORT: "5432", // Puerto por defecto de PostgreSQL
            PGUSER: "postgres"
        };

        // Ruta completa a pg_dump.exe
        const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe"`;

        // Ruta donde se guardará el backup
        const backupFilePath = path.join(__dirname, "backup.sql");

        const command = `${pgDumpPath} -F c -b -v -f "${backupFilePath}"`;
        // Ejecuta el comando pg_dump para generar el backup
        // Verifica si el archivo de backup ya existe y lo elimina
        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar pg_dump: ${error.message}`);
                return res.status(500).json({ error: "Error al generar el backup" });
            }
            console.log("Backup generado correctamente");
            //  muestra el resultado de la ejecución
            // Enviar el archivo al usuario
            res.download(backupFilePath, "backup.sql", (err) => {
                if (err) console.error(`Error al enviar el archivo: ${err.message}`);

                // Opcional: eliminar el archivo después de enviarlo
                fs.unlinkSync(backupFilePath);
            });
        });
    });
};

module.exports = backup;

//npm install node-cron librería para Node.js que permite programar tareas automáticas a intervalos de tiempo definidos 

/*const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");

const backup = (app) => {
    const envVars = {
        PGPASSWORD: "123",
        PGDATABASE: "EDUPLANPRO",
        PGHOST: "localhost",
        PGPORT: "5432",
        PGUSER: "postgres"
    };

    const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe"`;
    const backupFilePath = path.join(__dirname, "backup.sql");

    // 👉 Programar para cada domingo a la 1:00 AM (puedes ajustar el horario)
    cron.schedule('0 1 * * 0', () => {
        console.log('Iniciando proceso automático de backup semanal...');

        // Verificar si existe el archivo anterior y eliminarlo
        if (fs.existsSync(backupFilePath)) {
            fs.unlinkSync(backupFilePath);
            console.log('Respaldo anterior eliminado.');
        }

        const command = `${pgDumpPath} -F c -b -v -f "${backupFilePath}"`;
        
        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar pg_dump: ${error.message}`);
                return;
            }
            console.log("✅ Backup generado correctamente de forma automática.");
        });
    });

    // ✔️ También mantiene el endpoint manual por si quieres hacer el backup a mano
    app.get("/backup", async (req, res) => {
        if (fs.existsSync(backupFilePath)) {
            fs.unlinkSync(backupFilePath);
            console.log('Respaldo anterior eliminado (por petición manual).');
        }

        const command = `${pgDumpPath} -F c -b -v -f "${backupFilePath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar pg_dump: ${error.message}`);
                return res.status(500).json({ error: "Error al generar el backup" });
            }
            console.log("Backup generado correctamente (por petición manual).");
            res.download(backupFilePath, "backup.sql", (err) => {
                if (err) console.error(`Error al enviar el archivo: ${err.message}`);
                fs.unlinkSync(backupFilePath);
            });
        });
    });
};

module.exports = backup;
*/