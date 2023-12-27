import "./App.css";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2"; /** Pagina para las notificaciones vistosas: https://sweetalert2.github.io/ */

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    axios
      .post("http://localhost:8800/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso!</strong>",
          html: `<i>EL empleado/a <h6>${nombre}</h6> fue registrado.</i>`,
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const update = () => {
    axios
      .put("http://localhost:8800/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!</strong>",
          html: `<i>EL empleado/a <div><h6>${nombre}</h6></div> fue actualizado.</i>`,
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const deleteEmpleados = (val) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger m-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Deseas eliminar a ${val.nombre}?`,
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:8800/delete/${val.id}`).then(() => {
            getEmpleados();
            limpiarCampos();
            // window.location.reload();
          });
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: `Se ha eliminado a ${val.nombre}.`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Datos a salvo :)",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo eliminar!",
          footer:
            JSON.parse(JSON.stringify(err)).message === "Network Error"
              ? "Error del servidor"
              : JSON.parse(JSON.stringify(err)).message,
        });
      });
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
  };

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    axios.get("http://localhost:8800/empleados", {}).then((response) => {
      setEmpleados(response.data);
    });
  };

  getEmpleados(); /** Aparece el listado sin tener que cargar la pagina */

  return (
    <div className="container">
      <div className="App">
        <div className="lista"></div>
      </div>

      <div className="card text-center">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(
                  event.target.value
                ); /* event.target.value: de aqui de este campo yo quiero el valor */
              }}
              className="form-control"
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese una edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese un pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese un cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese los años"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEmpleados(val)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
