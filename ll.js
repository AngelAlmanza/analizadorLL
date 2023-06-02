function validarCadena(cadena) {
  // Agregar $ al final de la cadena
  cadena = cadena + "$";

  // Pila de análisis
  const pila = ["$", "E"];

  // Siguiente símbolo de entrada
  let simboloEntrada = cadena[0];

  // Definición de la tabla de análisis sintáctico
  const tabla = {
    E: {
      "(": ["T", "E'"],
      i: ["T", "E'"],
    },
    "E'": {
      "+": ["+", "T", "E'"],
      ")": [],
      $: [],
    },
    T: {
      "(": ["F", "T'"],
      i: ["F", "T'"],
    },
    "T'": {
      "+": [],
      "*": ["*", "F", "T'"],
      ")": [],
      $: [],
    },
    F: {
      "(": ["(", "E", ")"],
      i: ["i"],
    },
  };

  // Proceso de análisis
  while (pila.length > 0) {
    const simboloTope = pila[pila.length - 1];

    if (simboloTope === simboloEntrada) {
      // Coinciden el símbolo de la pila y el símbolo de entrada, avanzar ambos
      pila.pop();
      cadena = cadena.slice(1);
      simboloEntrada = cadena[0];
    } else if (simboloTope in tabla && simboloEntrada in tabla[simboloTope]) {
      // Obtener producción de la tabla
      const produccion = tabla[simboloTope][simboloEntrada];

      // Reemplazar no terminal en la pila por la producción
      pila.pop();

      if (produccion.length > 0) {
        const produccionArray = produccion.slice().reverse();
        pila.push(...produccionArray);
      }
    } else {
      // No se encontró coincidencia, la cadena no es válida
      return false;
    }
  }

  // Si la cadena se analizó completamente y la pila está vacía, es válida
  return cadena === "$" && pila.length === 0;
}

// Ejemplo de uso
const cadena1 = "i+i*i$";
const cadena2 = "(i+i)*i$";

console.log(validarCadena(cadena1)); // Devuelve true
console.log(validarCadena(cadena2)); // Devuelve true
