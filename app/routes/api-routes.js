const scraperSite = require("./scraper-sites.js");
const axios = require("axios");

// api call to site
function newRequest(url) {
  return axios(`${url}`);
}

module.exports = async function (app, cheerio) {
  //scraping site for information on products
  app.get("/scrape-sites", async (req, res) => {
    try {
      let doa = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );

      await scraperSite.dealsOfA(doa);

      res.json(scraperSite.company);
    } catch (error) {
      console.log(error.message);
    }
  });
};
