const multer = require('multer');
const path = require('path');

module.exports = { 
    dest: path.resolve(__dirname, '..', 'public', 'img'), // Local de upload;
    storage: multer.diskStorage({ 
        destination: (req, file, cb) => {
            cb (null, path.resolve(__dirname, '..', 'public', 'img'));
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname;

            cb (null, fileName);
        }
    }),

    fileFilter: (req, file, cb) => { // Filtrar formato de img por extensão;
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
    }        
};