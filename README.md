<h3 align="center">Welcome to Gwen`s Ecommerce Boutique Store 👋</h3>

### ✨ [Demo](http://ecomm3.us-east-1.elasticbeanstalk.com)
Use seeded logins, e.g. | User: ada@test.com Pass: Pa$$w0rd
        
# Table of contents

- [Features](#Features)
- [Tech](#Tech)
- [Architecture](#Architecture)
- [Design Patterns](#Design-Patterns)
- [Install](#Install)

## Features

> E-Commerce full-stack application built on .NET and Angular, deployed on AWS 

- Login and registration with Angular Reactive forms
- Members can manage their profile, upload photos, like other users, and message each other
- Shop with baskets, orders, and checkouts
- Pagination, sorting, and filtering for store items and members with IQueryables

## Tech

- Stripe API for payment processing
- Cloudinary API for media management
- SignalR API for real-time online presence, live chat, and notifications
- Fluent API and AutoMapper to map table references and relationships
- Rxjs and tokens in local storage for client persistence along with caching to optimize performance and mapping observables with pipe
- Redis for in-memory cache to load data faster, deployed inside the AWS EC2 instance
- AWS EC2 linux instance for deployment , AWS RDS for PostgreSQL database, AWS CodeBuild and CodePipeline for CI/CD pipeline 
- Angular and BootStrap modules for styling, e.g. toastr, ngx-bootstrap
- PostGreSQL relational database from Entity Framework migration

--

- Identity and Role Management using ASPNET.Identity with hashed and salted passwords for users
- JWT for user authentication, SSL to encrypt incoming user information
- Angular route/auth guards, client-side form validation along with async API validators, API-side data annotations validation, DTOs to encapsulate properties from client
- Scalable and maintainable architecture with clean code and inline documentation
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

| Pattern             |Where  | Description                                                                  | 
| --------------------| -| ---------------------------------------------------------------------------- |
| Singleton            | API | Ensures a single instance of an object with a global access point, used for Redis cache
| Repository           |  API |Allows changing between domain model and database model independently, which is great for code maintenance|
| Unit Of Work         | API | Ensures that multiple repositories will use the same DbContext, tracking all saved changes to a single point                                                                   ||
| Service locator      | API    | Direct a class to only consume a single service to reduce the number of seen dependencies|
| Specification        | API|GenericRepository with Specification pattern to avoid leaky abstractions|
| DTO        |    API   |Enterprise application architecture pattern to serialize, encapsulate, validate, model data  |
| Dependency Injection | API & Client                                                               |Achieves Inversion of Control (IoC) to reduce coupling which helps with isolating design changes to the client to promote reuseable, testable, and clean code.|
| Observer           | Client  | Angular observables to manages async data, can use Rxjs Operators and Async pipe, etc  before subscribing| 
| Step Builder           |Client   | Leads user step by step to create an object so there is no margin for error (extension of builder pattern; implemented through Angular Form Wizard)  | 
| etc           |   |  | 

## Install

```sh
install a Redis docker developer with
	docker run --name redisdev -d -p 6379:6379 redis
install a PostgreSQL docker developer server with
	docker run --name dev -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=Pa$$w0rd -p 5432:5432 -d postgres
1st terminal: cd into API folder and type: dotnet run
2nd terminal: cd into client folder and type: ng serve
use https://localhost:4200 or https://localhost:5001 in your preferred browser

```

## Things I could've Improved on
- Broken up my larger early commits to atomic commits whenever functionality was added
    - i.e. commit 083a963, feat(API): repository pattern, AutoMapper, extensions; should've been broken into three separate commits
    - I transitioned to atomic-style commits after realizing that larger commits painfully increased debugging time and decreased code readability/maintainability.

## Author

😊 [@nessico](https://github.com/nessico)
Thanks for reading! ⭐️

-README still under construction
