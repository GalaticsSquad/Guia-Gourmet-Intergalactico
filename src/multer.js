const multer = require('multer');
const path = require('path');

module.exports = { 
    dest: path.resolve(__dirname, '..', 'public', 'uploads'), // Local de upload;
    storage: multer.diskStorage({ 
        destination: (req, file, callback) => {
            callback (null, path.resolve(__dirname, '..', 'public', 'uploads'));
        },
        filename: (req, file, callback) => {
            const fileName = file.originalname;

            callback(null, fileName);
        }
    }),

    fileFilter: (req, file, callback) => { // Filtrar formato de img por extensão;
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
    }  
};