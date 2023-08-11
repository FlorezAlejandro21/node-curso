const getUsuarioById = (id, callback) => {
  const usuario = {
    id,
    nombre: "Alejandro",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1500);
};

getUsuarioById(1, (usuario) => {
  console.log("---------------------");
  console.log(`${usuario.nombre} tiene el id: ${usuario.id}`);
});

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

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre;
  return empleado
    ? callback(null, empleado)
    : callback("El empleado no existe");
};

const getSalario = (id, callback) => {
  const salario = salarios.find((s) => s.id === id)?.salario;
  return salario
    ? callback(null, salario)
    : callback(`El empelado con id: ${id}, no tiene salario`);
};

const id = 2;
// getEmpleado(id, (err, empleado) => {
//   if (err) {
//     console.log("ERROR");
//     return console.log(err);
//   }
//   console.log(empleado);
// });

// getSalario(id, (err, salario)=>{
//     if (err) {
//         console.log("ERROR");
//         return console.log(err);
//       }
//       console.log(salario);
// })

getEmpleado(id, (err, empleado) => {
  if (err) {
    return console.log(err);
  }
  getSalario(id, (err, salario) => {
    if (err) {
      return console.log(err);
    }
    console.log("El empleado:", empleado, "tiene un salario de:", salario);
  });
});
