//npm install adm-zip  para crear un zip de la carpeta de respaldo

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");

const backup = (app) => {
    const envVars = {
        PGPASSWORD: "123", //cambiar por la contraseña de postgrest de ustedes o que vayan a colocar "ojo"
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
        console.log(" Backup automático de prueba (cada minuto)");
        generarBackup((err, sqlPath) => {
            if (!err) console.log(" Backup generado:", sqlPath);
        });
    });

    // Cron mensual (día 1 a las 12:00 PM)
    cron.schedule('0 12 1 * *', () => {
        console.log(" Backup mensual automático (día 1 - 12:00 PM)");
        generarBackup((err, sqlPath) => {
            if (!err) console.log(" Backup mensual generado:", sqlPath);
        });
    });

    // Endpoint manual
    app.get("/backup", async (req, res) => {
        generarBackup((error, sqlPath) => {
            if (error) {
                console.error(" Error manual:", error.message);
                return res.status(500).json({ error: "Error al generar el backup" });
            }

            console.log(` Backup manual generado: ${sqlPath}`);
            res.download(sqlPath, path.basename(sqlPath), (err) => {
                if (err) console.error(" Error al enviar:", err.message);
                // fs.unlinkSync(sqlPath); // opcional: eliminar después de enviar
            });
        });
    });

    function generarBackup(callback) {
        const now = new Date();
        const timestamp = now.toISOString().split("T")[0];
        const sqlPath = path.join(backupDir, `backup-${timestamp}.sql`);

        //  Formato plano para .sql legible
        const command = `${pgDumpPath} -F p -b -v -f "${sqlPath}"`;

        exec(command, { env: { ...process.env, ...envVars } }, (error, stdout, stderr) => {
            if (error) {
                console.error("STDERR:", stderr);
                return callback(error);
            }

            // Limpieza de archivos antiguos
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
                console.log(` Backup eliminado: ${file}`);
            }
        });
    }
// endpoint para restaurar la base de datos
    app.post("/restore", async (req, res) => {
        const { fileName } = req.body;
    
        if (!fileName || !fileName.endsWith(".sql")) {
            return res.status(400).json({ error: "Archivo inválido o no proporcionado" });
        }
    
        const restorePath = path.join(backupDir, fileName);
    
        if (!fs.existsSync(restorePath)) {
            return res.status(404).json({ error: "Archivo no encontrado" });
        }
    
        const psqlPath = `"C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe"`; // ruta real
    
        const command = `${psqlPath} -U postgres -d EDUPLANPRO -f "${restorePath}"`;
    
        exec(command, { env: { ...process.env, PGPASSWORD: "2122" } }, (error, stdout, stderr) => {
            if (error) {
                console.error(" Error al restaurar:", stderr);
                return res.status(500).json({ error: "Error al restaurar la base de datos" });
            }
    
            console.log(" Base de datos restaurada desde:", fileName);
            res.json({ message: `Restauración exitosa desde ${fileName}` });
        });
    });
    
};

module.exports = backup;
