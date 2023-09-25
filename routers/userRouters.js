const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const path = require("path");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});
router.use(authentication);
router.put("/", UserController.updateUserByToken);
router.delete("/", UserController.deleteUserByToken);
router.get("/getuser", UserController.getUserByToken);

module.exports = router;
