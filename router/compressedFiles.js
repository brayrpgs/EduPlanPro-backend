const Controller = require("../controllers/ControllerStudyPlan");
const validateSession = require("../middlewares/validateSession");
const CompressedFiles = require("../utils/CompressedFiles");
const compressedFiles = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/CompressedFiles")
        .get(async (req, res) => {
            
            if (!(await validateSession(req, res, response))) return;
            
            try {
               
                const compressor = new CompressedFiles();
                
              
                const FILE_NAME = "study_plans.zip";
                
                
                const result = await compressor.compressedFiles(FILE_NAME);
                
                if (result) {
                    
                    res.download(result, FILE_NAME, (err) => {
                        if (err) {
                            response.data = "Error al descargar el archivo";
                            response.code = "500";
                            res.send(response);
                        }
                    });
                } else if (result === undefined) {
                    response.data = "No hay archivos disponibles para comprimir";
                    response.code = "404";
                    res.send(response);
                } else {
                    response.data = "Error al comprimir los archivos";
                    response.code = "500";
                    res.send(response);
                }
            } catch (error) {
                console.error("Error en el endpoint CompressedFiles:", error);
                response.data = "Error interno del servidor";
                response.code = "500";
                res.send(response);
            }
        });
}

module.exports = compressedFiles;