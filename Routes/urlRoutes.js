const express = require("express");
const router = express.Router();
const urlRouter = require("../Controllers/urlController")

router.get("/", urlRouter.welcomeMsg);
router.post("/shorten", urlRouter.urlShort);
router.get("/:shortId", urlRouter.shortId);
router.get("/stats/:shortId", urlRouter.stats)

module.exports = router;
