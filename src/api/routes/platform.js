const {getAllPlatforms, getPlatformById, createPlatform, updatePlatform, deletePlatform}= require("../controller/platform");
const platformsRoutes = require("express").Router();

platformsRoutes.get("/", getAllPlatforms);
platformsRoutes.get("/:id", getPlatformById);
platformsRoutes.post("/", createPlatform);
platformsRoutes.put("/:id", updatePlatform);
platformsRoutes.delete("/:id", deletePlatform);

module.exports = platformsRoutes;