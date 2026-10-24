# Stage 1: Build Spring Boot Application with Maven & Temurin JDK 21
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY resume-backend/pom.xml .
COPY resume-backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal JRE 21 Runtime Container
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
