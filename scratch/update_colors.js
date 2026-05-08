const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found');
  process.exit(1);
}

const AnnouncementSchema = new mongoose.Schema({
  bgColor: String,
  textColor: String,
});

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const result = await Announcement.updateMany({}, {
      $set: {
        bgColor: "#0EA5E9", // Light Blue (Sky 500)
        textColor: "#FFFFFF" // Clean White
      }
    });
    
    console.log(`Updated ${result.modifiedCount} announcements`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
