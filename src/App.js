import logo from "./logo.svg";
import "./App.css";
import CardBack from "./Components/CardBackground/CardBackground";
import React, { useState } from "react";

function FileInput() {
  const [response, setResponse] = useState(null);
  const [fileName, setFileName] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setFileName(file.name);
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = function (event) {
        const contents = event.target.result;
        if (contents) {
          // Leer la primera línea y extraer los números
          const firstLine = contents.split("\n")[0];
          let numbersAfterLength;
          let filteredNumbers;

          if (firstLine) {
            numbersAfterLength = firstLine.match(/\d+/g).map(Number);
            numbersAfterLength.shift(); // Eliminar el primer número del arreglo
          }
          // Leer la segunda línea y extraer todos los números
          const secondLine = contents.split("\n")[1];
          if (secondLine) {
            const matches = secondLine.match(/\d+/g);
            const numbers = matches.map((match) => parseInt(match));
            filteredNumbers = numbers.filter((number, index) => {
              return !numbersAfterLength.includes(index);
            });
          }
          // Leer la última línea y extraer el último número
          const lines = contents.split("\n");
          const lastLine = lines[lines.length - 1];
          if (lastLine) {
            const lastMatch = lastLine.match(/\d+/g);
            const BrianResult = parseInt(lastMatch[lastMatch.length - 1]);
            console.log("filteredNumbers: ", filteredNumbers);
            const sum = filteredNumbers.reduce((acc, curr) => {
              return acc + curr;
            }, 0);
            console.log("suma: ", sum);
            console.log("lastNumber: ", BrianResult);
            if (sum / 2 == BrianResult) {
              setResponse("Bon Appetit");
            } else if (sum / 2 < BrianResult) {
              const BowesA = BrianResult - sum / 2;
              setResponse(`Brian owes Anna: ${BowesA}`);
            } else {
              const AowesB = sum / 2 - BrianResult;
              setResponse(`Anna owes Brian: ${AowesB}`);
            }
          }
        }
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, seleccione un archivo .txt");
    }
  }

  return (
    <React.Fragment>
      <input
        type="file"
        accept="text/plain"
        id="fileInput"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      {fileName ? (
        <></>
      ) : (
        <button
          className="customButton"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Upload
        </button>
      )}
      {response && <p>Respuesta: {response}</p>}
    </React.Fragment>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CardBack childrens={<FileInput />} />
      </header>
    </div>
  );
}

export default App;
