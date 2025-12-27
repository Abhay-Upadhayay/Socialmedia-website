const app = require('./src/app');
const connectDB = require('./src/db/db');
const config = require('./src/config/config');

const port = config.PORT || 3000

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("server is listening at port number 8080");
        connectDB();
    }
})