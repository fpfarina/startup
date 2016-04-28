"use strict";

class Video {
  constructor(title, year, duration) {
    this._title = title;
    this._year = year;
    this._duration = duration;
  }

  get title() {
    return this._title;
  }

  get year() {
    return this._year;
  }
  get duration() {
    return this._duration;
  }

  set title(newTitle) {
    this._title = newTitle;
  }
  set year(newYear) {
    this._year = year;
  }
  set duration(newDuration) {
    this._duration = duration;
  }

  play() {
    return 'Play film.';
  }
  pause() {
    return 'Pause film.';
  }
  resume() {
    return 'Resume film.';
  }
}

var api = {
  foo: 'bar',
  baz: 'ponyfoo'
};

export default api;

let PulpFiction = new Video('Pulp Fiction', 1994, 152);
console.log(`${ PulpFiction.title } - ${ PulpFiction.year } - ${ PulpFiction.duration }`);

/* FUNCIONES CON MULTIPLES PARAMETROS */

function sumar(a, b, ...c) {
  let resultado = a + b;

  c.forEach(n => {
    resultado += n;
  });

  return resultado;
}

console.log(sumar(1, 2));
console.log(sumar(1, 2, 3));
console.log(sumar(1, 2, 3, 4));
console.log(sumar(1, 2, 3, 4, 5));

/* FUNCIONES CON PARAMETROS POR DEFECTO */

function nombre(nombre, tituloHonorifico = "Don") {
  return `${ tituloHonorifico } ${ nombre }`;
}

console.log(nombre("Hernan"));
console.log(nombre("Ruben", "Doña"));

let pepito = {
  saludar(persona) {
    return `Hola ${ persona.honorifico } ${ persona.nombre }`;
  }
};
console.log(pepito.saludar({ nombre: 'Jose', honorifico: 'Don' }));

/* USANDO PROMISES EN ECMA 6 */

function obtenerDatos() {
  return new Promise((resolve, reject) => {
    let n = Math.floor(Math.random() * 2) + 1;

    setTimeout(() => {
      if (n === 1) resolve('Datos obtenidos');else reject(new Error('Hubo un error al obtener los datos'));
    }, 500);
  });
}

obtenerDatos().then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
});

/* FUNCIONES GENERADORAS */

function* fibonacci() {
  let anterior = 0,
      actual = 1;
  while (true) {
    let temp = anterior;
    anterior = actual;
    actual += temp;
    yield actual;
  }
}

let fibo = fibonacci();

for (let i = 0; i < 5; i++) {
  console.log(fibo.next());
}