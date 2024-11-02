const validateFields = (field, type) => {
    console.log(typeof field);
    console.log(typeof type);
    if (typeof field === type) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = validateFields;