fetch("/scrape-sites")
  .then((response) => response.json())
  .then((data) => {
    stopCount();
    sortCategories(data);
  });

const sortCategories = (data) => {
  let bestbuy;
  let dealsOA;
  let costco;
  let staples;
  for (let key in data) {
    switch (key) {
      case "dealsod":
        sortPrice(data.dealsod);
        dealsOA = createDisplay(
          data.dealsod,
          "Deals of America",
          "dealsofamerica"
        );
        break;

      case "bestbuy":
        sortPrice(data.bestbuy);
        bestbuy = createDisplay(data.bestbuy, "Best Buy", "bestbuy");
        break;

      case "costco":
        sortPrice(data.costco);
        costco = createDisplay(data.costco, "Costco", "costco");
        break;

      case "staples":
        sortPrice(data.staples);
        staples = createDisplay(data.staples, "Staples", "staples");
        break;
    }
  }

  let priceWatchContainer = document.getElementById("price-watch-container");
  priceWatchContainer.appendChild(dealsOA);
  priceWatchContainer.appendChild(costco);
  priceWatchContainer.appendChild(staples);
  priceWatchContainer.appendChild(bestbuy);
};

const createDisplay = (company, comptitle, titleId) => {
  let ul = document.createElement("ul");
  let title = document.createElement("h1");
  title.setAttribute("id", titleId);
  title.setAttribute("class", "title");
  title.textContent = comptitle;
  ul.appendChild(title);

  company.forEach((item) => {
    let li = document.createElement("li");
    let priceEl = document.createElement("div");
    let desciptEl = document.createElement("div");
    let linkEl = document.createElement("a");
    let remove = document.createElement("div");
    let newprice;

    priceEl.setAttribute("class", "price");
    desciptEl.setAttribute("class", "desc-detail");
    linkEl.setAttribute("class", "deal-link");
    remove.classList.add("remove-btn");
    newprice = `$${item.price.toLocaleString()}`;
    priceEl.textContent = newprice;

    desciptEl.textContent = item.description;
    remove.textContent = "X";
    linkEl.textContent = "See Deal";
    linkEl.setAttribute("href", item.link);
    linkEl.setAttribute("target", "_blank");

    li.append(remove);
    li.appendChild(priceEl);
    li.appendChild(desciptEl);
    li.appendChild(linkEl);
    ul.appendChild(li);
  });

  return ul;
};

const sortPrice = (item) => {
  item.sort((a, b) => {
    return a.price - b.price;
  });
};

const runLoader = () => {
  dots += ".";
  count++;
  if (count > 3) {
    count = 0;
    dots = "Loading Laptop Prices";
  }

  loadDot.textContent = dots;
};
const stopCount = () => {
  loadDot.innerHTML = "";
  let loader = document.getElementsByClassName("container");
  loader[0].style.display = "none";
  clearInterval(runtime);
};

// remove deal onclick event

document.addEventListener("click", function (e) {
  let removeEl = e.srcElement.className;
  if (removeEl === "remove-btn") {
    removeItem(e);
  }
});

// removes the parent element containing the pricing information to clean up view of options
const removeItem = (e) => {
  e.target.parentElement.remove();
};

//code for loading ... on sote load
var runtime = setInterval(runLoader, 500);
let dots = "Loading Laptop Prices";
let count = 0;
let priceWatchContainer = document.getElementById("price-watch-container");
let loadDot = document.createElement("div");
loadDot.setAttribute("class", "loaderdot");
priceWatchContainer.appendChild(loadDot);
