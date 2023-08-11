const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return `${this.nombre} ${this.apellido}, ${this.poder}`
    }
}

console.log(deadpool.getNombre())

const {nombre, apellido, poder} = deadpool;

console.log(nombre, apellido, poder)

const heroes = ['Deadpool', 'Superman', 'Batman']

const [, h2, ,] = heroes

console.log(h2)