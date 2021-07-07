<h2 align="center">Welcome to Gwen`s  Wedding Boutiques 👋</h2>
<p>
</p>


### ✨ [Demo](http://gwenecbl1.us-east-2.elasticbeanstalk.com/) 
May be down due to the cost of hosting on AWS
    


### Features
> E-Commerce full-stack application built on .NET and Angular, deployed on AWS

--
- Login and registration form with Angular Reactive forms
- Employees are publically visible, can manage their profile, upload photos of their work, like other users, and message each other
- Customers are privately hidden, are able to save items, and purchase items
- Store with baskets, orders, and checkouts
- Pagination, sorting, and filtering for store items and employees with IQueryables

--
- PayPal API for payment processing
- Cloudinary API for media management
- SignalR API for real-time online presence, live chat, and notifications
- Fluent API and AutoMapper to map data references and relationships
- Rxjs for persistent client side storage with caching to optimize performance
- Redis
- AWS EC2 linux instance for deployment , AWS RDS for database, AWS CodeBuild and CodePipeline for CI/CD pipeline
- Angular and BootStrap modules for styling, e.g. toastr, ngx-bootstrap
- MS SQL Server for database management -> migrated to PostGreSQL PgAdmin for deployment costs

--

- Identity and Role Management with ASPNET.Identity with hashed and salted passwords for users
- JWT for user authentication, SSL to encrpyt incoming user information
- Angular route/auth guards, client-side form validation, API-side data annotations validation, DTOs to encapsulate properties from client
- etc... 


### Architecture and Design Patterns
> Follows Domain-Driven Design (DDD) and SOLID principles 

+ Adhered to Microsoft`s Clean Architecture:
	+ API - handles HTTP requests and responses
		- has dependency on infrastructure layer, therefore has a transitive dependency on the core layer
	+ Infrastructure - queries the database and contains our data migrations, repositories, etc
		- has dependency on core layer
	+ Core - contains business models, entities, etc
		- does not depend on anything
		

`I did this to make my app extensible, easier to maintain, read, and update`
		
![](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/media/image5-7.png)

<p>
</p>
+ Implemented the following design patterns:

	singleton  - client 
repository pattern - api
unit of work pattern - api
observable pattern - client  for async pipe , use $ at end of varname to identify it as 
pattern - HTTP client
service locator pattern - api
dependency injection pattern - api & client
promise pattern - client async sendmessage in message.service.ts cant sub to a promise
Generic Repository with Specification pattern to avoid leaky abstractions
Specification pattern
etc... 


## Install

```sh
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

