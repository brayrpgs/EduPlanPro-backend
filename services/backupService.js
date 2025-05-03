//npm install adm-zip  para crear un zip de la carpeta de respaldo

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");
const AdmZip = require("adm-zip");

const backup = (app) => {
    const envVars = {
        PGPASSWORD: "2122",
        PGDATABASE: "EDUPLANPRO",
        PGHOST: "localhost",
        PGPORT: "5432",
        PGUSER: "postgres"
    };

    const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe"`;
    const backupDir = "C:\\respaldosBD";

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    // Cron semanal (lunes 10 AM)
    cron.schedule('0 10 * * 1', () => {
        console.log(" Backup semanal automático (lunes 10AM)");
        generarBackup((err, zipPath) => {
            if (!err) console.log("Backup semanal generado:", zipPath);
        });
    });

    // Cron mensual (día 1 a las 12:00 PM)
    cron.schedule('0 12 1 * *', () => {
        console.log("Backup mensual automático (día 1 - 12:00 PM)");
        generarBackup((err, zipPath) => {
            if (!err) console.log(" Backup mensual generado:", zipPath);
        });
    });

    // Endpoint manual
    app.get("/backup", async (req, res) => {
        generarBackup((error, zipPath) => {
            if (error) {
                console.error(" Error manual:", error.message);
                return res.status(500).json({ error: "Error al generar el backup" });
            }

            console.log(` Backup manual generado: ${zipPath}`);
            res.download(zipPath, path.basename(zipPath), (err) => {
                if (err) console.error(" Error al enviar:", err.message);
               // fs.unlinkSync(zipPath);
            });
        });
    });

    function generarBackup(callback) {
        const now = new Date();
        const timestamp = now.toISOString().split("T")[0];
        const sqlPath = path.join(backupDir, `backup-${timestamp}.sql`);
        const zipPath = path.join(backupDir, `backup-${timestamp}.zip`);

        const command = `${pgDumpPath} -F c -b -v -f "${sqlPath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error("STDERR:", stderr);
                return callback(error);
            }

            // Comprimir .sql en .zip
            const zip = new AdmZip();
            zip.addLocalFile(sqlPath);
            zip.writeZip(zipPath);
            console.log("Comprimido en:", zipPath);

            // Eliminar el .sql original
            fs.unlinkSync(sqlPath);

            // Limpiar archivos viejos
            limpiarBackupsAntiguos();

            callback(null, zipPath);
        });
    }

    function limpiarBackupsAntiguos() {
        const ahora = Date.now();
        const diasMaximos = 7;

        fs.readdirSync(backupDir).forEach(file => {
            const filePath = path.join(backupDir, file);
            const stats = fs.statSync(filePath);
            const edadDias = (ahora - stats.mtimeMs) / (1000 * 60 * 60 * 24);

            if (edadDias > diasMaximos) {
                fs.unlinkSync(filePath);
                console.log(`Backup eliminado: ${file}`);
            }
        });
    }
};

module.exports = backup;
