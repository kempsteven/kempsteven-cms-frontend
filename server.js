const express = require('express')
// const serveStatic = require('serve-static')

// app = express()

// app.use(serveStatic(__dirname + "/dist"))
const path = require('path')
const history = require('connect-history-api-fallback')
const app = express()
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 5000
app.listen(port)
console.log('server started in port ' + port)