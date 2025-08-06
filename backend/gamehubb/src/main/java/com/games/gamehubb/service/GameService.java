package com.games.gamehubb.service;

import com.games.gamehubb.model.Game;
import com.games.gamehubb.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
    public Game getGameById(Long id) {
    return gameRepository.findById(id).orElse(null);
}
    public void deleteGame(Long id) {
    gameRepository.deleteById(id);
}
    public Game updateGame(Long id, Game updatedGame) {
    return gameRepository.findById(id).map(game -> {
        game.setName(updatedGame.getName());
        game.setGenre(updatedGame.getGenre());
        game.setHighScore(updatedGame.getHighScore());
        return gameRepository.save(game);
    }).orElse(null);
}

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }
}
