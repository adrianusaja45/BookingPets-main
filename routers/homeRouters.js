const router = require("express").Router();
const HomeController = require("../controllers/homeController");
const authentication = require("../middlewares/authentication");
// const path = require("path");

// ? barangkali mau nyoba yang via html bisa uncomment
// router.get("/home", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/home.html"));
// });

router.use(authentication);
router.get("/", HomeController.getAllUsers);

module.exports = router;
