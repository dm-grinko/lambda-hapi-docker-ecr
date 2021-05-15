# lambda-hapi-docker-ecr

## Descripion
An example application designed to demonstrate deployment of a Hapi.js RESTful API using AWS Lambda, ECR, and Docker.

## API Documentation

> GET /station?maxCapacity=7

Returns a CSV file URL of updated station information.

```
params: {
    maxCapacity: number; // default: 12
    token: string;
}

response: {
    link: string;
    count: number;
    capacity: number;
    originalCount: number;
}
```

## Demo

> curl --location --request GET https://4vn6rwovv2.execute-api.us-east-1.amazonaws.com/dev/station?token=avenuecode&maxCapacity=7

```
response: {
    "link": "https://dmitry-grinko.s3.amazonaws.com/station_information.csv",
    "count": 29,
    "capacity": 7,
    "originalCount": 694
}
```

## How to run locally

```
npm start
```
## How to use unit tests
```
npm test
```
## How to deploy
```
npm run deploy
```

## Usage

1. Download the source code
``` 
git clone https://github.com/dm-grinko/lambda-hapi-docker-ecr
cd lambda-hapi-docker-ecr 
```

2. Install dependencies `npm i`

3. Create a private repository in ECR ( ex. `station-api` )

4. Update AWS profile name in the `serverless.yml`

5. Update the `deploy.sh` with the ECR push commands

6. Update the `.env` file

7. Create new lambda function in AWS Console using `Container image`. 

- Function name - `station`

- Click on - `Browse images` and select `station-api`

- Add basic Lambda permissions and permissions to uplad a file to S3


8. Create an API Gateway endpoint:

- Lambda -> Functions -> stationLambda -> Configuration -> Triggers -> Add trigger -> API Gateway -> Create an API

- API type HTTP API

- Security - Open

- Deployment stage - dev