package com.games.gamehubb.controller;

import com.games.gamehubb.dto.LoginRequest;
import com.games.gamehubb.dto.RegisterRequest;
import com.games.gamehubb.model.User;
import com.games.gamehubb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return "Username already registered";
        }

        User user = new User(
            request.getUsername(),
            request.getPassword(),
            request.getEmail()
        );

        userRepository.save(user);

        return "User registered successfully!";
    }

    @PostMapping("/login")
public String loginUser(@RequestBody LoginRequest loginRequest) {
    User user = userRepository.findByUsername(loginRequest.getUsername());

    if (user == null) {
        return "User not found";
    }

    if (!user.getPassword().equals(loginRequest.getPassword())) {
        return "Invalid credentials";
    }

    return "Login successful!";
}

}
