#!/usr/bin/env bash
# filename: deploy.sh

# Use your AWS account ID instead of XXXXXXXXXXXX

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin XXXXXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com
docker build -t station-api .
docker tag station-api:latest XXXXXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/station-api:latest
docker push XXXXXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/station-api:latest   