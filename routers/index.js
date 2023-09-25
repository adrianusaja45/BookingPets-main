const router = require("express").Router();
const userRouters = require("./userRouters");
const homeRouters = require("./homeRouters");
const messageRouters = require("./messageRouters");

router.use("/users", userRouters);
router.use("/", homeRouters);
router.use("/messages", messageRouters);

module.exports = router;
