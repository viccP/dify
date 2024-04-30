package com.bonc.lops.exception;

/**
 * @author liboqiang
 * @description 流程节点获取异常
 * @date 2024/1/12 11:31
 **/
public class DbResultException extends Exception {
    public DbResultException(String message) {
        super(message);
    }
}