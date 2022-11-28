let inputs = document.querySelectorAll("input[type=number"),
  radios = document.querySelectorAll("input[type=radio"),
  btn = document.querySelector("button"),
  p = document.querySelectorAll(".price"),
  calcSpan = document.querySelectorAll(".calcSpan"),
  inputsCalc = document.querySelectorAll(".inputsCalc"),
  bill,
  numPerson,
  tipValue;

//adiciona evento ao último input
inputs[2].addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    validDatas();
  }
});

//Função que valida a entrada dos dados e verifica se eles são diferentes de 0
function validDatas() {
  let valid = [inputs[0], inputs[2]];

  for (let i = 0; i < calcSpan.length; i++) {
    calcSpan[i].textContent = "";
  }

  if (
    inputs[0].value === "0" ||
    inputs[2].value === "0" ||
    inputs[0].value === "" ||
    inputs[2].value === ""
  ) {
    // depois transformar isso em algo interativo na interface do programa
    for (let i = 0; i < valid.length; i++) {
      if (valid[i].value === "0" || valid[i].value === "") {
        calcSpan[i].textContent = "Can't be zero";
        calcSpan[i].style.color = "red";
        inputsCalc[i].style.border = "1px solid red";
      }
    }
  } else {
    bill = inputs[0].value;
    numPerson = inputs[2].value;

    tipValue = "";

    //Esse bloco de código verifica se um radio está marcado
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        tipValue = radios[i].value;
        break;
      }
    }

    if (tipValue === "") {
      if (inputs[1].value === "") {
        inputs[1].focus();
      } else {
        tipValue = inputs[1].value;
        calcBill();
      }
    } else {
      calcBill();
    }
  }
}

//Função que calcula o total dos valores
function calcBill() {
  let percentage = parseFloat(tipValue) / 100.0,
    tipAmount = parseFloat(bill) * percentage,
    tipAmountPerPerson = tipAmount / parseFloat(numPerson);

  p[0].textContent = `$${tipAmountPerPerson.toFixed(2)}`;

  let total = parseFloat(bill) + tipAmount,
    totalPerPerson = total / parseFloat(numPerson);

  p[1].textContent = `$${totalPerPerson.toFixed(2)}`;

  btn.disabled = false;
  btn.addEventListener("click", reset);
}

function reset() {
  for (let i = 0; i < inputsCalc.length; i++) {
    calcSpan[i].textContent = "";
    inputsCalc[i].style.border = "1px solid transparent";
  }
  for (let i = 0; i < p.length; i++) {
    p[i].textContent = "$0.00";
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }

  bill = "";
  tipValue = "";
  numPerson = "";

  btn.disabled = true;
}
