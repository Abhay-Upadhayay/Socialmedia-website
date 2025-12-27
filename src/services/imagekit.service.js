
const config = require("../config/config")
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : config.PUBLIC_KEY,
    privateKey : config.PRIVATE_KEY,
    urlEndpoint : config.URL_ENDPOINT
});



module.exports = imagekit