const { Pool } = require('pg');
const pool = new Pool();

const trashModel = {
    // Buscar archivos en la papelera con filtros y paginación
    async searchTrashItems(userId, filters = {}, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        let query = `
            SELECT 
                t.id,
                t.original_name,
                t.file_type,
                t.deleted_at,
                t.original_path,
                t.file_size,
                t.user_id,
                u.username as deleted_by
            FROM trash t
            JOIN users u ON t.user_id = u.id
            WHERE t.user_id = $1
        `;
        
        const queryParams = [userId];
        let paramCount = 2;

        // Aplicar filtros si existen
        if (filters.originalName) {
            query += ` AND t.original_name ILIKE $${paramCount}`;
            queryParams.push(`%${filters.originalName}%`);
            paramCount++;
        }

        if (filters.fileType) {
            query += ` AND t.file_type = $${paramCount}`;
            queryParams.push(filters.fileType);
            paramCount++;
        }

        if (filters.deletedFrom) {
            query += ` AND t.deleted_at >= $${paramCount}`;
            queryParams.push(filters.deletedFrom);
            paramCount++;
        }

        if (filters.deletedTo) {
            query += ` AND t.deleted_at <= $${paramCount}`;
            queryParams.push(filters.deletedTo);
            paramCount++;
        }

        // Agregar ordenamiento y paginación
        query += ` ORDER BY t.deleted_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        queryParams.push(limit, offset);

        try {
            const result = await pool.query(query, queryParams);
            return result.rows;
        } catch (error) {
            throw new Error(`Error searching trash items: ${error.message}`);
        }
    },

    // Obtener el total de resultados para la paginación
    async getTotalTrashItems(userId, filters = {}) {
        let query = `
            SELECT COUNT(*)
            FROM trash t
            WHERE t.user_id = $1
        `;
        
        const queryParams = [userId];
        let paramCount = 2;

        // Aplicar los mismos filtros que en la búsqueda
        if (filters.originalName) {
            query += ` AND t.original_name ILIKE $${paramCount}`;
            queryParams.push(`%${filters.originalName}%`);
            paramCount++;
        }

        if (filters.fileType) {
            query += ` AND t.file_type = $${paramCount}`;
            queryParams.push(filters.fileType);
            paramCount++;
        }

        if (filters.deletedFrom) {
            query += ` AND t.deleted_at >= $${paramCount}`;
            queryParams.push(filters.deletedFrom);
            paramCount++;
        }

        if (filters.deletedTo) {
            query += ` AND t.deleted_at <= $${paramCount}`;
            queryParams.push(filters.deletedTo);
            paramCount++;
        }

        try {
            const result = await pool.query(query, queryParams);
            return parseInt(result.rows[0].count);
        } catch (error) {
            throw new Error(`Error getting total trash items: ${error.message}`);
        }
    }
};

module.exports = trashModel; 