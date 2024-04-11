import { useState, useEffect } from "react";
//import './style.css';
export default function Operacion(props) {
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [message, setMessage] = useState('');
  const [operacion, setOperacion] = useState('');
  const [dificultad, setDificultad] = useState('facil');

  // Función para generar un número aleatorio dentro de un rango
  function generateRandomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Función para actualizar los números y la respuesta correcta
  const actualizarEstados = (operacion, dificultad) => {
    let min, max, nuevoNum1, nuevoNum2, respuesta;
    if (dificultad === 'facil') {
      min = 1; max = 20;
    } else {
      min = 100; max = 300;
    }

    switch (operacion) {
      case '+':
        nuevoNum1 = generateRandomNumber(min, max);
        nuevoNum2 = generateRandomNumber(min, max);
        respuesta = nuevoNum1 + nuevoNum2;
        setOperacion('Suma');
        break;
      case '-':
        nuevoNum1 = generateRandomNumber(min, max);
        nuevoNum2 = generateRandomNumber(min, max);
        respuesta = nuevoNum1 - nuevoNum2;
        setOperacion('Resta');
        break;
      case '/':
        // Aseguramos que el resultado de la división sea un número entero
        nuevoNum2 = generateRandomNumber(2, 10); 
        nuevoNum1 = nuevoNum2 * generateRandomNumber(1, dificultad === 'facil' ? 10 : 100);
        respuesta = nuevoNum1 / nuevoNum2;
        setOperacion('Divide');
        break;
      case '*':
        nuevoNum1 = generateRandomNumber(min, max);
        nuevoNum2 = generateRandomNumber(min, max);
        respuesta = nuevoNum1 * nuevoNum2;
        setOperacion('Multiplica');
        break;
      default:
        respuesta = null;
    }
    setNum1(nuevoNum1);
    setNum2(nuevoNum2);
    setCorrectAnswer(respuesta);
  };

  // Efecto para manejar el cambio de operación o dificultad
  useEffect(() => {
    actualizarEstados(props.op, dificultad);
  }, [props.op, dificultad]);

  // Función para resetear los números y la entrada del usuario
  const resetearNumeros = () => {
    actualizarEstados(props.op, dificultad);
    setUserInput('');
  };

  // Función para comprobar la respuesta del usuario
  const checkAnswer = () => {
    if (parseInt(userInput) === correctAnswer) {
      setMessage('😀¡Respuesta correcta!😀');
      resetearNumeros();

      // Esperamos 2.5s y limpiamos el mensaje
      setTimeout(() => {
        setMessage('');
      }, 2500);
    } else {
      setMessage('💀Respuesta incorrecta💀. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>{operacion} los siguientes números:</h2>
      <p>Dificultad: {dificultad}</p>
      <select
      className="select-estilizado"
      value={dificultad}
      onChange={(e) => setDificultad(e.target.value)}
      >
        <option value="facil">Fácil</option>
        <option value="dificil">Difícil</option>
      </select>
      <p>{`${num1} ${props.op} ${num2}`}</p>
      <input type="number" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button className="btn" onClick={checkAnswer}>Comprobar</button>
      <p>{message}</p>
    </div>
  );
}
