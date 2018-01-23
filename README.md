# MyCalculator
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.
A calculator designed with Angular 5 with a Java based backend and uses the Swagger API as its API
<b>To use, utilize your CLI</b>
1) Clone using the git clone https://github.com/dwale/mycalculator.git
2) npm install
3) ng serve

The link for the backend code is https://github.com/dwale/test-api-backend.git

To use , you will need to create a database on your system named calculator using a local server like XAMPP or WAMP.<br/>
Then Start Apache and MySQL<br/>
Package the backend in a .jar file using build automation tools like Maven or Jenkins<br/>
Then in the folder which contains the .jar, create a file in the .yaml file type for the configuration file of the database and copy the following code


# Database settings.
<pre>
database:
  driverClass: org.mariadb.jdbc.Driver
  user: root
  password:
  url: jdbc:mariadb://localhost/calculator
swagger:
  resourcePackage: com.calculator.api.resource
  uriPrefix: /api/v1
  title: Calculator API Endpoints
  description: This is the listing of all the API endpoints of Calculator back end. It lists resource details, operations supported, access methods and request/response format.
server:
  rootPath: /api/v1
config:
  appBaseUrl: http://localhost:8080/api/v1
  </pre><br/>
Then navigate to the location of the .jar file from your CLI<br/>
and run this command Java -jar calculator.snapshot server dev.config.yaml
