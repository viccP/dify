package com.bonc.lops.controller;

import com.bonc.lops.exception.DbResultException;
import com.bonc.lops.jooq.tables.Accounts;
import com.bonc.lops.jooq.tables.daos.AccountsDao;
import com.bonc.lops.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletResponse;

@Controller
public class SsoController {

    private final Logger log = LogManager.getLogger(this.getClass());

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountsDao accountsDao;

    @Value("${CONSOLE_WEB_URL}")
    private String conselWebUrl;

    /**
     * @param response 返回
     * @param token    令牌
     * @author liboqiang
     * @description 单点接口
     * @date 11:56 2024/4/30
     **/
    @GetMapping("/sso/{token}")
    public void sso(HttpServletResponse response, @PathVariable String token) {
        try {
            String user = tokenService.parse(token);
            //获取lops用户ID
            String id = accountsDao.fetchByName(user).stream().findFirst()
                    .orElseThrow(() -> new DbResultException(String.format("没有找到name为[%s]的数据", user)))
                    .getId().toString();
            //生成lops可用的token
            String lopsToken = tokenService.generate(id);
            String redirectUrl = String.format("%s?console_token=%s", conselWebUrl, lopsToken);
            log.info("sso success,redirect url is:{}", redirectUrl);
            response.sendRedirect(redirectUrl);
        } catch (Exception e) {
            log.error(e);
            throw new RuntimeException(e);
        }
    }
}
