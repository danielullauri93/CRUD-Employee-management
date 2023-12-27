const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());

/** Esto crea la conexion a la base de datos */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ferrari1993.",
  database: "empleados_crud",
});

/** Peticion para ver listado */
/** "get" = obtener de la base de datos */
app.get("/empleados", (req, res) => {
  const query = "SELECT * FROM empleados_crud.empleados";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(
        result
      ); /** "result" retorna los resultados de la base de datos */
    }
  });
});

/** Peticion de guardar */
/** "post" = enviar a la base de datos */
app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  db.query(
    "INSERT INTO empleados (nombre,edad,pais,cargo,anios) VALUE(?,?,?,?,?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Empleado registrado con éxito!");
      }
    }
  );
});

/** Peticion para actualizar */
/** "update" = actualizar los datos ingresados */
app.put("/update", (req, res) => {
  const empleadoId = req.body.id;
  const query =
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?";
  const values = [
    req.body.nombre,
    req.body.edad,
    req.body.pais,
    req.body.cargo,
    req.body.anios,
  ];
  db.query(query, [...values, empleadoId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(
        "Empleado actualizado con éxito!!"
      ); /** "json" retorna el texto */
    }
  });
});

/** Peticion para eliminar */
/** "dele" = elimina datos de la base */
app.delete("/delete/:id", (req, res) => {
  /** No olvidad que en la ruta debe ir /:id */
  const empleadoId = req.params.id; /** Tiene que ir params en ves de body */
  const query = "DELETE FROM empleados WHERE id = ?";
  db.query(query, [empleadoId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(
        result
      ); /** "result" retorna los resultados de la base de datos */
    }
  });
});

const local = 8800;
/** Esto crea la conexion de node */
app.listen(local, () => {
  console.log(`Connected to backend port: ${local}`);
});
