/**
* Twitch Docs: https://dev.twitch.tv/docs/irc
* AWS Docs: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
*/

const tmi = require('tmi.js');
const AWS = require("aws-sdk");

const region = "eu-west-1"

AWS.config.update({
    region: region,
    endpoint: `https://dynamodb.${region}.amazonaws.com`
});

const docClient = new AWS.DynamoDB.DocumentClient();

const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [
    process.env.CHANNEL
  ]
};

const table = process.env.TABLE;
const dataParams = {
    TableName: table,
    Item: {
        message_id: "",
        timestamp: "",
        context: {
            message_text: "",
            username: "",
            subscriber: false,
            user_id: ""
        }
    }
}

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const chatMessage = msg.trim();

    console.log(chatMessage, context);

    dataParams.Item.message_id = context.id;
    dataParams.Item.timestamp = parseInt(context['tmi-sent-ts']);
    dataParams.Item.context.message_text = chatMessage;
    dataParams.Item.context.username = context.username;
    dataParams.Item.context.subscriber = context.subscriber;
    dataParams.Item.context.user_id = context['user-id'];

    console.log("Adding a new item...");
    docClient.put(dataParams, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}