const scraperSite = require("./scraper-sites.js");
const axios = require("axios");

// api call to site
function newRequest(url) {
  return axios(`${url}`);
}

module.exports = async function (app, cheerio) {
  //scraping site for information on products
  app.get("/scrape-sites", async (req, res) => {
    newRequest("https://www.dealsofamerica.com/laptop-deals.php")
      .then((data) => {
        scraperSite.dealsOfA(data);
      })
      .then(
        newRequest(
          "https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&id=pcat17071&iht=y&keys=keys&ks=960&list=n&qp=laptopscreensizerange_facet%3DScreen%20Size~16%22%20or%20More&sc=Global&st=laptop&type=page&usc=All%20Categories"
        )
          .then((data) => {
            scraperSite.bestBuySearch(data);
          })
          .then(
            newRequest(
              "https://www.costco.com/laptops.html?operating-system=windows-os&refine=ads_f117501_ntk_cs%253A%2522Windows%2BOS%2522|"
            )
              .then((data) => scraperSite.costcoSearch(data))
              .then(
                newRequest(
                  "https://www.staples.com/17-18-9--Laptops-Deals/cat_CL167289/00792-41gw7"
                )
                  .then((data) => scraperSite.staplesSearch(data))
                  .then(res.json(scraperSite.company))
              )
          )
      );
  });
};
