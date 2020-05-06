PHONY: all docker-build clean

all: clean docker-build

docker-build:
	mkdir -p docker_build
	rsync -a ./ docker_build --exclude "docker_build" --exclude "*/node_modules" --exclude "*/node" --exclude "*/build"
	docker build docker_build -t todo-app

clean:
	rm -rf docker_build
