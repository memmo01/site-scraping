const cheerio = require("cheerio");
let companies = {
  dealsod: [],
  bestbuy: [],
  costco: [],
  staples: [],
};

// these methods take in site information and break it down to get text information on sites from specific class locations
// the text data is then pushed to an array for usage later

module.exports = {
  company: companies,

  dealsOfA: function (data) {
    companies.dealsod = [];
    let $ = cheerio.load(data.data);
    $(".title").each(function () {
      //gathering text from webpage
      let descriptionTxt = $(this).children("a").text();
      let priceTxt = $(this)
        .children(".for_text")
        .children(".orange-caps")
        .text();
      let url = $(this).children("a").attr("href");
      //search for screen size 17.3
      if (descriptionTxt.indexOf("17.3") !== -1) {
        companies.dealsod.push(stringCleanUp(priceTxt, descriptionTxt, url));
      }
    });
  },

  bestBuySearch: function (data) {
    companies.bestbuy = [];
    let $ = cheerio.load(data.data);
    $(".sku-item").each(function () {
      //gathering text from webpage
      let descriptionTxt = $(this).find(".sku-header > a").text();
      let priceTxt = $(this).find(".priceView-customer-price>.sr-only").text();
      let url = `https://bestbuy.com${$(this)
        .find(".sku-header > a")
        .attr("href")}`;

      //search for screen size 17.3
      if (descriptionTxt.indexOf("17.3") !== -1) {
        companies.bestbuy.push(stringCleanUp(priceTxt, descriptionTxt, url));
      }
    });
  },

  costcoSearch: function (data) {
    let $ = cheerio.load(data.data);
    companies.costco = [];
    $(".product").each(function () {
      //gathering text from webpage
      let descriptionTxt = $(this).find(".description > a").text();
      let priceTxt = $(this).find(".price").text();
      let url = $(this).find(".description > a").attr("href");

      companies.costco.push(stringCleanUp(priceTxt, descriptionTxt, url));
    });
  },

  staplesSearch: function (data) {
    let $ = cheerio.load(data.data);
    companies.staples = [];

    $(".list-type__tile_wrapper").each(function () {
      let url = `https://www.staples.com${$(this)
        .find(".list-type__product_tile_middle >a")
        .attr("href")}`;

      //gathering text from webpage
      let descriptionTxt = $(this)
        .find(".list-type__product_tile_middle >a")
        .text();
      let priceTxt = $(this).find(".list-type__price").text();

      companies.staples.push(stringCleanUp(priceTxt, descriptionTxt, url));
    });
  },
};

// clean up numbers so they do not have dollar signs and commas. This will make it easier to sort prices low to high
function stringCleanUp(priceTxt, itemTxt, url) {
  //take dollar sign out
  let dollarSignSplit = priceTxt.split("$");
  //take comma out
  let commaRemove = dollarSignSplit[1].split(",").join("");
  //turn string to a number for sorting in javascript
  let num = parseInt(commaRemove);
  let items = {
    description: itemTxt,
    price: num,
    link: url,
  };
  return items;
}
