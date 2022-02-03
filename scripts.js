const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Persistindo dados
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //Formatando o display
  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //Definindo metodo para o botão delete
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //Método responsavel por fazer os calculos
  calculate() {
    let result;

    //Transformando as variáveis em float
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    //Checando se a variável é um numero
    if (isNaN(_currentOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //  Recebendo e guardadndo operadores
  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    // Se o previousOperand estiver vazio ele calcula
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;

    // Coloca o current como previous assim que um operador é selecionado
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  //Metodo para quando clicar em números
  appendNumber(number) {
    //Não permite que o valor . seja didigtado mais de uma vez
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  // Limpa o previous e o current
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  // Atualiza os elemntos de texto
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

//Cria classe com os valores de parametro
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Chamando o metodo appendNumber e adiciona o valor digitado ao parameetro number
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

// Chama o chooseOperation no click de um operator
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}
//adiciona o evento de limpar o texto com obotão AC
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

//Botão de igual ativa o metodo calculate e mostra o resultado no current
equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

// Ativando o metodo delete do botão DEL
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
