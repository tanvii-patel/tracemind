package com.tracemind.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("==================================");
        System.out.println("PATH : " + request.getServletPath());
        System.out.println(
                "METHOD : " + request.getMethod()
        );
        System.out.println(
                "AUTH : " + request.getHeader("Authorization")
        );
        System.out.println("==================================");


        // ==============================
        // OPTIONS REQUEST
        // ==============================

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

            System.out.println("OPTIONS REQUEST");

            filterChain.doFilter(request, response);

            return;
        }


        // ==============================
        // GET AUTHORIZATION HEADER
        // ==============================

        String authHeader =
                request.getHeader("Authorization");


        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            System.out.println("NO JWT TOKEN");

            filterChain.doFilter(request, response);

            return;
        }


        // ==============================
        // EXTRACT TOKEN
        // ==============================

        String token =
                authHeader.substring(7);

        System.out.println("TOKEN FOUND");


        // ==============================
        // VALIDATE TOKEN
        // ==============================

        boolean valid;

        try {

            valid = jwtService.isValid(token);

        } catch (Exception e) {

            System.out.println(
                    "JWT VALIDATION ERROR"
            );

            e.printStackTrace();

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        System.out.println(
                "TOKEN VALID = " + valid
        );


        if (!valid) {

            System.out.println("JWT INVALID");

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // ==============================
        // EXTRACT EMAIL
        // ==============================

        String email;

        try {

            email =
                    jwtService.extractEmail(token);

        } catch (Exception e) {

            System.out.println(
                    "EMAIL EXTRACTION ERROR"
            );

            e.printStackTrace();

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        System.out.println(
                "EMAIL FROM TOKEN = " + email
        );


        // ==============================
        // LOAD USER
        // ==============================

        UserDetails user;

        try {

            user =
                    userDetailsService
                            .loadUserByUsername(email);

        } catch (Exception e) {

            System.out.println(
                    "USER LOADING ERROR"
            );

            e.printStackTrace();

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        System.out.println(
                "USER LOADED = " +
                user.getUsername()
        );


        // ==============================
        // CREATE AUTHENTICATION
        // ==============================

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );


        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request)
        );


        // ==============================
        // SET SECURITY CONTEXT
        // ==============================

        SecurityContextHolder
                .getContext()
                .setAuthentication(
                        authentication
                );


        System.out.println(
                "JWT AUTHENTICATION SUCCESS"
        );

        System.out.println(
                "AUTHENTICATED USER = " +
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName()
        );


        // ==============================
        // CONTINUE REQUEST
        // ==============================

        filterChain.doFilter(
                request,
                response
        );
    }
}