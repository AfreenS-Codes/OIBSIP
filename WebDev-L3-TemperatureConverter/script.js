/* =========================================================
   ELEMENT REFERENCES
========================================================= */
const form = document.getElementById("converterForm");
const tempInput = document.getElementById("tempInput");
const unitSelect = document.getElementById("unitSelect");
const errorMessage = document.getElementById("errorMessage");

const resultCards = {
  C: document.getElementById("cardC"),
  F: document.getElementById("cardF"),
  K: document.getElementById("cardK"),
};
const resultValues = {
  C: document.getElementById("valueC"),
  F: document.getElementById("valueF"),
  K: document.getElementById("valueK"),
};

/* Absolute zero limits, keyed by unit */
const ABSOLUTE_ZERO = { C: -273.15, F: -459.67, K: 0 };

/* =========================================================
   HELPERS
========================================================= */

// Show / clear inline error without shifting layout (space reserved via CSS)
function showError(message){
  errorMessage.textContent = message;
  errorMessage.classList.add("visible");
  tempInput.classList.add("input-error");
}

function clearError(){
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");
  tempInput.classList.remove("input-error");
}

// Convert a value in `fromUnit` to Celsius, Fahrenheit, and Kelvin
function convertAll(value, fromUnit){
  let celsius;

  if (fromUnit === "C") celsius = value;
  else if (fromUnit === "F") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15; // Kelvin -> Celsius

  const fahrenheit = celsius * (9 / 5) + 32;
  const kelvin = celsius + 273.15;

  return {
    C: round2(celsius),
    F: round2(fahrenheit),
    K: round2(kelvin),
  };
}

function round2(num){
  return Math.round(num * 100) / 100;
}

// Reset result cards to placeholder state (used on error)
function resetResults(){
  Object.values(resultValues).forEach(el => (el.textContent = "—"));
  Object.values(resultCards).forEach(card => {
    card.classList.remove("visible", "active-unit");
  });
}

/* =========================================================
   MAIN CONVERSION HANDLER
========================================================= */
function handleConvert(){
  const rawValue = tempInput.value.trim();
  const unit = unitSelect.value;

  // 1. Empty input check
  if (rawValue === ""){
    showError("Please enter a temperature value.");
    resetResults();
    return;
  }

  // 2. Numeric validation (rejects letters, symbols, multiple decimals, etc.)
  const numericPattern = /^-?\d+(\.\d+)?$/;
  if (!numericPattern.test(rawValue)){
    showError("Please enter a valid numeric value.");
    resetResults();
    return;
  }

  const value = parseFloat(rawValue);

  // 3. Absolute zero validation, checked against the limit for the chosen unit
  if (value < ABSOLUTE_ZERO[unit]){
    showError("Temperature cannot be below absolute zero.");
    resetResults();
    return;
  }

  // All checks passed
  clearError();
  const converted = convertAll(value, unit);

  resultValues.C.textContent = `${converted.C} °C`;
  resultValues.F.textContent = `${converted.F} °F`;
  resultValues.K.textContent = `${converted.K} K`;

  // Fade the result cards in, staggered slightly for a subtle premium feel
  Object.entries(resultCards).forEach(([key, card], index) => {
    card.classList.remove("active-unit");
    setTimeout(() => card.classList.add("visible"), index * 80);
  });

  // Highlight the card matching the chosen input unit
  resultCards[unit].classList.add("active-unit");
}

/* =========================================================
   EVENTS
========================================================= */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleConvert();
});

// Clear error as soon as the user starts correcting their input
tempInput.addEventListener("input", () => {
  if (errorMessage.classList.contains("visible")){
    clearError();
  }
});

// Enter key already triggers submit via the form, but keep an explicit
// listener too in case the input is ever used outside a <form> context.
tempInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){
    e.preventDefault();
    handleConvert();
  }
});