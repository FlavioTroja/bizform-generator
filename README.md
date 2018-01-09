# Overview
This is a simple API which compile [pug](https://github.com/pugjs/pug) template file with given parameters and return the compiled HTML string as response.

This application is supposed to be deployed on AWS as [Serverless framework](https://serverless.com/) is integrated to this. You could try on other cloud platforms such as GCP, Azure and OpenWhisk as long as the framework supports.

# Use case
For my case, I am calling this API with [Zoho Creator](https://www.zoho.com/creator/) in order to speed up development of templates for Zoho Creator.

# Getting started
Let's say you are trying to develop `hello-world` template.

```
# Clone this repository
git clone git@github.com:ikazoy/bizform-generator.git

# Install dependencies
yarn install

# Create a new directory named "hello-world" under "templates" dir with
mkdir templates/hello-world

# Prepare "template.pug" and "params.js" under the new dir "templates/hello-world"

# template.pug is a template file
cat <<EOT >> templates/hello-world/template.pug
html
  head
    meta(charset="UTF-8")
    title= "Hello world"
  body
    p Hello World! 你好世界!！ #{name}!
EOT

# params.js defines parameters to be passed to pug compiler later
cat <<EOT >> templates/hello-world/params.js
module.exports = {
  name: 'Bob',
};
EOT

# Compile and host index.html on http://127.0.0.1:8080/
# Note: this script watches your changes and hot reload
npm_config_pug_template=hello-world yarn run watch_pug
```

# endpoint
## /bizform

### method: POST

#### REQUEST
example:

```
curl -0 -X POST http://localhost:3090/bizform \
-H "Expect:" \
-H 'Content-Type: text/json; charset=utf-8' \
-d @- << EOF
{
	"templateName": "hello-world",
	"templateParams": {
		"name": "Yoshiki Ozaki"
	}
}
EOF
```

Note: You will find there is no authentication for the endpoint. Update `serverless.yml` if you need an authentication.

#### RESPONSE

##### success
sample of response with status code 200

JSON

```
{
   "html":"<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Hello world</title></head><body><p>Hello World! 你好世界!！ Yoshiki Ozaki!</p></body></html>"
}
```

##### error
TBU

# Commands
## Launch local API endpoint
By default http://localhost:3000 is the API base url.

```
yarn run sls offline
```

## Deployment to AWS

### Set up for deployment
```
yarn run setup --overwrite --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY --profile bizform-generator-profile
```
### AWS Region
Update `provider.region` to your preferable region name. `us-east-1` is the default region to deploy.

### Deploy to development env
```
yarn run deploy
```

Initial deployment might take 3 minutes or more while following deployment s take about 1 miniute.

You will see this kind of messages on your console.

```
Service Information
service: bizform-generator
stage: dev
region: us-east-1
stack: bizform-generator-dev
api keys:
  None
endpoints:
  POST - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/bizform
functions:
  generateBizForm: bizform-generator-dev-generateBizForm
```

### Deploy to production env
```
yarn run deploy -s production
```

# How to deploy to other cloud provider than AWS
See [docs](https://serverless.com/framework/docs/) of serverless framework to update `serverless.yml`.

PR welcome!

# Appendix
This application is created based on `aws-nodejs-ecma-script` of [Serverless framework](https://github.com/serverless/serverless) ver1.24.1.
