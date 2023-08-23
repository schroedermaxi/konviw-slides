FROM node:20-alpine

WORKDIR /app
# RUN cp -v /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem /etc/ssl/certs/ca-certificates.crt
# ENV NODE_EXTRA_CA_CERTS /etc/ssl/certs/ca-certificates.crt


# ENV NODE_EXTRA_CA_CERTS /app/certs/ca
ENV NO_PROXY cloud.local,sanofi.com,docker
# ENV HTTP_PROXY http://emea-aws-webproxy.service.cloud.local:3128
# ENV HTTPS_PROXY http://emea-aws-webproxy.service.cloud.local:3128
# ENV http_proxy ${HTTP_PROXY}
# ENV https_proxy=${HTTPS_PROXY}
# ENV no_proxy=${NO_PROXY}

ENV APP_BASE_URL=/

# RUN npm config set proxy http://emea-aws-webproxy.service.cloud.local:3128
# RUN npm config set  -g @sanofi:registry=https://sanofi.jfrog.io/sanofi/api/npm/npm-iadc-local/

COPY . .

RUN apk --no-cache add git curl py3-pip g++ make && apk add --no-cache --upgrade bash

RUN chmod -R 777 ./npm

RUN npm install -g node-gyp 

# RUN curl  -u "${ARTIFACTORY_REGISTRY_USERNAME}:${ARTIFACTORY_REGISTRY_PASSWORD}" "${ARTIFACTORY_NPM_REGISTRY_AUTHURL}" >> /app/.npmrc
RUN npm ci

RUN npm run vercel-build

# Expose port 8080, which is what the node process is listening to
EXPOSE 8080

# Set the startup command to 'npm start'
CMD [ "npm", "start"] 
