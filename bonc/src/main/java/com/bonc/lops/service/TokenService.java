package com.bonc.lops.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenService {

    @Value("${SECRET_KEY}")
    private String secret;

    @Value("${TOKEN_TIME_OUT}")
    private int tokenTimeOut;

    /**
     * @param token sso token
     * @return java.lang.String
     * @author liboqiang
     * @description 解析token
     * @date 15:43 2024/4/30
     **/
    public String parse(String token) {
        SecretKey key = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS256.getJcaName());
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return (String) claims.get("user_id");
    }

    /**
     * @param id 用户ID
     * @return java.lang.String
     * @author liboqiang
     * @description 生成token
     * @date 15:43 2024/4/30
     **/
    public String generate(String id) {
        Key key = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS256.getJcaName());
        // 创建负载（payload）
        Map<String, String> payload = new HashMap<>();
        payload.put("user_id", id); // 替换为实际的用户ID,这里用4a账号
        payload.put("iss", "SELF_HOSTED"); // 替换为实际的版本
        payload.put("sub", "Console API Passport");
        // 生成JW
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, tokenTimeOut);
        return Jwts.builder()
                .setClaims(payload) // 设置负载
                .setExpiration(cal.getTime()) // 设置过期时间
                .setIssuer(payload.get("iss")) // 设置签发者
                .setSubject(payload.get("sub")) // 设置主题
                .signWith(key, SignatureAlgorithm.HS256) // 使用HS256算法和密钥签名
                .compact();
    }
}
