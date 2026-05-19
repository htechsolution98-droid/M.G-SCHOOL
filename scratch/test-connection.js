const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

console.log("Attempting to connect to:", MONGODB_URI.replace(/\/\/.*@/, "//***@"));

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("SUCCESS: Connected to MongoDB successfully!");
  process.exit(0);
})
.catch((err) => {
  console.error("FAILURE: Connection failed with error:", err.message);
  process.exit(1);
});
