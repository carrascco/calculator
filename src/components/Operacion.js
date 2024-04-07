import { useState, useEffect } from "react";

export default function Operacion(props) {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userInput, setUserInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [message, setMessage] = useState('');
  const [operacion, setOperacion] = useState('');

  // Resetea los numeros cuando cambia la operacion (se pincha una en la navbar)
  useEffect(() => {
    resetearNumeros();
  }, [props.op]);

  useEffect(() => {
    if (props.op === '+') {
      setOperacion('Suma');
      setCorrectAnswer(num1 + num2);
    } else if (props.op === '-') {
      setOperacion('Resta');
      setCorrectAnswer(num1 - num2);
    } else if (props.op === '/') {
      setOperacion('Divide');
      const newNum2 = generateRandomNumber(2, 10); 
      const newNum1 = newNum2 * generateRandomNumber(1, 10); //De esta manera nos aseguramos que siempre sea una division sin resto
      setNum1(newNum1);
      setNum2(newNum2);
      setCorrectAnswer(newNum1 / newNum2);
    } else if (props.op === '*') {
      setOperacion('Multiplica');
      const newNum2 = generateRandomNumber(1,10); 
      const newNum1 = newNum2 * generateRandomNumber(1, 10); 
      setNum1(newNum1);
      setNum2(newNum2);
      setCorrectAnswer(newNum1 * newNum2);
    }
  }, [props.op, num1, num2]);

  const resetearNumeros = () => {
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setUserInput('');
  };

  const checkAnswer = () => {
    if (parseInt(userInput) === correctAnswer) {
      setMessage('😀¡Respuesta correcta!😀');
      resetearNumeros();

      //Esperamos 2.5s y limpiamos el mensaje
      setTimeout(() => {
        setMessage('');
      }, 2500);
    } else {
      setMessage('💀Respuesta incorrecta💀. Inténtalo de nuevo.');
    }
  };

  function generateRandomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div>
      <h2>{operacion} los siguientes números:</h2>
      <p>{num1} {props.op} {num2}</p>
      <input type="number" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button className="btn" onClick={checkAnswer}>Comprobar</button>
      <p>{message}</p>
    </div>
  );
}
