FROM node:20.18.0

COPY ./app /app
COPY .npmrc /app/.npmrc
COPY app/db /db
COPY ./deployment /deployment
WORKDIR /app

RUN npm install
EXPOSE 8080
CMD ["node", "index.js"]

HEALTHCHECK --interval=5s --timeout=60s --retries=10 CMD curl -f http://localhost:8080/usremoterecqa/service/health || exit 1

