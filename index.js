/**
 * Created by manojmali1 on 06/10/16.
 */

var Consumer = require('sqs-consumer')
const request = require('request')
const AWS = require('aws-sdk')

const accessKeyId   =  process.env['ACCESS_KEY_ID']
const secretAccessKey =  process.env['SECRET_ACCESS_KEY']


//this is for testing and backward compatibility
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  })

var app = Consumer.create({
  queueUrl: process.env['QUEUE_NAME'],
  handleMessage: function (message, done) {
    // do some work with `message`
    console.log(message)
    var url = process.env['REQUEST_URL']

    request.post({
      headers: {'content-type': 'text/plain'},
      url:url, body: message.Body
    }, function (err, data) {
      console.log(err)
      console.log(data)
    })
    done();
  },
  sqs: new AWS.SQS({
    region: 'us-east-1',
    apiVersion: '2012-11-05',
    endpoint: process.env['SQS_ENDPOINT']
  })
});

app.on('error', function (err) {
  console.log(err.message);
});

app.start()