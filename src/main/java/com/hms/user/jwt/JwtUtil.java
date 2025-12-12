package com.hms.user.jwt;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    public static final Long JWT_TOKEN_VALIDITY = 5 * 60 * 60L; // 5 hours
    public static final String SECRET_KEY = "ffc3873186fa56ffef3c67c234d53f228c5aa5a18c2fc6a3f08efdb9aded5f8919df1cdab0b4c1d6cf0390c06ced98e886de52c6446ff1db7c27c9049cb0719e";

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails custom = (CustomUserDetails) userDetails;

        claims.put("id", custom.getId());
        claims.put("email", custom.getUsername());
        claims.put("role", custom.getRole());
        claims.put("name", custom.getName());

        return doGenerateToken(claims, userDetails.getUsername());
    }

    public String doGenerateToken(Map<String, Object> claims, String subject) {

        Instant now = Instant.now();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
