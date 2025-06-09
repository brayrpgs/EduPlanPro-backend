const app = require(".");

/**
 * levanta el puerto 3001
 * */
const port = 3001;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})