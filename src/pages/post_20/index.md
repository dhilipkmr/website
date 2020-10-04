---
path: "/blogs/node-email-service-using-aws-lambda"
date: "2020-10-03"
title: "A Node Email Service using AWS lambda"
author: "Dhilip kumar"
timeToRead: "5"
smallTitle: "NodeJs Email Service"
description: "Creating a Node Emailer service using AWS lambda for Backend"
postNum: "20"
---

<img src="./cover_20.png"/>
<br/>


Hello there,

It is always so rewarding when you achieve something after long research. And this is one such instance as I had to at least read 40+ blogs to finally set up a fully running Mailing service. So just thought of collating everything together in a blog to help lambda newbies like me.

Prerequisites:
- Javascript
- A Gmail account

## The Problem:

Having `Contact Me` like the one below is an integral part of most of the personal and small business websites that are built.

![](https://dev-to-uploads.s3.amazonaws.com/i/th7n1yci4rwqagmzojbu.png)

I was building one such website, as the entire website is static, I honestly do not want to set up a server just to expose a single endpoint.

## The solution:

I know that `cloud functions` are something that solves my problem of having an endpoint without actually setting up the server. I chose AWS Lambda as it was much popular. But, the resources and blogs were not enough to give me a step by step guideline.  

## What are we building?
We are going to build a node emailer service that accepts a `message` in our POST request body and triggers an email to the predefined set of recipients from your Gmail account.


### Table Of Contents
 - [AWS Account Setup](#t1)
 - [Setting up Lambda](#t2)
 - [Uploading the emailer code to your lambda](#t3)
 - [Google Oauth and GCP Setup](#t4)
 - [Update the keys in your Code](#t5)
 - [Creating AWS API Gateway](#t6)
    
### 1.AWS Account Setup:<a name="t1"></a>
 Create an AWS account [here](https://portal.aws.amazon.com/billing/signup#/start). Your account setup will be complete with you entering your Credit card details and verifying your email. Charges are usage-based.

### 2.Setting up Lambda:<a name="t2"></a>
 - Naviagte to [AWS Console](https://console.aws.amazon.com/console/home?region=us-east-1)
 - Choose `Lambda` under the `Find Services` input field.
 - You should now be on the lambda functions dashboard which shows the list of your available lambda functions.
 - Click on the `Create Function` button
 - In the next screen, fill in your Function name - `emailer` and choose Nodejs runtime as we are implementing this using node.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/k929hspojj9k4oi2so05.png)

 - On Clicking the `Create function` button you should see `Successfully created the function emailer` message on the next screen.
 - On scrolling down the page, you will see a sample nodeJS code with index.js
 - Create a new test with any name of your choice and click on the `Test` button, you should be getting the response in the `Execution Result` tab.

### 3.Uploading the emailer code to your lambda: <a name="t3"></a>
 The Aws lambda IDE for nodeJS does not allow us to install our npm packages on the go. Due to this, we have to get this set up locally in our machine and then upload the code to lambda by zipping it.
 - Download the [Zip](https://github.com/dhilipkmr/emailer-aws/raw/download/Archive.zip). It contains the code to be uploaded to your lambda function.
 - If you want to create the zip, the content is present inside this [repo](https://github.com/dhilipkmr/emailer-aws) where there are a `nodemailer` dependency and some code to send an email. Make sure to npm install and create a zip from the root directory including your `node_modules` folder.
 - Once you got the Zip, upload it to the AWS lambda using `Actions` -> `Upload a .zip file` option.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/lwxmw81evjnr0tibxlh4.png)

 - If you open `index.js` you should be able to see the code where we have given our Email credentials and sending an email.
 - Headers are set to handle CORS errors if you try hitting your lambda from another origin.

### 4. Google Oauth and GCP Setup:<a name="t4"></a>
 - You need to set the following auth keys in order to confirm that you are the owner of your email account.

``` js
{
	clientId: '<YOUR_CLIENT_ID>',
	clientSecret: '<YOUR_CLIENT_SECRET>',
	refreshToken: '<YOUR_REFRESH_TOKEN>',
	accessToken: '<YOUR_ACCESS_TOKEN>'
}

```
 - In order to do that this we need to get our Oauth credentials from our GCP project and then use that in Google OAuth playground to generate these keys against your email.

I know it could be a lot of jargon. But trust me it is simple.

#### Setting up GCP:
 - So login to [Google Cloud](https://console.cloud.google.com/) and create a new project.
 - Click on `Select Project` and then `Create new project` button.
 - Name it `mailer` and click on `create`.
 - In your mailer project goto APIs & Services -> Credentials -> Create Credentials -> OAuth Client ID -> Configure Content Screen -> External -> Create
 - Again goto Create Credentials -> OAuth Client ID -> Web Application -> Enter Application Name -> Choose `https://developers.google.com/oauthplayground` as Authorised redirect URIs and Save it.
 - Now you should be getting a popup with your `clientID` and `clientSecret` copy both.
 
#### Setting up OAUTH:
 - Navigate to [Google OAuth Playground](https://developers.google.com/oauthplayground/)
 - Click on Setting icon on the top right corner  -> Enable Use your own OAuth credentials > Enter OAuth `clientID` & Oatuh `clientSecret` that you got from the above steps -> Close.
 - In Select & Authorize APIs Field, Type `https://mail.google.com` -> Authorize APIs -> Login with the account that you want to send email from.
 - Click on Exchange authorization code for tokens -> Copy Refresh Token and Access Token.

### 5. Update the keys in your Code:<a name="t5"></a>
Now we got all the keys needed.
Now update your `clientId`, `clientSecret`, `refreshToken`, and `accessToken` and your Full email ID in the AWS Lambda code.

- Click `Deploy` -> `Test` -> Configure your test to include `message` parameter.

- You should get an email with your message on clicking `Test`.

### 6. Creating AWS API Gateway:<a name="t6"></a>
 - Create an API to expose this lambda function as a service.
 - Click on Services -> API gateway service from the search bar -> Create API -> REST API -> Build -> API name -> Create.
 - You should be on this screen now.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/wzayi8abnyveffde579n.png)

 - We need two methods to be created. 1.POST and 2.OPTIONS to handle CORS.

#### Creating POST:
 - Actions -> Create Method -> POST -> TICK -> Integration type
 -> Lambda -> Lambda Function -> emailer -> Save -> OK.
 - We need to allow few Headers so that they could be read by the client.
 - Method Response -> Expand the Accordion next to 200.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/mislfjpqvqcp95zwjg8k.png)

Add the following headers

``` js

    Access-Control-Allow-Headers
    Access-Control-Allow-Methods
    Access-Control-Allow-Origin

```
- Go to Integration Response -> Expand Accordion -> Header Mappings -> Make the following

``` js

Access-Control-Allow-Origin : '<YOUR_DOMAIN>'


```
- If you have multiple headers being passed from your API, in order to consume them you have to enable it here.
- You can now do a test from the TEST option -> pass the following in the body

``` js

{
    "message": "HELLO"
}

```
- Click on Test -> you should get an Email with "HELLO" in the Message
- Actions -> Deploy API -> Deployment Stage (New Stage) -> Dev as Stage Name -> Deploy.
- Your POST API is Now deployed.
- Copy the `INVOKE URL`
- POST call this `INVOKE URL` with message param in body to send the email.

Similarly, create the OPTIONS method, and update the headers. You should get an 'OK' response to testing the Same.
It is mandatory otherwise your Cross-site requests will fail.


Now do this

``` jsx

fetch(INVOKE URL, {
    method: 'POST',
    body: JSON.stringify({ message: 'hi'})
}).
then(res => res.json()).
then(res => console.log(res)); // {"message":"Email processed succesfully!"}

```

You have Done it!

![](https://media.giphy.com/media/KEVNWkmWm6dm8/giphy.gif)
