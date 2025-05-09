const trashModel = require('../database/trashModel');

const trashController = {
    // Buscar elementos en la papelera
    async searchTrash(req, res) {
        try {
            const userId = req.user.id; // Asumiendo que el middleware de autenticación agrega el usuario
            const {
                page = 1,
                limit = 10,
                originalName,
                fileType,
                deletedFrom,
                deletedTo
            } = req.query;

            // Construir objeto de filtros
            const filters = {
                originalName,
                fileType,
                deletedFrom,
                deletedTo
            };

            // Obtener resultados paginados
            const items = await trashModel.searchTrashItems(
                userId,
                filters,
                parseInt(page),
                parseInt(limit)
            );

            // Obtener total de resultados para la paginación
            const total = await trashModel.getTotalTrashItems(userId, filters);

            // Construir respuesta
            const response = {
                items,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            };

            res.status(200).json(response);
        } catch (error) {
            console.error('Error in searchTrash:', error);
            res.status(500).json({
                error: 'Error interno del servidor',
                message: error.message
            });
        }
    }
};

module.exports = trashController; 