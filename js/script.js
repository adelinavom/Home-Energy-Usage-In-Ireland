/* ========================================
   KYRYLO: HOME ENERGY COST CALCULATOR
   ======================================== */

const calculatorForm = document.getElementById("energyCalculator");
const electricityUsageInput = document.getElementById("electricityUsage");
const electricityPriceInput = document.getElementById("electricityPrice");
const errorMessage = document.getElementById("errorMessage");
const calculatorResult = document.getElementById("calculatorResult");

/*
    This check prevents errors if script.js is loaded
    on a page that does not contain the calculator.
*/
if (calculatorForm) {
    calculatorForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearMessages();

        const electricityUsage = parseFloat(electricityUsageInput.value);
        const electricityPrice = parseFloat(electricityPriceInput.value);

        if (
            electricityUsageInput.value.trim() === "" ||
            electricityPriceInput.value.trim() === ""
        ) {
            showError("Please complete both fields before calculating.");
            return;
        }

        if (
            Number.isNaN(electricityUsage) ||
            Number.isNaN(electricityPrice)
        ) {
            showError("Please enter valid numeric values.");
            return;
        }

        if (electricityUsage < 0 || electricityPrice < 0) {
            showError("Values cannot be negative.");
            return;
        }

        if (electricityUsage === 0) {
            showError("Monthly electricity consumption must be greater than zero.");
            return;
        }

        if (electricityPrice === 0) {
            showError("Electricity unit price must be greater than zero.");
            return;
        }

        const monthlyCost = electricityUsage * electricityPrice;
        const annualCost = monthlyCost * 12;
        const annualConsumption = electricityUsage * 12;

        calculatorResult.innerHTML = `
            <h2>Estimated Results</h2>

            <p>
                Monthly electricity cost:
                <span class="result-value">
                    €${monthlyCost.toFixed(2)}
                </span>
            </p>

            <p>
                Annual electricity cost:
                <span class="result-value">
                    €${annualCost.toFixed(2)}
                </span>
            </p>

            <p>
                Annual electricity consumption:
                <span class="result-value">
                    ${annualConsumption.toFixed(2)} kWh
                </span>
            </p>
        `;

        calculatorResult.classList.add("visible");
    });

    calculatorForm.addEventListener("reset", function () {
        clearMessages();
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("visible");
    calculatorResult.classList.remove("visible");
    calculatorResult.innerHTML = "";
}

function clearMessages() {
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");

    calculatorResult.innerHTML = "";
    calculatorResult.classList.remove("visible");
}