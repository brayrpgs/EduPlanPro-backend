const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");
const validateSession = require("../middlewares/validateSession");
const { response } = require("express");

const backup = (app) => {
    const envVars = {
        PGPASSWORD: "123",
        PGDATABASE: "EDUPLANPRO",
        PGHOST: "postgres",
        PGPORT: "5432",
        PGUSER: "postgres"
    };

    const pgDumpPath = "pg_dump"; // en Linux está en PATH
    const psqlPath = "psql";
    const backupDir = "/app/respaldosBD";

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    // Cron semanal (lunes 10 AM)
    cron.schedule('0 10 * * 1', () => {
        console.log("Backup automático semanal (lunes 10 AM)");
        generarBackup((err, sqlPath) => {
            if (!err) console.log("Backup generado:", sqlPath);
        });
    });

    // Cron mensual (día 1 a las 12:00 PM)
    cron.schedule('0 12 1 * *', () => {
        console.log("Backup mensual automático (día 1 - 12:00 PM)");
        generarBackup((err, sqlPath) => {
            if (!err) console.log("Backup mensual generado:", sqlPath);
        });
    });

    // Endpoint manual
    app.get("/backup", async (req, res) => {
        if (!(await validateSession(req, res, response))) return;
        generarBackup((error, sqlPath) => {
            if (error) {
                console.error("Error manual:", error.message);
                return res.status(500).json({ error: "Error al generar el backup" });
            }

            console.log(`Backup manual generado: ${sqlPath}`);
            res.download(sqlPath, path.basename(sqlPath), (err) => {
                if (err) console.error("Error al enviar:", err.message);
            });
        });
    });

    function generarBackup(callback) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const sqlPath = path.join(backupDir, `backup.sql`);
        const command = `${pgDumpPath} -F p -b -v -f "${sqlPath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error("STDERR:", stderr);
                return callback(error);
            }

            limpiarBackupsAntiguos();
            callback(null, sqlPath);
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

    app.post("/restore", async (req, res) => {
        if (!(await validateSession(req, res, response))) return;
        const { fileName } = req.body;

        if (!fileName || !fileName.endsWith(".sql")) {
            return res.status(400).json({ error: "Archivo inválido o no proporcionado" });
        }

        const restorePath = path.join(backupDir, fileName);

        if (!fs.existsSync(restorePath)) {
            return res.status(404).json({ error: "Archivo no encontrado" });
        }

        const command = `${psqlPath} -U postgres -d EDUPLANPRO -f "${restorePath}"`;

        exec(command, { env: { ...process.env, PGPASSWORD: "123", PGHOST: "postgres" } }, (error, stdout, stderr) => {
            if (error) {
                console.error("Error al restaurar:", stderr);
                return res.status(500).json({ error: "Error al restaurar la base de datos" });
            }

            console.log("Base de datos restaurada desde:", fileName);
            res.json({ message: `Restauración exitosa desde ${fileName}` });
        });
    });
};

module.exports = backup;
