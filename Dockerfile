FROM node:20
WORKDIR /home/noed/app
COPY ./ ./
RUN npm ci
ENV PORT 5300
EXPOSE 5300
CMD [ "node", "app.js" ]