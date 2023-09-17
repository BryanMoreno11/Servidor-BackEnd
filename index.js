const express = require('express');
const app = express();
var callcenter_routes = require('./routes/callcenterroutes');
//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas
app.use('/api', callcenter_routes);
app.listen("3000");
console.log("server up localhost:3000");