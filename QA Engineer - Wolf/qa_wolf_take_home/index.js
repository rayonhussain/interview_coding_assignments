const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // wait for the page to load
  await page.waitForSelector('.athing');

  // extract article titles and their points
  const articles = await page.evaluate(() => {
    // get all article rows
    const rows = Array.from(document.querySelectorAll('.athing'));
    return rows.map(row => {
      const title = row.querySelector('.titleline').innerText;
      const pointsElement = row.nextElementSibling.querySelector('.score');
      const points = pointsElement ? parseInt(pointsElement.innerText.split(' ')[0]) : 0; // if no points, set to 0
      return { title, points };
    });
  });

  // sort articles by points in descending order
  articles.sort((a, b) => b.points - a.points);

  // print sorted articles
  console.log("Top articles sorted by points:");
  articles.forEach(article => {
    console.log(`${article.title} - ${article.points} points`);
  });

  // close browser
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
