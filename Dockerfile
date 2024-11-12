FROM node:20.18.0
#ARG NPM_CONFIG_REGISTRY="registry.gitlab.com/nielsen-media/maf/maf-public/packages/mhart/alpine-node"

COPY ./app /app
COPY .npmrc /app/.npmrc
COPY app/db /db
COPY ./deployment /deployment
WORKDIR /app

#RUN apk add --no-cache make gcc g++ python bash curl
#RUN npm set registry $NPM_CONFIG_REGISTRY

RUN npm install
EXPOSE 8070
CMD ["node", "index.js"]

HEALTHCHECK --interval=5s --timeout=60s --retries=10 CMD curl -f http://localhost:8070/usremoterecqa/service/health || exit 1

