package com.games.gamehubb.service;

import java.util.Random;

public class SudokuGenerator {

    private static final int SIZE = 9;
    private static final int SUBGRID = 3;

    // PUBLIC method to generate a FULL, valid board
    public static int[][] generateFullBoard() {
        int[][] board = new int[SIZE][SIZE];
        fillBoard(board, 0, 0);
        return board;
    }

    // PUBLIC method to generate a puzzle by removing cells
    public static int[][] removeCells(int[][] fullBoard, int emptyCells) {
        int[][] puzzle = deepCopy(fullBoard);
        Random rand = new Random();

        int count = 0;
        while (count < emptyCells) {
            int row = rand.nextInt(SIZE);
            int col = rand.nextInt(SIZE);

            if (puzzle[row][col] != 0) {
                puzzle[row][col] = 0;
                count++;
            }
        }

        return puzzle;
    }

    // Helper: Fills board recursively
    private static boolean fillBoard(int[][] board, int row, int col) {
        if (row == SIZE) return true;
        if (col == SIZE) return fillBoard(board, row + 1, 0);

        
        int[] nums = generateShuffledArray();

        for (int num : nums) {
            if (isSafe(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard(board, row, col + 1)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    // Helper: Check if num can be placed at board[row][col]
    private static boolean isSafe(int[][] board, int row, int col, int num) {
        for (int i = 0; i < SIZE; i++) {
            if (board[row][i] == num || board[i][col] == num) return false;
        }

        int startRow = row - row % SUBGRID;
        int startCol = col - col % SUBGRID;

        for (int i = 0; i < SUBGRID; i++) {
            for (int j = 0; j < SUBGRID; j++) {
                if (board[startRow + i][startCol + j] == num) return false;
            }
        }

        return true;
    }

    // Helper: Deep copy of board
    private static int[][] deepCopy(int[][] original) {
        int[][] copy = new int[SIZE][SIZE];
        for (int i = 0; i < SIZE; i++) {
            System.arraycopy(original[i], 0, copy[i], 0, SIZE);
        }
        return copy;
    }

    // Helper: Generate shuffled 1–9 array
    private static int[] generateShuffledArray() {
        int[] arr = new int[SIZE];
        for (int i = 0; i < SIZE; i++) arr[i] = i + 1;

        Random rand = new Random();
        for (int i = SIZE - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
}
