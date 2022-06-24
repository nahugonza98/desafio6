/* Configuracion Ruotes */

const { Router } = require('express');
const router = Router();
const productos = require('./productos')

/* Get */

router.get('/', (req, res)=>{
    res.render('index.hbs')
});

/* Use */
router.use('/productos', productos);

module.exports = router;