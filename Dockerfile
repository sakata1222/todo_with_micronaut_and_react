FROM adoptopenjdk:11-hotspot as build
WORKDIR /tmp/build
COPY . .
RUN ./gradlew clean assemble

# TODO build custom jire by jlink or build native image but jooq has an restriction for native-iamge

FROM adoptopenjdk/openjdk11:alpine-slim
WORKDIR /opt/todo
COPY --from=build /tmp/build/todo-server/application/build/libs/application-*-all.jar application.jar
EXPOSE 8080
CMD java -Dcom.sun.management.jmxremote -noverify ${JAVA_OPTS} -jar application.jar
