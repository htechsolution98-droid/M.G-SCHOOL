const mongoose = require('mongoose');

const uri = "mongodb://sujalgujar_db_user:test%401234@ac-vpgkpox-shard-00-00.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-01.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-02.mzccivz.mongodb.net:27017/mgschool?ssl=true&replicaSet=atlas-k8c65d-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(async () => {
    const db = mongoose.connection.db;
    const branches = await db.collection("branchescontents").findOne();
    if (!branches) {
      console.log("No branches content found!");
    } else {
      console.log("Block C Faculty List length:", branches.blockC?.faculty?.length);
      const faculty = branches.blockC?.faculty || [];
      faculty.forEach((member, index) => {
        console.log(`[${index}] Name: ${member.name}, Role: ${member.role}, Image: "${member.image ? member.image.substring(0, 30) + '...' : ''}" (length: ${member.image ? member.image.length : 0})`);
      });
    }
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
