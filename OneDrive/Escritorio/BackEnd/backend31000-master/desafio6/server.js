/* Require */
const express = require("express");
const app = express();
const rutas = require("./routes/index.js");
const puerto = 8080;
const path = require("path");


/* Acceder al Body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



/* ------- */
app.use("/", rutas);
app.listen(puerto, () => {
    console.log(`El servidor esta escuchando el puerto: ${puerto}`);
});
