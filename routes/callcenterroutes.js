const { Router } = require('express');
const router = new Router();
var { getCiudades, createCiudad, getCiudad, updateCiudad, deleteCiudad } = require('../controllers/ciudades.controllers');

//rutas de los endpoint
router.get('/ciudades', getCiudades);
router.post('/ciudad', createCiudad);
router.get('/ciudad/:id', getCiudad);
router.put('/ciudad/:id', updateCiudad);
router.delete('/ciudad/:id', deleteCiudad);


module.exports = router;