const express = require('express');
const mqtt = require("mqtt");
const app = express();

app.use(express.json());

const client = mqtt.connect("mqtt://test.mosquitto.org");
const TOPIC = "amnil/process-payment";



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/process-payment', (req, res) => {
  if(!client.connected){
    client.connect();
  }
  client.publish(`${TOPIC}/${req.body.deviceId}`, JSON.stringify(req.body));
  res.send({success: true});  
});




app.listen(3000, () => console.log('Example app is listening on port 3000.'));