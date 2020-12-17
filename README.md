![][homePage]

# Assignment 1 - ReactJS app.

Name: Dimtiri Saridakis

## Features.

 I didn't do the Movies Fan App as given to us to improve on. Instead, I implemented my own Table Booking App to be used by staff to keep track of table bookings and times.

 + The app has full authentication provided by a custom server script running a json-server to provide access to the users.json db. 
 + Authentication is provided by way of user's email address and password with is sent to the authentication server to validate. Upon validation a JWT is created and sent back,
 + A second json-server is deployed for the tables database, keeping the users details seperate from data.
 + The routes to all views are safeguarded by a custom ProtectedRoutes component. Access to all views with the exception of the Login page require the user to be autherised.
 + The JWT access token expires after one hour, thereby needing a sign in again after the hour.
 + Upon successful login, you are directed to the home/ tableview page. A list of all tables with booking information is displayed as a dynamic array of cards that is fetched from the database.
+ The options header has three options, An add table to database view, a book table view and a log out button.
+ The add tables view has a Material UI input form with an option for Table ID and a multi select dropdown that offers a list of time slots for which this table is available for booking. 
+ Upon selection of all relevant time slots and submittal a POST request is made to the server and the table is added.
+ Moving back to the home page the table cards are rerendered with the new addition.
+ The table booking page brings you to a form using a useForm hook with some validation and some error messages with another dropdown to select the table and the Time slot from that table. This page is not functional as of yet.
+ The log out button, removes the token from local storage and sends the user back to the login page.
+ The majority of the App is styled using Material use and JSS making use of makeStyle and useStyle.

## Setup requirements.

To run you can 
> npm install 
Then run
> npm run dev
This command will run all start up scripts concurrently.

Once the app is running using 
Email address:
> johndoe@abc.com
With password 
> 123456789

Will allow for login.
## API Data Model.

+ http://localhost:3035/auth/login - this is the login endpoint to POST requests for autherisation tokens. 
+ http://localhost:3030/tables/ - this is the link to POST the tables to the database, it also GETs the tables in the db
+ http://localhost:3030/tables/${id} -  the link to GET the tables by ID


## App Design.
 The app has full authentication provided by a custom server script running a json-server to provide access to the users.json db. 
 Authentication is provided by way of user's email address and password with is sent to the authentication server to validate. 
 Upon validation a JWT is created and sent back the user is then autherised to view the rest of the app
 A second json-server is deployed for the tables database, keeping the users details seperate from data.
 The routes to all views are safeguarded by a custom ProtectedRoutes component. Access to all views with the exception of the Login page require the user to be autherised.
 The JWT access token expires after one hour, thereby needing a sign in again after the hour.

 Upon successful login, you are directed to the home/ tableview page. A list of all tables with booking information is displayed as a dynamic array of cards that is fetched from the database.
The options header has three options, An add table to database view, a book table view and a log out button.

The add tables view has a Material UI input form with an option for Table ID and a multi select dropdown that offers a list of time slots for which this table is available for booking. 
Upon selection of all relevant time slots and submittal a POST request is made to the server and the table is added.
Moving back to the home page the table cards are rerendered with the new addition.

The table booking page brings you to a form using a useForm hook with some validation and some error messages with another dropdown to select the table and the Time slot from that table. This page is not functional as of yet.

The log out button, removes the token from local storage and sends the user back to the login page.
The majority of the App is styled using Material use and JSS making use of makeStyle and useStyle.


### UI Design.

...... Insert screenshots of the new/modified views you have added to the Movies Fan app. Include a caption for each one clearly stating its purpose and any user interaction it supports ........
![][bookTablePage]
> This is the book tables page.

![][addTablePage]
> This is the add tables page.

![][loginPage]
> This is the login page. 

## Routing.

+ /login/ 
No authentication
+ /home/
Requires Authentication
+ /bookingPage/
Requires Authentication
+ /addTablePage/
Requires Authentication


## Independent learning (If relevant).

+ I used Material UI for design
+ Json-server for server functionality
+ Custom protected routes
+ Authentication with JWT tokens
+ useForm hook
+ POST operations and fetch headers


# for form submit and navigation using history
https://stackoverflow.com/questions/54579730/react-hooks-with-react-router-v4-how-do-i-redirect-to-another-route

# command for staring json auth server
json-server db.json --port 3030 -m ./node_modules/json-server-auth
ref:
https://www.npmjs.com/package/json-server-auth

# for private routes
https://medium.com/javascript-in-plain-english/how-to-set-up-protected-routes-in-your-react-application-a3254deda380

# for some nice housekeeping involving the servers
https://medium.com/@joelazarz/using-concurrently-with-json-server-and-your-react-app-3d07487acc50

# websites for autherisation header and token code
https://www.loginradius.com/engineering/blog/everything-you-want-to-know-about-authorization-headers/

https://flaviocopes.com/axios-send-authorization-header/


https://jwt.io/introduction/
# code for the authentication
https://www.techiediaries.com/fake-api-jwt-json-server/


# inspiration and starting point
https://www.freecodecamp.org/news/build-a-react-hooks-front-end-app-with-routing-and-authentication/
https://www.freecodecamp.org/news/state-management-with-react-hooks/
https://medium.com/javascript-in-plain-english/authentication-in-react-caf2abfa0494
---------------------------------

[model]: ./data.jpg
[movieDetail]: ./public/movieDetail.png
[review]: ./public/review.png
[reviewLink]: ./public/reviewLink.png
[cardLink]: ./public/cardLink.png
[stories]: ./public/storybook.png