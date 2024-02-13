const upload = require("../../service/Upload/upload");
const multer = require("multer");

async function uploadImage(req, res) {
  try {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: "Multer error" });
      } else if (err) {
        console.error("Unknown error:", err);
        return res.status(500).json({ message: "Unknown error" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = req.file.path;
      return res.status(200).json({ imageUrl });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { uploadImage };
