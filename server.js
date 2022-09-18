`use strict`;
const express = require('express');
const cors = require('cors');
const app = express();
const postRuoter = require('./routes/post.route');
const commentPouter = require('./routes/comment.route')
const heandleError = require('./error-handlers/500');
const heandleErrorPageNotFound = require('./error-handlers/404');

app.use(cors());
app.use(express.json());
app.use(postRuoter);
app.use(commentPouter);

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "hello word"
    }).catch(next('page not found'));
});

function start(port) {
    app.listen(port, () => { console.log(`the server start for port ${port}`) });
}
app.use(heandleErrorPageNotFound);
app.use(heandleError);
module.exports = {
    start,
    app
};