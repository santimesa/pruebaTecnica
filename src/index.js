import app from "./apps";


app.listen(app.get('port'));


console.log('server',app.get('port'));