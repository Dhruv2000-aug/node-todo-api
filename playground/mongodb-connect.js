const { MongoClient,objectID, ObjectID } = require("mongodb");

// Replace the following with values for your environment.
const username = encodeURIComponent("dhruv");
const password = encodeURIComponent("@Dhruv2000");
const clusterUrl = "<MongoDB cluster url>";

const authMechanism = "DEFAULT";

// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://dhruv:${password}@cluster0.nt9p2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });

    console.log("Connected successfully to server");
    client.profiles.find().then((result)=>{
        result.forEach((res)=>{
            console.log();
        })
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); 



