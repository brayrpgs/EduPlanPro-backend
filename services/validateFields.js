const validateFields = (field, type) => {
    if (type === "string") {
        // Verifica que el campo sea un string y no un número
        if (typeof field !== "string" || !isNaN(Number(field))) {
            console.log(`Invalidado: el campo "${field}" no es un string válido`);
            return false;
        }
    } else if (type === "number") {
        // Verifica que el campo sea un número o un string convertible a número
        if (typeof field !== "number" && (typeof field !== "string" || isNaN(Number(field)))) {
            console.log(`Invalidado: el campo "${field}" no es un número válido`);
            return false;
        }
    }
    else {
        console.log(`Tipo no soportado: "${type}"`);
        return false;
    }
    return true;
};

module.exports = validateFields;