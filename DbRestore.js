require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const dbName = process.env.DB_NAME;
let directory = "./DataBase";

let client = new MongoClient(process.env.DB_URL, {
  useUnifiedTopology: true,
});

const getFiles = async (dir, files_) => {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = files[i];
    files_.push(name);
  }
  return files_;
};

const restoreDb = async () => {
  const files = await getFiles(directory);

  for (let index = 0; index < files.length; index++) {
    const currentFile = files[index];
    let collection = currentFile.split(".");
    collection = `${collection[0]}`;
    const data = fs.readFileSync(`${directory}/${currentFile}`);
    const docs = JSON.parse(data.toString());
    console.log(docs.length);
    client = await client.connect();
    const db = client.db(dbName);
    await db.collection(collection).deleteMany();
    await db.collection(collection).insertMany(docs);
  }

  console.log("Restoring Complete");
  process.exit(0);
};
restoreDb();
