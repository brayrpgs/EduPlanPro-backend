const validateFields = (field, type) => {
    console.log(typeof field);
    if(typeof field === type){
        return true;
    }
    else{
        return false;
    }
}

module.exports = validateFields;