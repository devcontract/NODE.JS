   # NODE.JS

OS System macOS Mojave V. 10.14.3

## Getting Started

These instructions will guide you how get the project up and running on your local machine for development and testing purposes.

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

To start Mongodb server on port 27017 run following commands:

```
mongod --port 27017
```


To stop mongoDB server press :

```
ctrl+c
```
To check if Mongo db server is running open new treminal window and there access mongo DB shell:

```
mongo
```

Default MongoDB Port

The following table lists the default TCP ports used by MongoDB:

Default Port	Description

```
27017	The default port for mongod and mongos instances. You can change this port with port or --port.
27018	The default port for mongod when running with --shardsvr command-line option or the shardsvr value for the clusterRole setting in a configuration file.
27019	The default port for mongod when running with --configsvr command-line option or the configsvr value for the clusterRole setting in a configuration file.
```

If you have any problems starting Mongo DB server , you can check if it is already running and kill the process by following command:

```
$ pgrep mongo
30588
$ kill 30588

```
first command will get process id , second kills the process


Now lets install Node JS.Use this command in terminal:

```
brew install node
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

## Author 

School 

**Feel free** to use these materials for edicational or any other purpose. 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

