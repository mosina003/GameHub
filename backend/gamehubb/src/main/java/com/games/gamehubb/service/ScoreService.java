package com.games.gamehubb.service;

import com.games.gamehubb.model.Game;
import com.games.gamehubb.model.Score;
import com.games.gamehubb.model.User;
import com.games.gamehubb.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public Score saveOrUpdateScore(User user, Game game, int newScore) {
        Score existingScore = scoreRepository.findByUserAndGame(user, game);
        if (existingScore == null) {
            existingScore = new Score();
            existingScore.setUser(user);
            existingScore.setGame(game);
            existingScore.setScore(newScore);
        } else {
            if (newScore > existingScore.getScore()) {
                existingScore.setScore(newScore);
            }
        }
        return scoreRepository.save(existingScore);
    }

    public List<Score> getUserScores(User user) {
        return scoreRepository.findByUser(user);
    }

    public List<Score> getScoresByGame(Game game) {
        return scoreRepository.findByGame(game);
    }
    
    public List<Score> getScoresByUserId(Long userId) {
    return scoreRepository.findByUserId(userId);
}

    public Score getHighestScore(Game game) {
        return scoreRepository.findTopByGameOrderByScoreDesc(game);
    }
}
