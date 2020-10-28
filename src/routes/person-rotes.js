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
            "EMPRESA_ID_EMPRESA": user[6],
            "TIPO_USUARIO": user[7]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE USUARIO
router.post('/addUser', async (req, res) => {
    const { rut_cliente, nombre_cliente, apellido_cliente,  tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa} = req.body;

    sql = "insert into cliente(rut_cliente,nombre_cliente,apellido_cliente,tel_cliente,nombre_usuario,password_usuario,empresa_id_empresa, tipo_usuario) values (:rut_cliente,:nombre_cliente,:apellido_cliente, :tel_cliente,:nombre_usuario,:password_usuario,:empresa_id_empresa, 1)";

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
            "EMPRESA_ID_EMPRESA": user[6],
            "TIPO_USUARIO": user[7]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//UPDATE USUARIO
router.put("/updateUser", async (req, res) => {
    const { rut_cliente, nombre_cliente, apellido_cliente,  tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa, tipo_usuario } = req.body;

    sql = "update cliente set nombre_cliente=:nombre_cliente, apellido_cliente=:apellido_cliente, tel_cliente=:tel_cliente, nombre_usuario=:nombre_usuario, password_usuario=:password_usuario, empresa_id_empresa=:empresa_id_empresa tipo_ususario=:tipo_usuario where rut_cliente=:rut_cliente";

    await BD.Open(sql, [rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, password_usuario, empresa_id_empresa, tipo_usuario], true);

    sql2 = "select * from cliente";

    let result = await BD.Open(sql2, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "rut_cliente": user[0],
            "NOMBRE_CLIENTE": user[1],
            "APELLIDO_CLIENTE": user[2],
            "TEL_CLIENTE": user[3],
            "NOMBRE_USUARIO": user[4],
            "PASSWORD_USUARIO": user[5],
            "EMPRESA_ID_EMPRESA": user[6],
            "TIPO_USUARIO": user[6],
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

    sql = "select rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, empresa_id_empresa, tipo_usuario from cliente where nombre_usuario =: nombre_usuario and password_usuario =:password_usuario";

    let result = await BD.Open(sql, [nombre_usuario, password_usuario], false);

    console.log(result.rows);


    if (result.rows.length > 0){
        res.status(201).json({
            msg: true,
            Datauser: {
                "rut_cliente": result.rows[0][0],
                "nombre_cliente": result.rows[0][1],
                "apellido_cliente": result.rows[0][2],
                "tel_cliente": result.rows[0][3],
                "nombre_usuario": result.rows[0][4],
                "empresa_id_empresa": result.rows[0][5],
                "tipo_usuario": result.rows[0][6]
            }

        });
    } else {
        res.status(201).json("Error")
    }


    // if(result.rows.length > 0){
    //     res.status(200).json(
    //         {
    //             msg: true,
    //             Datauser: {
    //                 "rut_cliente": result.rows[0][0],
    //                 "nombre_cliente": result.rows[0][1],
    //                 "apellido_cliente": result.rows[0][2],
    //                 "tel_cliente": result.rows[0][3],
    //                 "empresa_id_empresa": result.rows[0][4]

    //             }
    //         }
    //     );
    // } else {
    //     res.status(201).json("Error");
    // }
})


//     ------------------------------ TODO:  --------------------
//     ------------------------------ CAPACITACION --------------------
// CREATE TABLE capacitacion (
//     id_capacitacion                  NUMBER NOT NULL,
//     fecha_visita                     DATE NOT NULL,
//     desc_capacitacion                VARCHAR2(100) NOT NULL, 
//     registro_accidente_id_accidente  NUMBER NOT NULL,
//     profesional_rut_profesional      NUMBER NOT NULL
// );
// READ CAPACITACION
// CREATE CAPACITACION
// UPDATE CAPACITACION
// DELETE CAPACITACION

//     ------------------------------ REGISTRO_ACCIDENTE --------------------
// CREATE TABLE registro_accidente (
//     id_accidente            NUMBER NOT NULL,
//     descripcion_acc         VARCHAR2(200) NOT NULL,
//     fecha_accidente         DATE NOT NULL,
//     cliente_rut_cliente     NUMBER NOT NULL,
//     cliente_nombre_usuario  VARCHAR2(50) NOT NULL
// );


// READ REGISTRO_ACCIDENTE
router.get('/getAccidentes', async (req, res) => {
    sql = "select * from registro_accidente";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_accidente": user[0],
            "descripcion_acc": user[1],
            "fecha_accidente": user[2],
            "cliente_rut_cliente": user[3],
            "cliente_nombre_usuario": user[4]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})


// GET ACCIDENTE POR ID
router.get('/getAccidente/:cliente_nombre_usuario', async (req, res) => {
    const { cliente_nombre_usuario } = req.params;

    sql = "select * from registro_accidente where cliente_nombre_usuario=:cliente_nombre_usuario order by id_accidente";

    await BD.Open(sql, [cliente_nombre_usuario], false);
    
    sql2 = "select * from registro_accidente where cliente_nombre_usuario=:cliente_nombre_usuario order by id_accidente";

    let result = await BD.Open(sql2, [cliente_nombre_usuario], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "id_accidente": user[0],
            "descripcion_acc": user[1],
            "fecha_accidente": user[2],
            "cliente_rut_cliente": user[3],
            "cliente_nombre_usuario": user[4]
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);
})
// CREATE REGISTRO_ACCIDENTE
router.post('/addAccidente', async (req, res) => {
    const {descripcion_acc, fecha_accidente, cliente_rut_cliente, cliente_nombre_usuario} = req.body;

    sql = "insert into registro_accidente(id_accidente, descripcion_acc, fecha_accidente, cliente_rut_cliente, cliente_nombre_usuario) values (id_accidente.nextval, :descripcion_acc, TO_DATE(:fecha_accidente, 'yyyy/mm/dd'), :cliente_rut_cliente, :cliente_nombre_usuario)";

    await BD.Open(sql, [descripcion_acc, fecha_accidente, cliente_rut_cliente, cliente_nombre_usuario], true);

    sql2 = "select * from registro_accidente";
    let result = await BD.Open(sql2, [], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "descripcion_acc": user[0],
            "fecha_accidente": user[1],
            "cliente_rut_cliente": user[2],
            "cliente_nombre_usuario": user[3],
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);
})
// UPDATE REGISTRO_ACCIDENTE
router.put("/updateAccidente", async (req, res) => {
    const { id_accidente, descripcion_acc, fecha_accidente, cliente_rut_cliente, cliente_nombre_usuario } = req.body;

    sql = "update registro_accidente set id_accidente=:id_accidente,descripcion_acc=:descripcion_acc, fecha_accidente=:fecha_accidente, cliente_rut_cliente=:cliente_rut_cliente, cliente_nombre_usuario=:cliente_nombre_usuario  where id_accidente=:id_accidente";

    await BD.Open(sql, [id_accidente, descripcion_acc, fecha_accidente, cliente_rut_cliente, cliente_nombre_usuario], true);

    sql2 = "select * from registro_accidente";

    let result = await BD.Open(sql2, [], false);
    Empresas = [];

    result.rows.map(user => {
        let EmpresaSchema = {
            "id_accidente": user[0],
            "descripcion_acc": user[1],
            "fecha_accidente": user[2],
            "cliente_rut_cliente": user[3],
            "cliente_nombre_usuario": user[4],
        }
        Empresas.push(EmpresaSchema);
    })

    res.json(Empresas);

})
// DELETE REGISTRO_ACCIDENTE

//     ------------------------------ PROFESIONAL --------------------
// CREATE TABLE profesional (
//     rut_profesional       NUMBER NOT NULL,
//     nombre_profesional    VARCHAR2(50) NOT NULL,
//     apellido_profesional  VARCHAR2(50) NOT NULL,
//     tel_profesional       NUMBER
// );
// READ PROFESIONAL
// CREATE PROFESIONAL
// UPDATE PROFESIONAL
// DELETE PROFESIONAL

router.get('/', async (req, res) => {
    sql = "select * from cliente";
    
    let result = await BD.Open(sql,[], false);
    console.log(result);

    res.status(200).json("Todo Ok")
})

module.exports = router;