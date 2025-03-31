FROM public.ecr.aws/docker/library/node:20.18 
# node:20.18.0

COPY ./app /app
COPY .npmrc /app/.npmrc
COPY app/db /db
COPY ./deployment /deployment
WORKDIR /app

RUN npm install
EXPOSE 8070
CMD ["node", "index.js"]

HEALTHCHECK --interval=5s --timeout=60s --retries=10 CMD curl -f http://localhost:8070/usremoterecqa/service/health || exit 1

