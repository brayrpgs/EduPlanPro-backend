const CompressedFiles = require("../utils/CompressedFiles");  

class ControllerCompressedFiles {
    constructor(parameters) {
        this.compressedFiles = new CompressedFiles();
    }

    /**
     * 
     * @param {string} FILE_NAME 
     * @returns {Promise<string|boolean|undefined>} 
     */
    async compressStudyPlans(FILE_NAME) {
        return await this.compressedFiles.compressedFiles(FILE_NAME);
    }
}

module.exports = ControllerCompressedFiles;