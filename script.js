const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const options = ["lowercase", "uppercase", "numbers", "symbols"].map(id => document.getElementById(id));
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunctions = {
  lower: () => String.fromCharCode(Math.random() * 26 + 97),
  upper: () => String.fromCharCode(Math.random() * 26 + 65),
  number: () => String.fromCharCode(Math.random() * 10 + 48),
  symbol: () => "!@#$%^&*(){}[]=<>/,."[Math.random() * 21 | 0]
};

const notify = message => {
  const notif = document.createElement("div");
  notif.className = "toast";
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

clipboardElement.addEventListener("click", () => {
  if (!resultElement.innerText) return;
  navigator.clipboard.writeText(resultElement.innerText).then(() => notify("Password copied to clipboard!"));
});

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const types = options.map(opt => opt.checked);
  resultElement.innerText = generatePassword(types, length);
});

const generatePassword = (types, length) => {
  const activeTypes = types.flatMap((t, i) => t ? Object.keys(randomFunctions)[i] : []);
  return Array.from({ length }, () => {
    const type = activeTypes[Math.random() * activeTypes.length | 0];
    return randomFunctions[type]();
  }).join('');
};
