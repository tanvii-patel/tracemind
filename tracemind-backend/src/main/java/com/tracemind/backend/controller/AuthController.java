package com.tracemind.backend.controller;
import com.tracemind.backend.dto.LoginRequest;
import com.tracemind.backend.dto.RegisterRequest;
import com.tracemind.backend.service.AuthService;

import org.springframework.web.bind.annotation.*;
import com.tracemind.backend.dto.UserResponse;
import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;

    }

    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request

    ) {

        return authService.register(request);

    }

    @PostMapping("/login")
public String login(@RequestBody LoginRequest request) {

    System.out.println("LOGIN API HIT");

    return authService.login(request);
}
@GetMapping("/me")
public UserResponse me(Authentication authentication) {

    return authService.getCurrentUser(

            authentication.getName()

    );

}
}