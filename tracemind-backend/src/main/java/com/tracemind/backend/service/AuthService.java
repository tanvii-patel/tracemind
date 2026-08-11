package com.tracemind.backend.service;

import com.tracemind.backend.dto.LoginRequest;
import com.tracemind.backend.dto.RegisterRequest;
import com.tracemind.backend.entity.User;
import com.tracemind.backend.repository.UserRepository;
import com.tracemind.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tracemind.backend.dto.UserResponse;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(

            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService

    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

    }
public UserResponse getCurrentUser(String email) {

    User user = userRepository
            .findByEmail(email)
            .orElseThrow();

    return new UserResponse(

            user.getFullName(),
            user.getEmail(),
            user.getRole()

    );

}
    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            return "Email already exists";

        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        return "User Registered Successfully";

    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");

        }

        return jwtService.generateToken(user.getEmail());

    }

}