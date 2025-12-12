package com.hms.gateway;

import java.nio.charset.StandardCharsets;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import reactor.core.publisher.Mono;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

    // Nên mã hóa Base64, ở đây giữ nguyên key của bạn
    private static final String SECRET_KEY =
            "ffc3873186fa56ffef3c67c234d53f228c5aa5a18c2fc6a3f08efdb9aded5f8919df1cdab0b4c1d6cf0390c06ced98e886de52c6446ff1db7c27c9049cb0719e";

    
    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {

            String path = exchange.getRequest().getPath().toString();

            // Allow public endpoints
            if (path.equals("/user/login")|| path.equals("/user/register")) {
                return chain.filter(exchange.mutate().request(r->r.header("X-Secrey-Key", "SECRET_KEY")).build());
            }

            HttpHeaders headers = exchange.getRequest().getHeaders();
            if (!headers.containsKey(HttpHeaders.AUTHORIZATION)) {
                return unauthorized(exchange, "Missing Authorization Header");
            }

            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return unauthorized(exchange, "Invalid Authorization Header");
            }

            String token = authHeader.substring(7);

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SECRET_KEY)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                exchange = exchange.mutate().request(r->r.header("X-Secrey-Key", "SECRET_KEY")).build();
                // Bạn có thể kiểm tra role tại đây nếu cần
                // String role = claims.get("role", String.class);

            } catch (Exception e) {
                return unauthorized(exchange, "Invalid or Expired Token");
            }

            return chain.filter(exchange);
        };
    }

    private Mono<Void> unauthorized(org.springframework.web.server.ServerWebExchange exchange, String message) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add("Content-Type", "application/json");

        String body = "{ \"error\": \"" + message + "\" }";
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);

        return response.writeWith(Mono.just(response.bufferFactory().wrap(bytes)));
    }

    public static class Config { }
}
