//Importation de multer
const multer = require('multer');
const uuid4 = require("uuid").v4;
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, callback) => {
        const fullName = "piqimg_" + uuid4().replace(/-/g, "") + path.extname(file.originalname);
        callback(null, fullName);
    }
});
const upload = multer({ storage: storage });
//Exportation du module
module.exports = multer({ storage: storage }).single('image');