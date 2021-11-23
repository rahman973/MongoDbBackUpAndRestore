require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const dbName = process.env.DB_NAME;
let directory = "./DataBase";

let client = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
});

const DbBackUp = async () => {
  let collections = ["collection1", "collection3", "collection3"]; // collection names to backup
  for (let index = 0; index < collections.length; index++) {
    const currentCollection = collections[index];

    client = await client.connect();
    const db = client.db(dbName);
    let documents = await db.collection(currentCollection).find().toArray();
    let filePath = `${directory}/${currentCollection}.json`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.log(documents.length);
    fs.writeFileSync(filePath, JSON.stringify(documents));
  }

  console.log("backUp Complete");
  process.exit(0);
};

DbBackUp();
