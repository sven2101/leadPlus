# LeadPlus+

This repository contains a software-as-a-service application to manage your leads, generate offers and make sales. 

## 0. Requirements

We use [Spring Boot](https://spring.io/projects/spring-boot) for our server and [AngularJS 1.6.1](https://angularjs.org/) for our frontend. 

It works with the following setup

* Java 8
* PostgresSQL 9.6
* npm 5.0.3
* Gradle 3.2.1

of course you can try it with newer versions.

## 1. Installation
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)

### 1.1 Prepare your environment
Prepare your environment and setup the requirements Java SDK, Postgres database, npm and Gradle on your machine.

### 1.2 Replace passwords, security keys and database name

Search in your project for \_\_PLACEHOLDER\_\_ and you will find all replacable passwords, keys and database names. To run it on your local machine you have to change these keys:


File |      Description     
-------------- | ------------ 
application-local.properties | spring.datasource.url=jdbc:postgresql://localhost:5432/\_\_PLACEHOLDER\_\_ with your database name<br/>spring.datasource.password=\_\_PLACEHOLDER\_\_ with your database password
build.gradle | url = "jdbc:postgresql://localhost:5432/\_\_PLACEHOLDER\_\_" with your database name<br/> password = "\_\_PLACEHOLDER\_\_" with your database password

The other keys are not neccesary for a local environment but **you should set the keys for security reasons!** If you are **not on AWS** you can remove the aws keys. In the `application-xxx.properties` files you can also change some configuration stuff e.g. database user, flyway settings, jwt settings, ...

Make sure that in `application.properties` the profile is set to local:

> spring.profiles.active=local

### 1.3 Build your project

As buildmanager we use gulp and gradle and as packagemanager npm. At first run npm in the `root` directory to install frontend dependencies:

> npm install

it will install the node_modules. After that run gulp in the `root` directory to compile typescript:

> gulp

it will compile typscript and build the frontend in `/src/main/resources/static`.
Now you can run gradle in the `root` directory to build the whole project:

> gradle build

it will generate the `build` directory and a zip file `leadplus-3.4.3.6.zip` within the build directory. 

### 1.4 Start your application

Extract `leadplus-3.4.3.6.zip` to your server or to any place on your local machine and run the jar file:

> java -jar leadplus-3.4.3.6.jar 

now your server is online and you can access the webpage **demo.leadplus.localhost:8080** with the credentials:<br/>

username: superadmin@demo.com<br/>
password: demodemo<br/>
<br/>
or <br/>
<br/>
username: user@demo.com<br/>
password: demodemo<br/>

## 2. Troubleshooting


## 3. License
The files in this repository are under the [GNU General Public License v3.0](LICENSE)
## 4. TODOs

- [x] done
- [ ] not yet


