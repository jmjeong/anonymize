A service for posting anonymous messages to Slack Channel. Inspired by [Annona](https://github.com/rounds/annona).

If you are in public channel, `anonymize` posts messages to that channel. If you are in private channel, `anonymize` posts messages to config.public_channel.


## Install 

- git clone https://github.com/jmjeong/anonymize.git
- cd anonymize
- npm install
- [edit] config.json
- `node anonymize.js` or `pm2 start anonymize.js`

## Configure

In slack integrations, add a Slash command, for example, `/anon`. Set the URL in Slack to your service URL. The resulting slack "Token" should be set in `config.json: slack_token`.

Then, in Slack integrations, add a Slash incoming webhook. The resulting "Webhook URL" should be set in `config.json: incoming_slack_webhook`.


### config.json

Copy config.json.sample to config.json and edit it 

```
{
    "port": 5000,
    "slack_token": "xxxxx",
    "public_channel": "#general",
    "incoming_slack_webhook": "https://hooks.slack.com/services/xxxxx/xxxxxxx/xxxxxxxxxxxxxxxx"
}
```

- port: service port to use. default: 5000
- slack_token: Token value from slack integration - Slash command
- public_channel: Use this channel when you posts from private group
- incoming_slack_webhook : Webhook url from slack integration - Incoming Webhooks


## Run

If you send a message in any channel, public or private, like the following:

```
/anon Hello
```
