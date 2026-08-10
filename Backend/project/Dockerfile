FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# Grant execution permissions to the Maven wrapper
RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8070

CMD ["sh", "-c", "java -jar target/*.jar"]