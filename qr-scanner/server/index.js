const mqtt = require("mqtt");
const say = require('say');


const DEVICE_ID = '1234';
const TOPIC = `amnil/process-payment/${DEVICE_ID}`;

const client = mqtt.connect("mqtt://test.mosquitto.org");
client.on("connect", () => {
    client.subscribe(`${TOPIC}`, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${TOPIC}`);
        }
    });
});

client.on("message", (topic, message) => {
    // message is Buffer
    const payload = JSON.parse(message.toString());
    const rupees = Math.floor(payload.amount);    
    let audio = `${rupees} rupees `;

    let paisa = payload.amount - rupees;
    if(paisa > 0){
        paisa = Math.floor(paisa * 100);
        audio += `and ${paisa} paisa`
    }
    audio += "Received";
    say.speak(`${audio}`);
});