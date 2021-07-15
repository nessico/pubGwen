<h3 align="center">Welcome to Gwen`s  Wedding Boutiques 👋</h3>

### ✨ [Demo](http://gwenecbl1.us-east-2.elasticbeanstalk.com)

May be down due to the cost of hosting on AWS

# Table of contents

- [Features](#Features)
- [Tech](#Tech)
- [Architecture](#Architecture)
- [Design Patterns](#Design-Patterns)
- [Install](#Install)

## Features

> E-Commerce full-stack application built on .NET and Angular, deployed on AWS

- Login and registration form with Angular Reactive forms
- Employees are publicly visible, can manage their profile, upload photos of their work, like other users, and message each other
- Customers are privately hidden, are able to save items, and purchase items
- Store with baskets, orders, and checkouts
- Pagination, sorting, and filtering for store items and employees with IQueryables

## Tech

- PayPal API for payment processing
- Cloudinary API for media management
- SignalR API for real-time online presence, live chat, and notifications
- Fluent API and AutoMapper to map table references and relationships
- Rxjs for persistent client side storage with caching to optimize performance and mapping observables with pipe
- Redis for in-memory cache to store customer basket
- AWS EC2 linux instance for deployment , AWS RDS for database, AWS CodeBuild and CodePipeline for CI/CD pipeline
- Angular and BootStrap modules for styling, e.g. toastr, ngx-bootstrap
- MS SQL Server for database management -> migrated to PostGreSQL PgAdmin for deployment costs

--

- Identity and Role Management using ASPNET.Identity with hashed and salted passwords for users
- JWT for user authentication, SSL to encrypt incoming user information
- Angular route/auth guards, client-side form validation, API-side data annotations validation, DTOs to encapsulate properties from client
- etc...

## Architecture

> Follows Domain-Driven Design (DDD) and SOLID principles:

Adhered to Microsoft`s Clean Architecture:

| Layer          | Description                                                   | Dependency                                                    |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| API            | handles HTTP requests and responses                           | infrastructure layer, transitive dependency on the core layer |
| Infrastructure | queries database, contains data migrations, repositories, etc | core layer                                                    |
| Core           | contains business models, entities, etc                       | none                                                          |

`I did this to make my app scalable; easier to maintain, read, and update`
![](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/media/image5-7.png)

## Design Patterns

Implemented design patterns:

| Pattern              | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| Singleton            | api                                                                          |
| Repository           | api                                                                          |
| Unit Of Work         | api                                                                          |
| Observable           | client for async pipe , use $ at end of varname to identify it as observable |
| ?                    | Http Client                                                                  |
| service locator      | api                                                                          |
| Dependency Injection | api and client                                                               |
| Promise              | client async send message in message.service.ts cant sub to a promise        |
| Specification        | GenericRepository with specific pattern to avoid leaky abstractions          |

## Install

```sh
install a Redis docker developer with
	docker run --name redisdev -d -p 6379:6379 redis
install a PostgreSQL docker developer server with
	docker run --name dev -POSTGRES-USER=appuser -e POSTGRES_PASSWORD=PA$$W0RD -p 5432:5432 -d postgres
1st terminal: cd into API folder and type: dotnet run
2nd terminal: cd into client folder and type: ng serve
use https://localhost:4200 in your preferred browser

```

## Author

😊 [@nessico](https://github.com/nessico)
Thanks for reading! ⭐️

-README still under construction
