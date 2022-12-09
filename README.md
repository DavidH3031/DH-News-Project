# DH News

<a>https://dh-news.netlify.app</a>

This is the repo for the frontend of my recent project in which i have created a News Article site. You will find many useful features such as being able to **upvote comments**, **post new comments**, **vote** on articles which you agree/disagree with and many more.

## Introduction

### Technology used:

- React v18.2.0
- React-router-dome v6.4.4
- axios v1.2.0
- create-react-app
- Node v19.0.0

### Backend

This project uses a custom backend created by me here: (https://github.com/DavidH3031/NC-News-DH)

All information on that is within the repo linked but as an overview the technology used is as follows:

- Express.JS
- NodeJS
- PostgreSQL

## Endpoints

**All of these will be relative paths which should be appended onto the base URL as provided above.**

- **/** - This is the homepage which you will be taken to on accessing the site. Here you will be able to view a list of all articles and sort by whatever you like! You can also create an article from here if you are on a desktop computer with a big enough screen. For those of you on mobile there is a button in the navbar which will redirect you to our next endpoint.

- **/create** - This page is very simple and will move the create artcile box to a single page to allow for a more focused approach while creating a new article. This will be the primary way for users on mobile to use this feature due to lack of screenspace on the homepage. Please note that if the specified topic does not exist you will be asked to provide a description. **Both** of these fields must be populated.

- **/topics** - This page is where you will able to sort by your favourite topics, click on which ever you like and it will redirect you to a new page at /topics/\<topic>.

- **/topics/\<topic>** - This is how you will view all articles for the relevant topic giving you the same options as the homepage to sort by and create a new article.

- **/articles/\<article_id>** - This will be for specific articles that you wish to view. There is no need to try and remember any of these as you can simply click an article from the list and it will take you straight here! On this page you will be able to view the main content of the article, vote on whether you agree or disagree and even add your own comments which you can delete at any moment.

## Future features

- **Sign up** - I am hoping to add a sign up page to allow anyone to create new users. This would be passwordless and you will simply need a username and an avatar url.

- **Delete article** - Soon there will be an option to delete an article in which you are the **owner** of.

## Set-up for self-hosting.

To host this app yourself you can do so by following these instructions:

- Click the green Code button at the top of the repo.

- Copy the link that shows and looks something like this (https://github.com/DavidH3031/DH-News-Project).

- Open the terminal where ever you would like to store the files and type the following.

```
git clone https://github.com/DavidH3031/DH-News-Project
```

- Once that has completed you must install the dependencies by typing.

```
npm install
```

- This should install everything you need for to run it yourself which you can do by going back to the console and typing this script.

```
npm start
```

# Requirements

- NodeJS - v19.0.0
