const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const backup = (app) => {
    app.get("/backup", async (req, res) => {
        const envVars = {
            PGPASSWORD: "123",
            PGDATABASE: "EDUPLANPRO",
            PGHOST: "localhost",
            PGPORT: "5432",
            PGUSER: "postgres"
        };

        // Ruta completa a pg_dump.exe
        const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe"`;

        // Ruta donde se guardará el backup
        const backupFilePath = path.join(__dirname, "backup.sql");

        const command = `${pgDumpPath} -F c -b -v -f "${backupFilePath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar pg_dump: ${error.message}`);
                return res.status(500).json({ error: "Error al generar el backup" });
            }
            console.log("Backup generado correctamente");

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
