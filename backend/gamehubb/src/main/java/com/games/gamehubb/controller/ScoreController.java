package com.games.gamehubb.controller;

import com.games.gamehubb.model.Game;
import com.games.gamehubb.model.Score;
import com.games.gamehubb.model.ScoreRequest;
import com.games.gamehubb.model.User;
import com.games.gamehubb.repository.GameRepository;
import com.games.gamehubb.repository.UserRepository;
import com.games.gamehubb.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @PostMapping("/submit")
public Score submitScore(@RequestBody ScoreRequest request) {
    User user = userRepository.findById(request.getUserId()).orElseThrow();
    Game game = gameRepository.findById(request.getGameId()).orElseThrow();
    return scoreService.saveOrUpdateScore(user, game, request.getScore());
}


    @GetMapping("/user/{userId}")
    public List<Score> getUserScores(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return scoreService.getUserScores(user);
    }

    @GetMapping("/game/{gameId}/highscore")
    public Score getGameHighScore(@PathVariable Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        return scoreService.getHighestScore(game);
    }
}
