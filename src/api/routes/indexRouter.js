const gamesRoutes = require("./game");
const platformsRoutes = require("./platform")

const indexRouter = require("express").Router();

indexRouter.use("/games", gamesRoutes)
indexRouter.use("/platforms", platformsRoutes)

module.exports = indexRouter