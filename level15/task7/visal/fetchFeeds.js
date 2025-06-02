const Parser = require("rss-parser");
const fs = require("fs");
const { getDB } = require("./db");

const parser = new Parser();

async function fetchAndStoreFeeds() {
  const feeds = JSON.parse(fs.readFileSync("feeds.json", "utf-8"));
  const db = getDB();
  const collection = db.collection("articles");

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);

      for (const item of feed.items) {
        const exists = await collection.findOne({ link: item.link });

        if (!exists) {
          await collection.insertOne({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            content: item.contentSnippet || item.content || "",
            source: feed.title,
            read: false
          });
          console.log(`📥 Inserted: ${item.title}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching ${url}:`, err.message);
    }
  }
}

module.exports = { fetchAndStoreFeeds };
