const mongoose = require('mongoose');
const fs = require('fs');

const uri = "mongodb://sujalgujar_db_user:test%401234@ac-vpgkpox-shard-00-00.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-01.mzccivz.mongodb.net:27017,ac-vpgkpox-shard-00-02.mzccivz.mongodb.net:27017/mgschool?ssl=true&replicaSet=atlas-k8c65d-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(async () => {
    const db = mongoose.connection.db;
    const branches = await db.collection("branchescontents").findOne();
    if (!branches) {
      console.log("No branches content found!");
      mongoose.connection.close();
      return;
    }

    const faculty = branches.blockA?.faculty || [];
    const facultyHtml = faculty.map((f) => {
      const hasPhoto = f.image && typeof f.image === "string" && f.image.trim() !== "";
      let imageUrl = f.image;
      return `
        <div class="trustee-card">
          ${hasPhoto ? `
          <div class="photo-col">
            <img src="${imageUrl.substring(0, 30)}..." alt="${f.name || 'Faculty'}" />
          </div>
          ` : "<!-- NO PHOTO -->"}
          <div class="info-col">
            <div class="name">${f.name || 'Unnamed Member'}</div>
            <div class="designation">${f.role || 'Educator'}</div>
            <div class="details-row">
              <div class="detail-item"><strong>Education:</strong> ${f.education || 'N/A'}</div>
              <div class="detail-item"><strong>Subject:</strong> ${f.subject || 'N/A'}</div>
            </div>
          </div>
        </div>
      `;
    }).join("\n");

    fs.writeFileSync('scratch/generated_faculty.html', facultyHtml);
    console.log("Saved generated html to scratch/generated_faculty.html");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error:", err);
  });
