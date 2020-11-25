# Save Twitch Chat

This is a simple Node.js app which saves <a href="https://twitch.tv/" target="_blank">Twitch.tv</a> chat into <a href="https://aws.amazon.com/dynamodb/" target="_blank">AWS DynamoDB</a>

### Install
```bash
npm install
```

### Set Environment Variables
```bash
export AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="AWS_SECRET_KEY"
export USERNAME="TWITCH_BOT_USERNAME"
export PASSWORD="TWITCH_BOT_PASSWORD"
export CHANNEL="TARGET_CHANNEL"
export TABLE="DYNAMODB_TABLE_NAME"
```

### Run
```bash
node app.js
```
