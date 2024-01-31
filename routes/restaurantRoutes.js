const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { addRestaurant, getRestaurants } = require("../controllers/restaurantController");
const upload = require("../middlewares/fileUpload")
const router = express.Router();


router.route('/restaurant').post(verifyToken,upload.single('Photograph'), addRestaurant);
router.route('/restaurant').get(getRestaurants);

module.exports = router;