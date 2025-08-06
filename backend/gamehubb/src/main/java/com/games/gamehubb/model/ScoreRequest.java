package com.games.gamehubb.model; // You can change the package as per your structure

public class ScoreRequest {

    private Long userId;
    private Long gameId;
    private int score;

    public ScoreRequest() {
    }

    public ScoreRequest(Long userId, Long gameId, int score) {
        this.userId = userId;
        this.gameId = gameId;
        this.score = score;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
