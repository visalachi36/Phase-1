const { getDB } = require("./db");

// 🔍 Search articles by keyword in title or content
async function queryByKeyword(keyword) {
  const db = getDB();
  const results = await db.collection("articles").find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } }
    ]
  }).toArray();

  console.log(`🔍 Found ${results.length} article(s):`);
  results.forEach(article => {
    console.log(`- ${article.title} (${article.source})`);
  });
}

// ✅ Mark article as read
async function markAsRead(link) {
  const db = getDB();
  const result = await db.collection("articles").updateOne(
    { link },
    { $set: { read: true } }
  );

  if (result.modifiedCount > 0) {
    console.log(`✅ Marked as read: ${link}`);
  } else {
    console.log(`⚠️ Article not found or already read: ${link}`);
  }
}

// 📄 List all unread articles
async function listUnread() {
  const db = getDB();
  const results = await db.collection("articles").find({ read: false }).toArray();

  console.log(`📋 ${results.length} unread article(s):`);
  results.forEach(article => {
    console.log(`- ${article.title} (${article.source})`);
  });
}

module.exports = { queryByKeyword, markAsRead, listUnread };
