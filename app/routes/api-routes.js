const scraperSite = require("./scraper-sites.js");
const axios = require("axios");

// api call to site
async function newRequest(url) {
  return axios(`${url}`);
}

module.exports = function (app, cheerio) {
  //scraping site for information on products
  app.get("/scrape-sites", async (req, res) => {
    try {
      let doa = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );
      let BB = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );
      let costco = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );
      let staple = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );
      console.log(BB);
      await scraperSite.bestBuySearch(BB);
      await scraperSite.dealsOfA(doa);
      await scraperSite.costcoSearch(costco);
      await scraperSite.staplesSearch(staple);

      res.json(scraperSite.company);
    } catch (error) {
      console.log(error.message);
    }
  });
};
