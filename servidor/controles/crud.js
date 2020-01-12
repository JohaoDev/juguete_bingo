let config = require("../knexfile");
let env = "development";
let db = require("knex")(config[env]);

let getDatos = (req, res) => {
  let tabla = req.query.tabla;
  let campo = req.query.campo;
  db.select(campo)
    .from(tabla)
    .then(resultado => {
      return res.status(200).json({
        ok: true,
        datos: resultado
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

let postDatos = (req, res) => {
  let tabla = req.body.tabla;
  let datos = req.body.datos;
  db(tabla)
    .insert(datos)
    .then(resultado => {
      return res.status(200).json({
        ok: true,
        datos: resultado
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

let updateDatos = (req, res) => {
  let tabla = req.body.tabla;
  let datos = req.body.datos;
  datos.forEach(element => {
    db(tabla)
      .where("id", element.id)
      .update(element)
      .then(resultado => {
        return res.status(200).json({
          ok: true,
          datos: resultado
        });
      })
      .catch(error => {
        return res.status(500).json({
          ok: false,
          datos: null,
          mensaje: `Error del servidor: ${error}`
        });
      });
  });
};

let deleteDatos = (req, res) => {
  let tabla = req.query.tabla;
  let id = req.query.id;
  db(tabla)
    .where("id", id)
    .delete()
    .then(resultado => {
      return res.status(200).json({
        ok: true,
        datos: resultado
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

let getDatosbyID = (req, res) => {
  let tabla = req.query.tabla;
  let campo = req.query.campo;
  let id = req.query.id;
  db.select(campo)
    .from(tabla)
    .where("id", id)
    .then(resultado => {
      return res.status(200).json({
        ok: true,
        datos: resultado
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

let login = (req, res) => {
  let tabla = "persona";
  let correo = req.body.correo;
  let clave = req.body.clave;
  let campo = req.query.campo;

  db.select(campo)
    .from(tabla)
    .then(resultado => {
      resultado.forEach(element => {
        if (element.persona_email == correo && element.persona_clave == clave) {
          if ( element.persona_email == correo ) {
            if ( element.persona_clave == clave ) {
              res.status(200).json({
                ok: true,
                mensaje: "loggeded"
              });
            }
          }
          res.status(200).json({
            ok: true,
            mensaje: "loggeded"
          });
        } else {
          res.status(500).json({
            ok: false,
            mensaje: "inc"
          });
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        datas: null
      });
    });
};

module.exports = {
  getDatos,
  postDatos,
  updateDatos,
  deleteDatos,
  getDatosbyID,
  login
};
