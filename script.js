const seats_ka_area = document.querySelector(".seats_ka_area");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// console.log(movieCost)

localStorage_se_laao();

let movieCost = movieSelect.value;

function updateKaro() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * movieCost;
  const seatsIndex = [...selectedSeats].map(function (seat) {
    // console.log([...seats].indexOf(seat));
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
}

function localStorage_se_laao() {
  const seatsIndex = JSON.parse(localStorage.getItem("seatsIndex"));
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seats.forEach(function (seat, index) {
      if (seatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );

  if(selectedMovieIndex !== null){
  movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  movieCost = e.target.value;
  localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
  updateKaro();
});

seats_ka_area.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateKaro();
  }
});

updateKaro();
