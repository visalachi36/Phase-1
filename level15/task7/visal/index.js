const { connectDB } = require("./db");
const { fetchAndStoreFeeds } = require("./fetchFeeds");
const { queryByKeyword, markAsRead, listUnread } = require("./queryArticles");

(async () => {
  await connectDB();
  await fetchAndStoreFeeds();

  // 💡 You can use these examples or plug in a CLI later
  await queryByKeyword("technology");
  await listUnread();
  await markAsRead("https://example.com/article-link");

  process.exit(0);
})();
