const { Pool } = require('pg');
//cadena de conexión
const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'callcenter',
    port: '5432'
});

//función para devolver todas las ciudades
async function getCiudades(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from ciudades');
        client.release();
        res.json(result.rows);


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }


}
//devolver una ciudad con un id
async function getCiudad(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM ciudades where id_ciudad=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la ciudad' });
        }


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }


}






//función para insertar una ciudad
async function createCiudad(req, res) {
    const { nombre, provincia } = req.body;
    const query = 'INSERT INTO ciudades (nombre, provincia) VALUES ($1,$2)';
    const values = [nombre, provincia];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó la ciudad' });
        } else {
            res.status(400).json({ message: 'No se guardó la ciudad' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}


async function updateCiudad(req, res) {
    const { id } = req.params;
    const { nombre, provincia } = req.body;
    const query = 'UPDATE ciudades SET nombre=$2, provincia=$3 WHERE id_ciudad=$1';
    const values = [id, nombre, provincia];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó la ciudad' });
        } else {
            res.status(400).json({ message: 'No se actualizó' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

//eliminar ciudad por un id 

async function deleteCiudad(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM ciudades where id_ciudad=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Ciudad eliminada' });
        } else {
            res.status(500).json({ message: 'No existe la ciudad' });
        }


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }


}


module.exports = { getCiudades, createCiudad, getCiudad, updateCiudad, deleteCiudad };