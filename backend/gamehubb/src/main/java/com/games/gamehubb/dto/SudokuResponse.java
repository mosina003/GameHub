package com.games.gamehubb.dto;

public class SudokuResponse {
    private int[][] puzzle;
    private int[][] solution;

    public SudokuResponse(int[][] puzzle, int[][] solution) {
        this.puzzle = puzzle;
        this.solution = solution;
    }

    public int[][] getPuzzle() {
        return puzzle;
    }

    public int[][] getSolution() {
        return solution;
    }
}
