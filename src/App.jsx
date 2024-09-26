import "./App.css"
import React from "react"
import { useState } from "react"
function App() {

  const [number1, setNumber1] = useState('') 
  const [number2, setNumber2] = useState('')
  const [operator, setOperator] = useState('')
  const [result, setResult] = useState('')
  const [store, setStore] = useState([])

  const handleStore = () => { 
    if(result != null){
      setStore((prevStore) => [...prevStore, result])
    }
    handleClearInut
  }



  const handleNumberInput = (num, isNumber2 = false) => {
    if (isNumber2) {
      setNumber2((prev) => {
        // Handle decimal point input
        if (num === ".") {
          if (prev.includes(".")) {
            return prev; // Ignore if decimal already exists
          }
          return prev === "" ? "0." : prev + "."; // Add leading zero if no number yet
        }
        return prev + num; // Concatenate the number
      });
    } else {
      setNumber1((prev) => {
        // Handle decimal point input
        if (num === ".") {
          if (prev.includes(".")) {
            return prev; // Ignore if decimal already exists
          }
          return prev === "" ? "0." : prev + "."; // Add leading zero if no number yet
        }
        return prev + num; // Concatenate the number
      });
    }
  };
  

  const handleOperatorInput = (op) => {
  setOperator(op);
  }
  const handleClearInut = () => { 
    setNumber1('');
    setNumber2('');
    setOperator('');
    setResult('');

  };
  const calculateResult = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    if(!isNaN(number1) && !isNaN(number2)) {
      let res = 0;
      switch(operator){
        case '+':
          res = num1 + num2;
          break;
        case '-':
          res = num1 - num2;
          break;
        case '*': 
          res = num1 * num2;
          break;
        case '÷': 
          res = num1 / num2;
          break;
          default: 
          res = 0;
      }
      setResult(parseFloat(res));
}
  };
  return (
    <div className="calculator">
      <div className="panel">
        <p>{number1 || '0'}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberInput(num, false)}>
              {num}
              </button>
          ))}
          <button onClick={()=> handleNumberInput('.',false)}>.</button>
          <button onClick={handleClearInut}>Clear</button>
        </div>
      </div>

      <div className="panel">
        <p>{ operator || '+'}</p>
        <div className="numbers">
          {['+', '-', '*', '÷'].map((op) => (
            <button key={op} onClick={() => handleOperatorInput(op)}>
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{number2 || '0'}</p>
        <div className="numbers">
          {[1,2,3,4,5,6,7,8,9].map((num) => (
            <button
            key = {num}
            onClick = {() => handleNumberInput(num, true)}
            >
              {num}
            </button>
          ))}
          <button onClick={ ()=>handleNumberInput('.',true)}>.</button>
          <button
          onClick={handleClearInut}
          >Clear</button>
        </div>
      </div>
      <div className="panel answer">
        <p>{result || '0'}</p>
        <div>
          <button onClick={calculateResult}>=</button>
          <button onClick={handleStore}>Store Result</button>
        </div>
      </div>
      <div className="panel result">
          <h3>Stored results : </h3>
          <ul>
          {store.map((res, index) => (
            <li key = {index}>{res}</li>
          ))}
          </ul>
      </div>
    </div>
  )
}

export default App
