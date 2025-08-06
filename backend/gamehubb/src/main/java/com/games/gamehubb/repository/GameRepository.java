package com.games.gamehubb.repository;

import com.games.gamehubb.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
