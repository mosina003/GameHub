package com.games.gamehubb.controller;

import com.games.gamehubb.model.Game;
import com.games.gamehubb.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*") // So frontend can call this
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
}
    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable Long id) {
    gameService.deleteGame(id);
}
    

    @PostMapping
    public Game saveGame(@RequestBody Game game) {
        return gameService.saveGame(game);
    }
}
