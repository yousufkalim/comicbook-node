const multer = require('multer');

// Multer strategy for local uploading. (Read multer's documentation for more details)
exports.upload = multer({
  // to store files
  storage: multer.diskStorage({
    // Defining the path where we have to store the file
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Callback
    },
    // Creating a unique filename to avoid duplication error
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Callback
    },
  }),
  // File size limit upto 1GB
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ['image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mp3'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});
