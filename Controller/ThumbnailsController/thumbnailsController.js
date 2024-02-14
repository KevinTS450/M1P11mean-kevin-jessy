const ThumbNailsService = require("../../service/Thumbnails/thumbnails");

const getImagePaths = (req, res) => {
  try {
    const imagePath = ThumbNailsService.getUploadsPath();

    if (imagePath) {
      res.json({ imagePath });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error("Error fetching image paths:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getImagePaths,
};
