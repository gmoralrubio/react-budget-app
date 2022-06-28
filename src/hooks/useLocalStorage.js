import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  // Incializa el state, pasandole una funcion
  const [value, setValue] = useState(() => {
    // Cogemos el item de local storage por key
    const jsonValue = localStorage.getItem(key)
    // Si existe el item, lo devolvemos parseado
    if (jsonValue != null) return JSON.parse(jsonValue)

    // si el valor es una funcion, lo devolvemos como tal
    // se almacena con useState()
    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  }) 
  
  // Actualizamos el valor con useEffect()
  // Cuando key o value cambia, se actualiza el localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // lo que devuelve el hook useLocalStorage
  return [value, setValue]
}