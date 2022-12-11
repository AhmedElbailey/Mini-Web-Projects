const movieInput = document.querySelector(".movie-select-input");
const seatsNumText = document.querySelector(".seats-number");
const totalPriceText = document.querySelector(".total-price");
const nonOccupiedSeats = Array.from(
  document.querySelectorAll(".seat-available")
);
const btnConfirm = document.querySelector(".btn-confirm");
const btnClear = document.querySelector(".btn-cancel");
const confirmMessage = document.querySelector(".confirm-message");
const allMoviesSeats = document.querySelector(".all-movies");
const allMovies = Array.from(document.querySelectorAll(".movie-seats"));

let seatsContainer = document.querySelector(".active ");
let movieName = getMovieName();
let ticketPrice = getTicketPrice();

let seatsNum = 0;
////////////////////////////////////////////////
// FUNCTIONS
function getTicketPrice() {
  return movieInput.value.split("-").slice(-1)[0];
}

function getMovieName() {
  return movieInput.value
    .split("-")
    .slice(0, -1)
    .join(" ")
    .toLowerCase()
    .trim();
}

function renderMovieSeats(movieName) {
  // Selecting and rendering current movie seats
  allMovies.forEach((movie) => {
    if (movie.dataset.movieName === movieName) {
      movie.classList.remove("hidden-section");
      movie.classList.add("active");
    } else {
      movie.classList.add("hidden-section");
      movie.classList.remove("active");
    }
  });

  // Reselect seats container
  seatsContainer = document.querySelector(".active");
}

function addSeat(seatElement) {
  // Toggle seat
  seatElement.classList.remove("seat-available");
  seatElement.classList.add("seat-selected");

  // Increase number of seats
  seatsNum += 1;
  seatsNumText.innerHTML = seatsNum;

  // Render new price total price
  renderTotalPrice();
}

function removeSeat(seatElement) {
  // Toggle sea
  seatElement.classList.remove("seat-selected");
  seatElement.classList.add("seat-available");

  // Increase number of seats
  seatsNum -= 1;
  seatsNumText.innerHTML = seatsNum;

  // Render new price total price
  renderTotalPrice();
}

function renderTotalPrice() {
  totalPriceText.innerHTML = `${seatsNum * ticketPrice}`;
}

function clearSelectedSeats() {
  // Reset selected seats
  nonOccupiedSeats.forEach((seatEl) => {
    seatEl.classList.remove("seat-selected");
    seatEl.classList.add("seat-available");
  });
}

function clearPricing() {
  // Reset number of seats
  seatsNum = 0;
  seatsNumText.innerHTML = seatsNum;

  // Render new price total price
  renderTotalPrice();
}

function confirmSeatBooking() {
  nonOccupiedSeats.forEach((seatEl) => {
    if (!seatEl.classList.contains("seat-selected")) return;
    seatEl.classList.add("seat-occupied");
    seatEl.classList.remove("seat-selected");
    seatEl.classList.remove("seat-available");
  });
}

////////////////////////////////////////////////
// EVENT HANDLERS
allMoviesSeats.addEventListener("click", function (e) {
  const seatEl = e.target.closest(".seat");

  //Clause guard
  if (!seatEl || seatEl.classList.contains("seat-occupied")) return;

  seatEl.classList.contains("seat-available")
    ? addSeat(seatEl)
    : removeSeat(seatEl);
});

movieInput.addEventListener("change", () => {
  // Get movie name and ticket price
  ticketPrice = getTicketPrice();
  movieName = getMovieName();

  // Render movie seats
  renderMovieSeats(movieName);

  // Clearing selected seats
  clearSelectedSeats();
  clearPricing();
  confirmMessage.classList.add("hidden");
});

btnConfirm.addEventListener("click", function () {
  confirmSeatBooking();
  confirmMessage.classList.remove("hidden");
});

btnClear.addEventListener("click", function () {
  clearSelectedSeats();
  clearPricing();
  confirmMessage.classList.add("hidden");
});

/////////////////////////////
// Initial
renderMovieSeats(getMovieName());
