var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();

app.use('/images', express.static('images'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `sample-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: multerStorage });

app.post("/upload", upload.array("file"), function (req, res) {
    console.log(req.body);
    console.log(req.files);

    res.send("Your uploaded file can be accessed at " + `http://localhost:5000/${(req.files[0].path).replace("\\", "/")}` );
});

var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is running on http://%s:%s', host, port);
});