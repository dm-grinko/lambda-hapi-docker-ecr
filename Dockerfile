# List of NodeJS images - `https://gallery.ecr.aws/lambda/nodejs`
FROM public.ecr.aws/lambda/nodejs:12

COPY package.json api.js .env ./

COPY functions/ ./functions/

COPY index.js ${LAMBDA_TASK_ROOT}

RUN npm install

RUN mkdir -p ~/tmp

CMD [ "index.handler" ]