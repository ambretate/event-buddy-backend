# Event Buddy

Welcome to **Event Buddy!** Event Buddy is a web application that allows you to search and save sports, shows, and music events. It is responsive across desktop and mobile platforms, and is powered by the [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/).

- **Front End Repo:** https://github.com/CIparrea/event_buddy
- **Back End Repo:** https://github.com/ambretate/event-buddy-backend 


## Table of Contents
1. [Site Images](#site-images)
2. [Tech Stack](#tech-stack)
3. [Front End](#front-end)
    1. [Wireframes](#wireframes) 
4. [Back End](#back-end)
    1. [Schema](#schema)
    2. [Endpoints](#endpoints)
4. [Installation](#installation)
5. [Authors](#authors)


## Site Images
<img src=''>
<img src=''>
<img src=''>
<img src=''>


## Tech Stack
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/)
- [Netlify](https://app.netlify.com/login)
- [Heroku](https://www.heroku.com/)


## Front End


### Wireframes


#### Main Page
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/mainPageWF.png'>

#### Search and Filter Events
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/allEventsPageWF.png'>

#### Event Detail
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/eventPageWF.png'>

#### Favorites
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/favoritesPageWF.png'>

#### Sign Up
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/signupPageWF.png'>

#### Log In
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/loginPageWF.png'>

#### Profile
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/profilePageWF.png'>


#### Edit Profile
<img src='https://github.com/CIparrea/event_buddy/blob/main/public/wireframes/efitProfilePageWF.png'>


## Back End


### Schema
#### User Model
- `"firstName"`: User's first name
- `"lastName:`: User's last name
- `"email"`: User's email (must be in email format and unique)
- `"password_digest"`: User's hashed password
- `"savedEvents"`: Array of event ID's favorited by the user


### Endpoints
### /user

| HTTP Method | Route                        | Controller Function   |
|-------------|------------------------------|-----------------------|
| POST        | /sign-up                     | signUp                |
| POST        | /sign-in                     | signIn                |
| GET         | /verify                      | verify                |
| GET         | /saved-events                | getSavedEvents        |
| PUT         | /saved-events/:eventId       | updateSavedEvents     |
| DELETE      | /saved-events/:eventId       | deleteSavedEvents     |
| PUT         | //update-user                | updateUser            |
| DELETE      | /:id                         | deleteUser            |


## Installation
To install Event Buddy:

- Clone the repository
- In your terminal, initialize npm

```
  npm init -y
```
- Install dependencies

```
  npm install
```

- Start the server

```
  npm start
  ```

## Authors
- [Cesar Iparrea](https://github.com/CIparrea)
- [Ambre Tate](https://github.com/ambretate)
