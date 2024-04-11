const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require("../controller/game")

const gamesRoutes = require("express").Router();

gamesRoutes.get("/", getAllGames);
gamesRoutes.get("/:id", getGameById);
gamesRoutes.post("/", createGame);
gamesRoutes.put("/:id", updateGame);
gamesRoutes.delete("/:id", deleteGame);

module.exports = gamesRoutes;