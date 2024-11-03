const validateFields = (field, type) => {
    if (type == "string") {
        const data = parseInt(field);
        if (!isNaN(data)) {
            return false;
        }
    }
    if (type == "number") {
        const data = parseInt(field);
        if (isNaN(data)) {
            return false;
        }
    }
    return true;
}

module.exports = validateFields;