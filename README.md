# TODO application

![todo-demo](https://user-images.githubusercontent.com/6317652/80957261-ca83b580-8e3d-11ea-879d-3f8a24fa0d76.gif)

## How to start

### Run as a docker container

1. Build a image

   ```shell
   make
   ```

1. Run as a container

    ```shell
    ./docker-run.sh -p <your-port>
     ```

### Run application on your host

```shell
./gradlew start
```

### For developer

- server

    ```shell
    ./gradlew startTodoServer
    ```

- ui

    ```shell
    cd todo-ui
    npm start
    ```

### Description

TODO management application that uses the following 
technologies :

- Server

  - [Micronaut](https://micronaut.io/)
  - [H2 Database](https://www.h2database.com/html/main.html)
  - [Flyway](https://flywaydb.org/)
  - [jOOQ](https://www.jooq.org/)

- UI
  - [React](https://reactjs.org/)
  - [MATERIAL-UI](https://material-ui.com/)
