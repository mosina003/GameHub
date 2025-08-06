package com.games.gamehubb.repository;

import com.games.gamehubb.model.Score;
import com.games.gamehubb.model.Game;
import com.games.gamehubb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUser(User user);
    List<Score> findByGame(Game game);
    List<Score> findByUserId(Long userId);

    Score findTopByGameOrderByScoreDesc(Game game);
    Score findByUserAndGame(User user, Game game);
}
