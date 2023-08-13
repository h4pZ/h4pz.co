---
title: "Docker"
date: 2023-08-13T20:39:09+02:00
draft: false
---

This document contains information about what docker is and some basic commands. This contains information that I would liked to read when I was starting figuring out what this tool does. It is primarily targeted to a non-so-technical audience like me who doesn't have a CS background.
<!--more-->


## Docker
Docker delivers software in packages called containers. It's main use is to kill the excuse "it runs on my computer" because if the software is ran on a docker container then it runs on every computer (if you can install docker on the new computer :)).

The main two components of docker are it's server and client. Both are just software but they have different purposes. The docker server runs as a background process and waits for instructions. It's main purpose is to create, delete, modify, stop docker containers (programs that are being run on it's own isolated environment). The docker client is a command line software that we use as users. It's main purpose is to help us request changes to the containers to the docker server, like requesting to spin up a docker container.

## Docker Image
A docker image can be seen as a class in OOP (Object Oriented Programming). Docker images can be built via a Dockerfile file which contains the instructions to build such an image.

Images are made of multiple layers. These layers are instructions that are used to build the image. Each layer, except the last one is read only. The last layer is defined as the container layer which wraps all the other instructions. This layer is only created once the image is instantiated and any modification to the container is going to be applied to the last layer.

When a container is deleted only the container layer is deleted (last layer) while the image remains unchanged. This way multiple containers can use the same image but have different interactions and changes without duplication of the previous layers of the image.

## Docker Hub
Docker Hub is a public registry, it's like GitHub but for sharing docker images. It contains public and private repositories.

# Commands
Below there is a series of useful commands that I'll probably forget and instead of googling them I can access them whenever I want on my website.

---

## Basic Commands

How to run a container. This will create a new "instance" of the image

```bash
docker run <image>
```

Look at the running containers

```bash
docker ps
```

Look at all the containers

```bash
docker ps -a
```

Run container and drop to shell

```bash
docker run -it <image>
docker run --interactive --tty <image>
```

Run container in the background (de-attach)

```bash
docker run -d <image>
```

Container restart settings

```bash
docker run --restart (always|no|on-failure[:maxretries]|unless-stopped) <image>
```

Remove container when exited
```bash
docker run --rm <image>
```

Provide a nickname to a container

```bash
docker run --name <name> <image>
```

How to start a stopped container (instance)

```bash
docker start <container>
```

Run a command against a container

```bash
docker exec <container> <command>
```

Drop into the container shell. Note that the shell must be available in the image OS. For example, for alpine the default one is `ash` but for ubuntu it is `bash`

```bash
docker exec -it <container> <shell>
```

Copy / move files from and to the container.

```bash
docker cp <source> <container>:<destination>
docker cp <container>:<source> <destination>
```

View container information

```bash
docker inspect <container>
```

Create a container image

```bash
docker commint <container> <name>
```

Map container port to host server

```bash
docker run -p <host_port>:<container_port> <container>
```

Run a container de-attach exposing a port with a name

```bash
docker run -dt -p <local-port>:<docker-port> --name <container-name> <image-name>
```

Get an image from docker hub

```bash
docker pull <image>
```

Look at the images you have locally

```bash
docker image ls
```

Remove an image

```bash
docker image rm <image-name>
```

Remove images without at least one container associated to them

```bash
docker image prune -a
```

Get information about an image

```bash
docker image inspect <image-name>
```

Log in to the Docker hub

```bash
docker loging --username=<username>
```

Tag an image

```bash
docker tag <image> <username>/<repo>:<tag>
```

Push image to docker hub

```bash
docker push <username>/<repo-name>
```

Log out of Docker hub

```bash
docker logout
```

Build a Dockerfile image

```bash
docker build <dockerfile-path> <name>
```

Example of Dockerfile

```dockerfile
FROM alpine:3.13
RUN apk upgrade
RUN apk add nginx
COPY files/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY --chown=nginx:nginx /files/html/ .
EXPOSE 80
CMD [ "nginx", "-g", "pid /tmp/nginx.pid; daemon off;" ]
```

Delete a container once it finished running

```bash
docker container run --rm <container-name>
```

Remove all stopped containers. The `-f` flag is to force it and do not prompt for confirmation.

```bash
docker container prune -f
```

Exposing a port of the container

```bash
docker container run -d --expose <port-number> <image-name>
```

Look at the exposed ports of a container

```bash
docker container port <container-name>
```

Start a container with a command

```bash
docker container run <image-name> <command>
```

Executing a command on a container

```bash
docker container exec -it <container-name> <command>
```

Show the logs of a container

```bash
docker container logs <container-name>
```

Show the logs of all the containers in a service

```bash
docker service logs <service-name>
```

**Note:** Logs need to be output to `stdout` and `stderr`. For example (nginx):
```dockerfile
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
```

## Networking

List of networks

```bash
docker network ls
```

Get detailed information of a network

```bash
docker network inspect <network-name>
```

Create a new network

```bash
docker network create <network-name>
```

Delete a network

```bash
docker network rm <network-name>
```

Delete all unused networks

```bash
docker network prune
```

Adding a container to a network

```bash
docker network connect <network-name> <container-name>
```

Removing a container from a network

```bash
docker network disconnect <network-name> <container-name>
```

Create a network with a subnet and gateway

```bash
docker network create --subnet <subnet> --gateway <gateway> <network-name>
docker network create --subnet <subnet> --gateway <gateway> --ip=range=<ip_range> --driver=<driver> <network-name>
```

## Volumes
Docker containers have two types of data. The first one is non-persistent data which is tied to the life-cycle of the container. The persistent type of data in docker is called volumes and it isn't tied to the life-cycle of the container.


List all volumes on a host

```bash
docker volume ls
```

Create a volume

```bash
docker volume create <volume-name>
```

Inspect a volume

```bash
docker volume inspect <volume-name>
```

Deleting a volume

```bash
docker volume rm <volumen-name>
```

Remove all unused volumes

```bash
docker volume prune
```

Using bind mounts

```bash
# With the mount flag
docker container run -d --name <container-name> --mount type=bind,source=<source>,target=<target> <image-name>

# Using the volume flag
docker container run -d --name <container-name> -v <source>:<target> <image-name>
```


## Dockerfile
Dockerfiles are instructions on how to build an image. It has the following instructions.

`FROM:` sets the base image.

`RUN:` execute any commands.

`CMD:` default execution of the container. There can only be one at the end of the dockerfile.

`LABEL:` adds metadata to an image.

`EXPOSE:` informs docker that the container listens to the specified network ports at runtime.

`ENV:` set the environment variable <key> to the <value>

`ADD:` copies new files, directories, or remote file URLs from <src> and adds them to the file-system of the image at the path <dest>

`WORKDIR:` set the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it in the Dockerfile.

`ARG:` Defines a variable that users can pass at build-time to the builder with the docker `build` command using the `--build-arg <varname>=<value` flag.

`ONBUILD:` Adds a trigger instruction to the image that executes when the image is used as the base for another build.

`HEALTHCHECK:` Tells docker how to test a container to check that it is still working.

`SHELL:` Allows the default shell used for the shell form of commands to be overridden.

`USER:` Specifies the user that is going to run all the commands (`RUN` and `CMD`)

`VOLUME:` Creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers. 


## Images

Build an image

```bash
docker image built -t <image-name>:<tag>
```

Build an image from a docker repository

```bash
docker image build -t <image-name>:<tag> <git-url>\#<branch>
```

Adding a name and an optional tag

```bash
docker image build -t <name>:<tag>
```

Use the commit hash as the image tag

```bash
git log -1 --pretty=%H
```

Create an image for docker hub

```bash
docker image tag <image-name>:<tag> <username>/<image-name>:<tag>
```

Pushing an image to docker hub

```bash
docker image push <username>/<image-name>:<tag>
```

Show the history of an image

```bash
docker image history <image-name>
```

Export image into a tar file

```bash
docker iamge save <image-name> > <filename>.tar
docker image save <image-name> -o <filename>.tar
```

Loading an image from a tar file

```bash
docker image load < <filename>.tar
docker iamge load -i <filename>.tar
docker image load --input <filename>.tar
```

## Container Management

Display running processes on a container

```bash
docker container top <container-name>
```

Display stats of a docker container

```bash
docker container stats <container-name>
```

To make a container auto restart you can do the following with the flags:

- **no:** do not automatically restart the container (default).
- **on-failure:** restart the container if exits due to an error.
- **always:** always restart the container if it stops.
- **unless-stopped:** similar to always, except that when the container is stopped it is not restarted even after the Dcoker daemon restarts.

```bash
docker container run -d --name <container-name> --restart <flag> <image-name>
```

To get docker events

```bash
docker system events
```

## Docker Compose

Create a compose service

```bash
docker-compose  up -d
```

List containers created by docker-compose

```bash
docker-compose ps
```

Stop a compose service

```bash
docker-compose stop
```

Start a compose service

```bash
docker-compose start
```

Delete a compose service

```bash
docker-compose down
```

Example of a docker-compose.yml file

```yaml
version: '3'
services:
  app-name:
    build:
      context: .
      args:
        - VERSION=v2.0
    ports:
      - "8081:3000"
    environment:
      - NODE_ENV=production
```

Note the following, docker compose has 4 top level keys: version, services, networks and volumes. The version key is mandatory and it's used to define the compose file format. The compose file format is tied to the docker engine version.

# Docker Swarm
Docker Swarm has two major components. The first one is the cluster. This clusters manages one or more Docker nodes. The communication between the nodes is encrypted. The second component is an orchestration engine for creating micro-services.

List all nodes

```bash
docker node ls
```

Inspecting a node

```bash
docker node inspect <node-name>
```

Promoting a worker to a manager

```bash
docker node promote <node-name>
```

Demoting a manager to a worker

```bash
docker node demote <node-name>
```

Removing a node form the swarm

```bash
docker node rm -f <node-name>
```

Have a node leave the swarm

```bash
docker swarm leave
```

Getting the join token 

```bash
docker swarm join-token <worker|manager>
```

Have the node rejoin the swarm

```bash
docker swarm join --token <token> <private-ip>:2377
```

Creating a docker service

```bash
docker service create -d --name <service-name> -p <host-port>:<container-port> --replicas <number-of-replicas> <image-name> <cmd>
```

List all services

```bash
docker service ls
```

Inspecting a service

```bash
docker service inspect <service-name>
```

Getting logs for a service

```bash
docker service logs <service-name>
```

List all tasks of a service

```bash
docker service ps <service-name>
```

Scaling a service up and down

```bash
docker service scale <service-name>=<replicas-number>
```

Updating a service

```bash
docker service update [options] <service-name>
```

Creating a overlay network

```bash
docker network create -d overlay <network-name>
```

Creating a service with an overlay network

```bash
docker service create -d --name <service-name> \
    -p <host-port>:<container-port>  \
    --replicas <replicas-number> \
    <image-name> <cmd>
```

Adding a service to a network

```bash
docker service update --network-add <network-name> <service>
```

Removing a service from a network

```bash
docker service update --network-rm <network-name> <service-name>
```

Adding plugins

```bash
docker plugin install <plugin-name> [options]
```

Listing plugins

```bash
docker plugin ls
```

Disable a plugin

```bash
docker plugin disable <plugin-id>
```

Delete a plugin

```bash
docker plugin rm <plugin-id>
```

To deploy a whole application one could use stacks and docker-compose

```bash
docker stack deploy --compose-file docker-compose.yml <stack-name>
```

## Docker Security

Using a custom seccomp profile

```bash
docker contianer run --security-opt seccomp=<profile> <image-name> <cmd>
```

Dropping capabilities (commands) from a container

```bash
docker container run --cap-drop=<command> <image-name> <cmd>
```

Limiting CPU and Memory

```bash
docker container run -it --cpus=<value> --memory=<value> <size> --memory-swap <value> <size> <image-name> <cmd>
```

### Docker Content Trust

Creating a key

```bash
docker trust key generate <name>
```

Importing a key

```bash
docker trust key load <pem> --name <name>
```

Add signer

```bash
docker trust signer add --key <pem> <name> <repository>
```

Remove signer

```bash
docker trust signer remove <name> <repository>
```

Signing an image

```bash
docker trust sign <image-name>:<tag>
```

### Docker secrets

Creating a secret using STDIN

```bash
STDIN | docker secret create <secret-name>
```

Creating a secret using a file

```bash
docker secret create <name> <file>
```

List secrets

```bash
docker secret ls
```

Inspecting a secret

```bash
docker secret inspect <secret-name>
```

Using a secret

```bash
docker service create --name <service-name> --secret <secret-name> <image-name>
```

Deleting a secret

```bash
docker secret rm <secret-name>
```

