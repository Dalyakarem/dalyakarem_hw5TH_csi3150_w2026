
const carList = document.getElementById("carList");
const filterForm = document.getElementById("filterForm");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const makeOptions = document.getElementById("makeOptions");
const colorOptions = document.getElementById("colorOptions");

showCars(usedCars);


makeMakeOptions();
makeColorOptions();


function showCars(cars) {
  carList.innerHTML = "";

  if (cars.length === 0) {
    message.textContent = "No cars match your filters. Please try again.";
    return;
  }

  message.textContent = "Showing " + cars.length + " car(s).";

  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];

    let card = document.createElement("article");
    card.className = "car-card";

    card.innerHTML = `
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p><strong>Color:</strong> ${car.color}</p>
      <p><strong>Mileage:</strong> ${car.mileage} miles</p>
      <p><strong>Gas Mileage:</strong> ${car.gasMileage}</p>
      <p class="price">$${car.price}</p>
    `;

    carList.appendChild(card);
  }
}


function makeMakeOptions() {
  let makes = [];

  for (let i = 0; i < usedCars.length; i++) {
    if (!makes.includes(usedCars[i].make)) {
      makes.push(usedCars[i].make);
    }
  }

  for (let i = 0; i < makes.length; i++) {
    makeOptions.innerHTML += `
      <label>
        <input type="checkbox" name="make" value="${makes[i]}">
        ${makes[i]}
      </label>
    `;
  }
}


function makeColorOptions() {
  let colors = [];

  for (let i = 0; i < usedCars.length; i++) {
    if (!colors.includes(usedCars[i].color)) {
      colors.push(usedCars[i].color);
    }
  }

  for (let i = 0; i < colors.length; i++) {
    colorOptions.innerHTML += `
      <label>
        <input type="checkbox" name="color" value="${colors[i]}">
        ${colors[i]}
      </label>
    `;
  }
}


filterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let minYear = document.getElementById("minYear").value;
  let maxYear = document.getElementById("maxYear").value;
  let maxMileage = document.getElementById("maxMileage").value;
  let minPrice = document.getElementById("minPrice").value;
  let maxPrice = document.getElementById("maxPrice").value;

  let checkedMakes = document.querySelectorAll('input[name="make"]:checked');
  let checkedColors = document.querySelectorAll('input[name="color"]:checked');

  let selectedMakes = [];
  let selectedColors = [];

  for (let i = 0; i < checkedMakes.length; i++) {
    selectedMakes.push(checkedMakes[i].value);
  }

  for (let i = 0; i < checkedColors.length; i++) {
    selectedColors.push(checkedColors[i].value);
  }

  let filteredCars = usedCars.filter(function (car) {
    let yearMatch = true;
    let mileageMatch = true;
    let priceMatch = true;
    let makeMatch = true;
    let colorMatch = true;

    if (minYear !== "" && car.year < Number(minYear)) {
      yearMatch = false;
    }

    if (maxYear !== "" && car.year > Number(maxYear)) {
      yearMatch = false;
    }

    if (maxMileage !== "" && car.mileage > Number(maxMileage)) {
      mileageMatch = false;
    }

    if (minPrice !== "" && car.price < Number(minPrice)) {
      priceMatch = false;
    }

    if (maxPrice !== "" && car.price > Number(maxPrice)) {
      priceMatch = false;
    }

    if (selectedMakes.length > 0 && !selectedMakes.includes(car.make)) {
      makeMatch = false;
    }

    if (selectedColors.length > 0 && !selectedColors.includes(car.color)) {
      colorMatch = false;
    }

    return yearMatch && mileageMatch && priceMatch && makeMatch && colorMatch;
  });

  showCars(filteredCars);
});


resetBtn.addEventListener("click", function () {
  filterForm.reset();
  showCars(usedCars);
});