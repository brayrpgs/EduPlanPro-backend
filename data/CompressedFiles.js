class CompressedFiles {
    async compressedFiles(FILE_NAME) {
        try {
            const outputPath = FILE_NAME;
            const stmt = await this.conn.connect();
            const result = await stmt.query(`SELECT "PDF_URL" FROM PUBLIC."EPPM_STUDY_PLAN" WHERE "STATE" = '1';`);
            const pdfUrls = result.rows.map(row => row.PDF_URL).filter(url => url); // Filtra nulos

            if (pdfUrls.length === 0) return undefined;

            const output = fs.createWriteStream(outputPath);
            const archive = archiver("zip", { zlib: { level: 9 } });

            return new Promise((resolve, reject) => {
                output.on("close", () => resolve(outputPath));
                archive.on("error", err => reject(err));

                archive.pipe(output);

                pdfUrls.forEach(filePath => {
                    const fileName = path.basename(filePath);
                    if (fs.existsSync(filePath)) {
                        archive.file(filePath, { name: fileName });
                    }
                });

                archive.finalize();
            });

        } catch (error) {
            console.error("Error al comprimir archivos:", error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }

    async compressedFilesCoursesPlan(FILE_NAME) {
        try {
            const outputPath = FILE_NAME;
            const stmt = await this.conn.connect();
            const result = await stmt.query(`SELECT "PDF_URL" FROM PUBLIC."EPPM_COURSE_PROGRAM" WHERE "STATE" = '1';`);
            const pdfUrls = result.rows.map(row => row.PDF_URL).filter(url => url); // Filtra nulos

            if (pdfUrls.length === 0) return undefined;

            const output = fs.createWriteStream(outputPath);
            const archive = archiver("zip", { zlib: { level: 9 } });

            return new Promise((resolve, reject) => {
                output.on("close", () => resolve(outputPath));
                archive.on("error", err => reject(err));

                archive.pipe(output);

                pdfUrls.forEach(filePath => {
                    const fileName = path.basename(filePath);
                    if (fs.existsSync(filePath)) {
                        archive.file(filePath, { name: fileName });
                    }
                });

                archive.finalize();
            });

        } catch (error) {
            console.error("Error al comprimir archivos:", error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }

}