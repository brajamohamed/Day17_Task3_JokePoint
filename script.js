let categoryEl = document.getElementById("category");
let jokeType = document.getElementsByName("jokeType");
let radioDiv = document.getElementById("typeDiv");
let btnEl = document.getElementById("btn");
let output = document.getElementById("outputDiv");
let outputList = document.getElementById("jokeList");
let emoji = document.getElementById("emoji");

let single = document.getElementById("singleLine");
let twoPart = document.getElementById("qa");
document.addEventListener("DOMContentLoaded", populateCategory);
btnEl.addEventListener("click", populateJokes);
categoryEl.addEventListener("change", hideEmoji);
single.addEventListener("change", hideEmoji);
twoPart.addEventListener("change", hideEmoji);

function hideEmoji() {
  emoji.style.visibility = "hidden";
}

function populateCategory() {
  fetch(`https://v2.jokeapi.dev/categories`)
    .then((res) => res.json())
    .then((data) => {
      let cats = data.categories;
      cats.forEach((cat) => {
        categoryEl.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    });
}

async function populateJokes() {
  hideEmoji();
  let type = getType();
  output.innerText = "";

  let response = await fetch(
    `https://v2.jokeapi.dev/joke/${categoryEl.value}?type=${type}`
  );
  let data = await response.json();
  if (type == "single") {
    let p = document.createElement("p");
    p.innerText = data.joke;
    output.appendChild(p);
    emoji.style.visibility = "visible";
  } else {
    let p1 = document.createElement("p");
    p1.innerText = data.setup;
    output.appendChild(p1);
    setTimeout(() => {
      emoji.style.visibility = "visible";
      let p2 = document.createElement("p");
      p2.innerText = data.delivery;
      output.appendChild(p2);
    }, 3000);
  }
}

function getType() {
  let selectedType;
  jokeType.forEach((type) => {
    if (type.checked) {
      selectedType = type.value;
    }
  });
  return selectedType;
}
