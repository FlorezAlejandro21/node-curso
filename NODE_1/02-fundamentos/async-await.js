const empleados = [
  {
    id: 1,
    nombre: "Alejandro",
  },
  {
    id: 2,
    nombre: "Luis",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
];

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario ? resolve(salario) : reject(`No existe salario para el id: ${id}`);
  });
};

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? resolve(empleado) : reject(`No existe empleado con id: ${id}`);
  });
};

const getInfoUsuario = async (id) => {
  try {
    const empelado = await getEmpleado(id);
    return empelado;
  } catch (error) {
    return error;
  }
};

const id = 11;
getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
