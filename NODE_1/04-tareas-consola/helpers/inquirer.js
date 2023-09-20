import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?, selecciona:",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear una tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar una tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("========================".green);
  console.log(" Seleccione una opcion".white);
  console.log("========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const inquirerContinue = async () => {
  const continua = await inquirer.prompt([
    {
      type: "input",
      name: "entrada",
      message: `Presione ${"ENTER".green} para continuar\n`,
    },
  ]);
  return continua;
};

const readInput = async (message) => {
  const questions = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor ingresa un valor";
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(questions);
  return desc;
};

const listDelete = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = colors.green(1 + i);
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.descripcion}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0.".green} Cancelar`,
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confrimDelete = async (message) => {
  const preguntas = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(preguntas);
  return ok;
};

const showCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = colors.green(1 + i);
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.descripcion}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

export {
  inquirerMenu,
  inquirerContinue,
  readInput,
  listDelete,
  confrimDelete,
  showCheckList,
};
