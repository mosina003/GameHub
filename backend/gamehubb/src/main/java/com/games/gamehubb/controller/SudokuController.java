package com.games.gamehubb.controller;

import com.games.gamehubb.dto.SudokuResponse;
import com.games.gamehubb.service.SudokuGenerator;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend access
public class SudokuController {

    @GetMapping
    public SudokuResponse getPuzzleAndSolution() {
        int[][] fullSolution = SudokuGenerator.generateFullBoard();
        int[][] puzzle = SudokuGenerator.removeCells(fullSolution, 40); // 40 empty cells for difficulty
        return new SudokuResponse(puzzle, fullSolution);
    }
}
