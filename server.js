const express = require('express');
const session = require('express-session');
const routes = require('./controllers/');
const path = require('path')
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Not For U',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure:false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create ({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(routes);

app.listen(PORT, () => {
  console.log("we do be hearing");
  sequelize.sync({ force: false })
})