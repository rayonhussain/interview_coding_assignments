# Resolving Technical Requirements and Q1

Resolved by: Rayon Hussain Mohammed

- Location: **New York**
- Found the Job on **Handshake**

Reach out: +1 7164234053 | [EMail]('mailto:hassanrayon.mohammed@gmail.com')

## Techincal and Packages Related

First install NodeJS LFS file if it not already installed
[Install Node JS(LFS)](https://nodejs.org.)

Install and run it in local environment

Then  within terminal for their respective reasons

- Checking the version of npm
    - npm -v
- Checking the version of node \
     -node -v 
- So now go to the directory where the project/repository is present and then run the command (This will install the dependencies listed in your package.json file)
    - npm install

and if the playwright does get isntalled you can use below command to resolve the issue

- npx playwright install

and then run below code when the changes are made in the index.js file

- node index.js

## Step by Step Method for index.js modifications

Steps that are covered are as below:

- Launches a Chromium browser and navigates to Hacker News.
- Extracts the titles and points of the newest articles.
- Sorts the articles by points in descending order.
- Prints the sorted list of articles and closes the browser.

It is a simple demonstration of how Playwright can automate web scraping and data processing tasks.

### Step by Process

- Step 1
    - '''const { chromium } = require("playwright");'''
    - Open Chromium browser using Playwright library

- Step 2

        async function sortHackerNewsArticles() {
        // launch browser
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
    
    - Chromium is launched with headless feature(browser visible while automation is running)
    - context and page are created for navigation into new pages

- Step 3

        // go to Hacker News
        await page.goto("https://news.ycombinator.com/newest");

    - Navigating to the hackernews portal 'newest' section



- Step 4

        // wait for the page to load
        await page.waitForSelector('.athing');

    - Waiting for the page to load

- Step 5

        // extract article titles and their points
        const articles = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.athing'));
            return rows.map(row => {
            const title = row.querySelector('.titleline').innerText;
            const pointsElement = row.nextElementSibling.querySelector('.score');
            const points = pointsElement ? parseInt(pointsElement.innerText.split(' ')[0]) : 0; // if no points, set to 0
            return { title, points };
            });
        });

    - **page.evaluate** method is used to run JavaScript inside the browser and extract data from the page
    - **.athing**, representing the articles
    - **.titleline** element within each row
    - **.score** class. If the score is not available, it defaults to 0

- Step 6

        // sort articles by points in descending order
        articles.sort((a, b) => b.points - a.points);

    - articles sorted by their points in descending order

- Step 7

        // print sorted articles
        console.log("Top articles sorted by points:");
        articles.forEach(article => {
            console.log(`${article.title} - ${article.points} points`);
        });

    - printing sorted articles

- Step 8

          // close browser
            await browser.close();

    - closing the browser

- Step 9

        (async () => {
        await sortHackerNewsArticles();
        })();

    - self executing function

