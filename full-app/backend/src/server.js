import express from "express";
import { db, connectToDb } from "./db";

const app = express();

app.use(express.json());

let articleInfo = [
  {
    name: "learn-react",
    upvote: 0,
    comment: [],
  },
  {
    name: "learn-node",
    upvote: 1,
    comment: [],
  },
  {
    name: "learn-express",
    upvote: 2,
    comment: [],
  },
];

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`hello ${name}`);
});

app.post("/hello", (req, res) => {
  res.send(`hello ${req.body.name}`);
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("react-blog-db");
  await db.collection("article").updateOne({ name }, { $inc: { upvote: 1 } });
  const article = await db.collection("article").findOne({ name });
  // const article = articleInfo.find((a) => a.name === name);
  if (article) {
    // article.upvote += 1;
    res.send(`the ${name} upvotes ${article.upvote} `);
  } else {
    res.send("article doesnt exits");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postBy, text } = req.body;
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("react-blog-db");
  await db
    .collection("article")
    .updateOne({ name }, { $push: { comments: { postBy, text } } });
  const article = await db.collection("article").findOne({ name });
  // const article = articleInfo.find((a) => a.name === name);
  if (article) {
    // article.comment.push({ postBy, text });
    res.send(` ${article.comment} `);
  } else {
    res.send("article doesnt exits");
  }
});

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("react-blog-db");
  const article = await db.collection("article").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(400).send("Article not found");
  }
});

connectToDb(() => {
  console.log("Successfully connected to database")
  app.listen(8000, () => {
    console.log("server is listening on port 8000");
  });
});
