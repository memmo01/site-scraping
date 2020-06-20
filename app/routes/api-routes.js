const scraperSite = require("./scraper-sites.js");
const axios = require("axios");

// api call to site
function newRequest(url) {
  return axios.get(`${url}`);
}

module.exports = async function (app, cheerio) {
  //scraping site for information on products
  app.get("/scrape-sites", async (req, res) => {
    try {
      let doa = await newRequest(
        "https://www.dealsofamerica.com/laptop-deals.php"
      );
      let BB = await newRequest(
        "https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&id=pcat17071&iht=y&keys=keys&ks=960&list=n&qp=laptopscreensizerange_facet%3DScreen%20Size~16%22%20or%20More&sc=Global&st=laptop&type=page&usc=All%20Categories"
      );
      let costco = await newRequest(
        "https://www.costco.com/laptops.html?operating-system=windows-os&screen-size=173-in&refine=ads_f117501_ntk_cs%253A%2522Windows%2BOS%2522|ads_f142505_ntk_cs%253A%252217.3%2Bin.%2522|"
      );
      let staple = await newRequest(
        "https://www.staples.com/17-18-9--Laptops-Deals/cat_CL167289/00792-41gw7"
      );

      scraperSite.dealsOfA(doa);
      scraperSite.bestBuySearch(BB);
      scraperSite.costcoSearch(costco);
      scraperSite.staplesSearch(staple);

      res.json(scraperSite.company);
    } catch (error) {
      console.log(error.message);
    }
  });
};
