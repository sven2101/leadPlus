[![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)
# LeadPlus+

This repository contains a software-as-a-service application to manage your leads, generate offers and make sales. 

<img src="photos/manage_leads.png" width="49%"></img> <img src="photos/statistics.png" width="49%"></img>
<img src="photos/templates.png" width="49%"></img> <img src="photos/email.png" width="49%"></img>

## More Features

* Track your own **Tasks** (Assigned leads, offers and sales)
* See all leads, offers and sales organized in an **easy datatable**
* Make **comments** to share information with your team
* **More statistics** like Profit, turnover, leads, offers and sales over a specific time (week, month, year)
* User statistics
* Product statistics 
* **Manage your products** you want to sell
* **Manage your clients** and see the history with them
* Add **apis** for getting leads from external pages (e.g. marketplace) directly in your system
* Manage your own **profile** (picture, phone, skype, ...)

## 0. Requirements

We use [Spring Boot 1.5.0](https://spring.io/projects/spring-boot) for our server and [AngularJS 1.6.1](https://angularjs.org/) for our frontend. 

It works with the following setup

* Java 8
* PostgreSQL 9.6
* npm 5.0.3
* Gradle 3.2.1

-> of course you can try newer versions.

## 1. Installation

### 1.1 Prepare your environment
Prepare your environment and setup the requirements [Java](https://www.java.com/de/download/), [postgreSQL](https://www.postgresql.org/), [npm](https://nodejs.org/en/download/) and [gradle](https://gradle.org/install/) on your machine.
<br>
<br>
**Don't forget to create a database in postgreSQL!** 


### 1.2 Replace passwords, security keys and database name

Search in your project for \_\_PLACEHOLDER\_\_ and you will find all replacable passwords, keys and database names. To run it on your local machine you have to change these keys:


File |      Description     
-------------- | ------------ 
application-local.properties | spring.datasource.platform=postgresql<br>spring.datasource.url=jdbc:postgresql://localhost:5432/\_\_PLACEHOLDER\_\_ <br>spring.datasource.username=postgres<br>spring.datasource.password=\_\_PLACEHOLDER\_\_
build.gradle | flyway{<br>  url = "jdbc:postgresql://localhost:5432/\_\_PLACEHOLDER\_\_"<br>  user = "postgres"<br>  password = "\_\_PLACEHOLDER\_\_"<br>}

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
## 2. Create your own tenant/subdomain

1. To create your own tenant start your server and visit **http://leadplus.localhost:8080/registration** 
2. Fill in the form and you have access to **http://yourtenant.leadplus.localhost:8080**. 
3. Now you can start to track your leads, offers and sales
4. Enjoy!

## 3. More Information


## 4. License
The files in this repository are under the [GNU General Public License v3.0](LICENSE)



