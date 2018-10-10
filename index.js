const http = require('http');
const querystring = require('querystring');
const url = require('url');
var mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {
        // traditional MathJax configuration
    }
});
mjAPI.start();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port);
const server = http.createServer().listen(port);

server.on('request', function (req, res) {
    console.log(req.url);
    const contents = url.parse(req.url);
    if (!contents.search) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{}');
        return;
    }
    const search = querystring.parse(contents.search.slice(1));
    console.log(search.q);
    mjAPI.typeset({
        math: search.q,
        format: search.inline ? "inline-TeX" : "TeX",
        svg: true
    }, function (data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    });
});

console.log('Listening on port 3000');
