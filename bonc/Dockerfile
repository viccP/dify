# 使用一个基础镜像，例如 OpenJDK 8 JRE
FROM centos7:jdk8-newapm

# 设置工作目录
WORKDIR /app


# 复制 Spring Boot 应用程序的 JAR 文件到容器中
COPY target/bonclops-custom.jar /app/bonclops-custom.jar

EXPOSE 8080

# 定义容器启动时要执行的命令
CMD ["java","-jar", "bonclops-custom.jar"]

