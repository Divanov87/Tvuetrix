const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

// Set storage engine for Multer to handle file name and extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/image-uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    const filename = `${file.fieldname}-${Date.now()}${ext}`; // Create a unique filename with extension
    cb(null, filename);
  }
});

// Multer upload instance
const upload = multer({ storage: storage });

// Route to handle image uploads
router.post('/image-uploads', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const filePath = `assets/image-uploads/${req.file.filename}`; // URL path for accessing the image
        const fullUrl = `${req.protocol}://${req.get('host')}/${filePath}`; // Full URL to return to the frontend
    
        // Save the file data to the database (if applicable)
        const newImage = new Image({
          filename: req.file.filename,
          url: filePath
        });
    
        await newImage.save();
    
        // Send back the image URL to the frontend
        res.status(201).json({
          message: 'Image uploaded successfully',
          filename: req.file.filename,
          imageId: newImage._id,
          url: fullUrl // Return full URL to CKEditor
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });

router.post('/image-uploads-ck', upload.single('upload'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const filePath = `assets/image-uploads/${req.file.filename}`; // URL path for accessing the image
      const fullUrl = `${req.protocol}://${req.get('host')}/${filePath}`; // Full URL to return to the frontend
  
      // Save the file data to the database (if applicable)
      const newImage = new Image({
        filename: req.file.filename,
        url: filePath
      });
  
      await newImage.save();
  
      // Send back the image URL to the frontend
      res.status(201).json({
        message: 'Image uploaded successfully',
        filename: req.file.filename,
        imageId: newImage._id,
        url: fullUrl // Return full URL to CKEditor
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
