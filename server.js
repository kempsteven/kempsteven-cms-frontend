const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))

/*
* Added app.use(staticFileMiddleware) twice because;
* To handle rewrites without the dot rule, you should include the static middleware twice as shown below.
* The first usage of the static file middleware will catch the majority of the static file requests.
* Next, we include the connect-history-api-fallback which will rewrite requests to index.html when necessary.
* At last, we include the static file middleware again so that rewritten requests can be served.
*/
app.use(staticFileMiddleware)

app.use(history({
    disableDotRule: true,
    verbose: true
}))

app.use(staticFileMiddleware)

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'))
})

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port
    console.log("App now running on port", port)
})