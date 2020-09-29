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


//DELETE USUARIO
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "delete from cliente where rut_cliente=:rut_cliente";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})


// ------------------------------------------------------------


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
router.post('/addEmpresa', async (req, res) => {
    const { id_empresa, nombre_empresa} = req.body;

    sql = "insert into empresa(id_empresa,nombre_empresa) values (:id_empresa,:nombre_empresa)";

    await BD.Open(sql, [id_empresa,nombre_empresa], true);

    sql2 = "select * from empresa";
    let result = await BD.Open(sql2, [], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "id_empresa": user[0],
            "nombre_empresa": user[1],
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);
})


//UPDATE EMPRESA
router.put("/updateEmpresa", async (req, res) => {
    const { id_empresa, nombre_empresa } = req.body;

    sql = "update empresa set id_empresa=:id_empresa, nombre_empresa=:nombre_empresa where id_empresa=:id_empresa";

    await BD.Open(sql, [id_empresa, nombre_empresa], true);

    sql2 = "select * from empresa";

    let result = await BD.Open(sql2, [], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "id_empresa": user[0],
            "nombre_empresa": user[1],
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);

})

// DELETE EMPRESA
router.delete("/deleteEmpresa/:id_empresa", async (req, res) => {
    const { id_empresa } = req.params;

    sql = "delete from empresa where id_empresa=:id_empresa";

    await BD.Open(sql, [id_empresa], true);
    
    sql2 = "select * from empresa";

    let result = await BD.Open(sql2, [], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "id_empresa": user[0],
            "nombre_empresa": user[1],
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);

})


//  LOGIN
router.post("/signup", async (req,res) =>{
    const {nombre_usuario, password_usuario} = req.body;

    sql = "select rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, empresa_id_empresa from cliente where nombre_usuario =:nombre_usuario and password_usuario=:password_usuario";

    let result = await BD.Open(sql, [nombre_usuario, password_usuario], false);

    console.log(result);

    if(result.rows.length > 0){
        res.status(200).json(
            {
                msg: true,
                Datauser: {
                    "rut_cliente": result.rows[0][0],
                    "nombre_cliente": result.rows[0][1],
                    "apellido_cliente": result.rows[0][2],
                    "tel_cliente": result.rows[0][3],
                    "nombre_usuario": result.rows[0][4],
                    "empresa_id_empresa": result.rows[0][5],

                }
            }
        );
    } else {
        res.status(201).json("Error");
    }   

    


})

router.get('/', async (req, res) => {
    sql = "select * from cliente";
    
    let result = await BD.Open(sql,[], false);
    console.log(result);

    res.status(200).json("Todo Ok")
})

module.exports = router;