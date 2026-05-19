const mongoose = require('mongoose');

// Wrong password: test
const MONGODB_URI = "mongodb://sujalgujar_db_user:wrong_password@ac-vpgkpox-shard-00-00.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-01.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-02.mzccivz.mongodb.net:27017/mgschool?ssl=true&replicaSet=atlas-k8c65d-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("Attempting to connect with wrong password...");

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("SUCCESS: Connected!");
  process.exit(0);
})
.catch((err) => {
  console.error("FAILURE:", err.message);
  process.exit(1);
});
