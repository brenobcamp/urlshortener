FROM node:latest

WORKDIR /app

COPY . .
RUN rm -rf node_modules
RUN npm i
RUN npx prisma migrate dev

EXPOSE 3000

CMD ["npm", "start"]