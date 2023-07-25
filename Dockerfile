FROM node:14 
# RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
VOLUME /usr/src/app/
CMD ["npm" , "run", "dev"]