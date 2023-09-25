const router = require("express").Router();
const MessageController = require("../controllers/messageController");
const authentication = require("../middlewares/authentication");

// ? barangkali mau nyoba yang via html bisa uncomment
// router.get("/chat/:user_id", async (req, res) => {
//   try {
//     const userId = req.params.user_id;
//     const userToChat = await User.findByPk(userId);

//     if (!userToChat) {
//       return res.status(404).send("User tidak ditemukan");
//     }

//     res.sendFile(path.join(__dirname, "../public/chat.html"));
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error);
//     res.status(500).send("Terjadi kesalahan");
//   }
// });

router.use(authentication);
router.get("/", MessageController.getMessages);
router.post("/", MessageController.sendMessage);
router.get("/received", MessageController.getMessageReceivedByUserId);
router.get("/sent", MessageController.getMessageSentByUserId);

module.exports = router;
