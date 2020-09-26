const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ USUARIO
router.get('/getUsers', async (req, res) => {
    sql = "select * from cliente";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "RUT_CLIENTE": user[0],
            "NOMBRE_CLIENTE": user[1],
            "APELLIDO_CLIENTE": user[2],
            "TEL_CLIENTE": user[3],
            "NOMBRE_USUARIO": user[4],
            "PASSWORD_USUARIO": user[5],
            "EMPRESA_ID_EMPRESA": user[6]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE USUARIO
router.post('/addUser', async (req, res) => {
    const { rut_cliente, nombre_cliente, apellido_cliente,  tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa} = req.body;

    sql = "insert into cliente(rut_cliente,nombre_cliente,apellido_cliente,tel_cliente,nombre_usuario,password_usuario,empresa_id_empresa) values (:rut_cliente,:nombre_cliente,:apellido_cliente, :tel_cliente,:nombre_usuario,:password_usuario,:empresa_id_empresa)";

    await BD.Open(sql, [rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa], true);

    sql2 = "select * from cliente";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "RUT_CLIENTE": user[0],
            "NOMBRE_CLIENTE": user[1],
            "APELLIDO_CLIENTE": user[2],
            "TEL_CLIENTE": user[3],
            "NOMBRE_USUARIO": user[4],
            "PASSWORD_USUARIO": user[5],
            "EMPRESA_ID_EMPRESA": user[6]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//UPDATE USUARIO
router.put("/updateUser", async (req, res) => {
    const { rut_cliente, nombre_cliente, apellido_cliente,  tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa } = req.body;

    sql = "update cliente set nombre_cliente=:nombre_cliente, apellido_cliente=:apellido_cliente, tel_cliente=:tel_cliente, nombre_usuario=:nombre_usuario, password_usuario=:password_usuario, empresa_id_empresa=:empresa_id_empresa where rut_cliente=:rut_cliente";

    await BD.Open(sql, [rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa], true);

    res.status(200).json({
        "rut_cliente": rut_cliente,
        "nombre_cliente": nombre_cliente,
        "apellido_cliente": apellido_cliente,
        "tel_cliente": tel_cliente,
        "nombre_usuario": nombre_usuario,
        "password_usuario": password_usuario,
        "empresa_id_empresa": empresa_id_empresa,
    })

})


//DELETE USUARIO
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "delete from cliente where rut_cliente=:rut_cliente";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})


//READ EMPRESA
router.get('/getEmpresas', async (req, res) => {
    sql = "select * from empresa";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_empresa": user[0],
            "nombre_empresa": user[1]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE EMPRESA
router.post('/addUser', async (req, res) => {
    const { id_empresa, nombre_empresa} = req.body;

    sql = "insert into empresa(id_empresa,nombre_empresa) values (:id_empresa,:nombre_empresa)";

    await BD.Open(sql, [rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa], true);

    res.status(200).json({
        "id_empresa": id_empresa,
        "nombre_empresa": nombre_empresa
    })
})


router.get('/', async (req, res) => {
    sql = "select * from cliente";
    
    let result = await BD.Open(sql,[], false);
    console.log(result);

    res.status(200).json("Todo Ok")
})

module.exports = router;