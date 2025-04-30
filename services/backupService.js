// npm install node-cron -- Librería para programar tareas automáticas en Node.js

const { exec } = require("child_process");
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

    // Programado para cada lunes a las 1:00 AM ya que se anilizo que si o si a esa hora debe estar encendido el servidor
    cron.schedule('0 10 * * 1', () => {
        console.log(' Iniciando proceso automático de backup semanal (lunes 10:00 AM)...');
        generarBackup((error) => {
            if (error) {
                console.error(` Error durante el backup automático: ${error.message}`);
            } else {
                console.log(" Backup generado correctamente de forma automática.");
            }
        });
    });
    
    // Endpoint manual para realizar el backup desde la aplicación con un botón
    app.get("/backup", async (req, res) => {
        generarBackup((error) => {
            if (error) {
                console.error(` Error al ejecutar pg_dump: ${error.message}`);
                return res.status(500).json({ error: "Error al generar el backup" });
            }
            console.log("Backup generado correctamente (por solicitud manual).");

            // Enviar el archivo al usuario
            res.download(backupFilePath, "backup.sql", (err) => {
                if (err) {
                    console.error(`Error al enviar el archivo: ${err.message}`);
                }
                // Eliminar el archivo después de enviarlo
                fs.unlinkSync(backupFilePath);
            });
        });
    });

    // Función para generar el backup (evita repetir código)
    function generarBackup(callback) {
        // Verificar si existe el archivo anterior y eliminarlo
        if (fs.existsSync(backupFilePath)) {
            fs.unlinkSync(backupFilePath);
            console.log(' Respaldo anterior eliminado.');
        }

        const command = `${pgDumpPath} -F c -b -v -f "${backupFilePath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    }
};

module.exports = backup;
