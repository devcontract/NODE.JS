# NODE.JS


OS System macOS Mojave V. 10.14.3

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

As this project involves usage of Mongodb database as well as node js server setup .

### Installing

Let`s get started with Mongodb installation with Homebrew.

```
brew update 

brew install mongodb

mkdir -p /data/db
```

Make sure that the /data/db directory has the right permissions by running

```
sudo chown -R `id -un` /data/db
```

To start Mongodb server run following commands:

```
mongod
```


By default Mongodb is listening port 27017 

```
...waiting for connections on port 27017
```

To stop mongoDB server press :

```
ctrl+c
```


Now lets install Node JS.Use this command in terminal:

```
brew install node
```

Now we need to download repo from github https://github.com/devcontract/buy.git lets say we want to have it in ~/Documents/server/repo :

```
mkdir ~/Documents/server/
cd ~/Documents/server/
svn export https://github.com/devcontract/buy.git/branches/login_access_point/node_lessons/signup3_post_verification_mongo_expiry_config/ 
cd signup3_post_verification_mongo_expiry_config/
```

Install node packet manager if it is not installed :

```
brew install npm

```

Now install all dependencies with node packet manager:

```
npm install
```

You will need to create .env file in folder with the following content :

```
MAIL_SERVICE = gmail
EMAIL_USER_NAME = gmail@gmail.com
EMAIL_PASSWORD = email password
DB_PATH = mongodb://localhost:27017/signup
RECORD_EXPIRY_TIME = 2
```

## Running the tests


```
npm start
```

You should be able to access your server:

```
http://127.0.0.1:3000/user/signup
```

## Authors

* **Konstantin Kuzmenko** - *Node JS example * 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Some of the material was taken from here https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w 