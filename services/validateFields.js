const validateFields = (field, type) => {
    if (typeof field === type) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = validateFields;