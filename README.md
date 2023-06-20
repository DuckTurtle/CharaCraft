# CharaCraft ![Github license](https://img.shields.io/badge/license-MIT-green.svg)
The aim of the this project was to work as a team to help develop a full stack application that can used to help solve a real world challenge. Through CharaCraft, people can build and store their D&D characters with ease.

## Media
The following link is to this project's github repository


The following link is to this project's live website
[Link to Heroku site]()


## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Contributions](#contributions)
  
## Technologies Used
* HTML
* CSS
* Javscript
* bootstrap
* mysql2
* Sequelize
* connect session sequelize
* express
* express session
* express handlebars
* bcrypt
* dotenv
* uuid
* @3d-dice/dice-box

heavy focus on following the MVC paradigm

## Installation

The following instructions will help you properly install what is needed to run this application <br>

**mysql installation required**

- Rename the `.env.Example` to `.env` and replace the username and password to your own personal mysql account information.
- Open up the terminal within the root directory and run `npm install` to install all the necessary node module dependencies.
- Then run `mysql -u <user> -p` and then enter your mysql password to log into your account.
- Once logged into mysql, run `SOURCE db/schema.sql` to source the database and then `quit` 
- once you quit out of mysql and back into the main terminal, run `npm run seed` to seed your database.

## Usage

- open up the terminal within the root directory and run `npm start`  to start running the application
- once up and running, navigate over to http://localhost:3001/ within your browser.

## License

MIT license 

## Tests

There are no formal tests for this project

## Contributions

the following individuals provided contributions to help the project come to life. Feel free to contact us via giuthubs or our respective emails.

### Quinton Schnell
- Github: https://github.com/duckturtle
- email: qschnell04@gmail.com

### Jason Baker
- Github: https://github.com/jayson-baker
- email: bakej07@gmail.com

### Boyd Stacken
- Github: https://github.com/boydstacken
- email: boydstacken@icloud.com

### Justen Faust
- Github: https://github.com/frostyfaust
- email: justenfaust@gmail.com
