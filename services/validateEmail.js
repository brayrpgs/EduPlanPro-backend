// Expresión regular para validar correos electrónicos
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return regex.test(email); // Devuelve true si es válido, false si no
};

module.exports = validateEmail;