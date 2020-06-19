fetch("/scrape-sites")
  .then((response) => response.json())
  .then((data) => {
    stopCount();
    console.log("data");
    sortCategories(data);
  });

const sortCategories = (data) => {
  let bestbuy;
  let dealsOA;
  let costco;
  let staples;
  console.log(data);
  for (let key in data) {
    switch (key) {
      case "dealsod":
        console.log(true);

        sortPrice(data.dealsod);
        dealsOA = createDisplay(
          data.dealsod,
          "Deals of America",
          "dealsofamerica"
        );
        break;

      case "bestbuy":
        console.log("bb");
        sortPrice(data.bestbuy);
        console.log(key);
        console.log(data);
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

  console.log(bestbuy);
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
    let newprice;

    priceEl.setAttribute("class", "price");
    desciptEl.setAttribute("class", "desc-detail");
    linkEl.setAttribute("class", "deal-link");
    console.log(item.description);
    newprice = `$${item.price.toLocaleString()}`;
    priceEl.textContent = newprice;

    desciptEl.textContent = item.description;
    linkEl.textContent = "See Deal";
    linkEl.setAttribute("href", item.link);
    linkEl.setAttribute("target", "_blank");

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

//code for loading ... on sote load
var runtime = setInterval(runLoader, 500);
let dots = "Loading Laptop Prices";
let count = 0;
let priceWatchContainer = document.getElementById("price-watch-container");
let loadDot = document.createElement("div");
loadDot.setAttribute("class", "loaderdot");
priceWatchContainer.appendChild(loadDot);
