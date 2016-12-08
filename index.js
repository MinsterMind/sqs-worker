/**
 * Created by manojmali1 on 06/10/16.
 */

var Consumer = require('sqs-consumer');
const request = require('request')
const AWS = require('aws-sdk')

const accessKeyId   =  'frfre'
const secretAccessKey =  'wfwf'


//this is for testing and backward compatibility
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  })

var app = Consumer.create({
  queueUrl: process.env['QUEUE_NAME'], //'http://192.168.10.196:4568/contentTest',
  handleMessage: function (message, done) {
    // do some work with `message`
    console.log(message)
    var url = process.env['REQUEST_URL']//'http://127.0.0.1:8000/content-engine/task/1.0/fetch-content'

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
    endpoint: process.env['SQS_ENDPOINT']//'http://192.168.10.196:4568'
  })
});

app.on('error', function (err) {
  console.log(err.message);
});

app.start()

//var app1 = Consumer.create({
//  queueUrl: 'http://192.168.10.196:4568/scraperTest',
//  handleMessage: function (message, done) {
//    // do some work with `message`
//    console.log(message)
//    var url = 'http://127.0.0.1:5000/content-engine/task/1.0/scrape-links'
//
//    request.post({
//      headers: {'content-type': 'text/plain'},
//      url:url, body: message.Body
//    }, function (err, data) {
//
//    })
//    done();
//  },
//  sqs: new AWS.SQS({
//    region: 'us-east-1',
//    apiVersion: '2012-11-05',
//    endpoint: 'http://192.168.10.196:4568'
//  })
//});
//
//app1.on('error', function (err) {
//  console.log(err.message);
//});
//
//app.start();
//app1.start();