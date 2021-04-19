### Heroku ###

# Heroku - View logs (Control+C to stop streaming the logs) #
heroku logs --tail

### Installing npm packages ###
npm install jsonschema --save
npm install

______________________________________________________________________________________________________

### Docker ### 

References:
https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose

#Build/run container
docker build -t diogo/finance-quotes .
docker run -it --rm --name finance-quotes --network finance-control -p 5000:5000 -d diogo/finance-quotes

#Build/run compose
docker-compose -f "docker-compose.yml" up -d --build

#Kill/Stop/Remove container
docker kill finance-quotes
docker stop finance-quotes
docker container rm finance-quotes
docker container rm finance-quotes -f

#Get container ID
docker ps
docker-compose ps

# Print app output
docker logs container_id
docker logs finance-quotes

# Enter the container
docker exec -it finance-quotes /bin/bash


_____________________________________________________________________________

### Node.js ###
sudo apt-get update
sudo apt-get install nodejs

### npm ###
sudo apt-get install npm
sudo ln -s /usr/bin/nodejs /usr/bin/node

### To run node automatically after changes ###
sudo npm install -g nodemon
nodemon file.js
