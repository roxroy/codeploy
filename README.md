# Codeploy
Keep track of web development jobs you've applied to and utilize job-ready resources added and reviewed by fellow web dev job-seekers. Resources rated and, if aided someone in getting the job, given Gold Star status. Log in with GitHub.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install to run the app:

- Node
- MongoDB

### Installing

Get the repository

```
git clone https://github.com/roxroy/codeploy.git
cd codeploy
npm install
```

Make a copy of `env.example` as `.env`
```
cp env.example .env
```
Update the corresponding keys and credentials.


In a new terminal, go to the project folder, create a data folder and start mongo
```
mkdir data
mongod --dbpath=./data
```

In a new terminal, go to the project folder (folder with server.js) and run the following:
```
npm run start
```

Access the app through the browser, http://localhost:3000.

## Deployment

Release build is optimized for deployment to Heroku and MLab. Don't forget to set environment variables on Heroku from .env.

## Built With

* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [Express.js](https://expressjs.com/) - Web application framework
* [Node.js](https://nodejs.org/en/) - Platform for network applications

## Contributing

Please open any issues that you encounter on [the GitHub repo issue page](https://github.com/roxroy/camper-stockcharts/issues).

## Authors

* **Roxroy** - [roxroy](https://github.com/roxroy)


## Acknowledgments

* Hat tip to anyone who's code was used
* [Readme template used](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
