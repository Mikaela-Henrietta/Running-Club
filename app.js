const express = require('express')
const app = express()
const hbs = require('express-hbs');
const hostname = '0.0.0.0';
const port = 8080;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet')
const path = require('path');
const {seedUsers} = require('./models/db')
const csurf = require('csurf')

app.use(helmet())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front-end/build')));
app.use(expressSanitizer());
app.use(csurf({cookie: true, value: (req) => (req.cookies.csrfToken)}));

seedUsers()

const appRoutes = require('./router.js')(app)
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});