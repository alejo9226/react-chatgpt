FROM node:16
ENV VITE_APP_BACKEND_URL=http://localhost:8000
# RUN mkdir -p /usr/src/app/
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]