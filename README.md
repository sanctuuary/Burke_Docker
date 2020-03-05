# Burke_Docker
A docker version of Burke (a Bio-tools and edam User interface foR automated worKflow Exploration), a web app used to demonstrate the functionalities of APE library.

## Installation

Before running the web app, it is required to have installed the following software on the hosting machine (in case of sunning on the locas server, the software should be instaled on the local machine):
- Docker (https://docs.docker.com/install/)
- Docker-compose (https://docs.docker.com/compose/install/)

## Running the web application on the local server

In order to run the web app the 
1. Clone this repo to your local machine using 
```bash
git clone git@github.com:sanctuuary/Burke_Docker.git
```
2. Navigate in the terminal to the root directory of the repo
3. Execute command
```bash
sudo docker-compose -f docker-compose.yml up -d
```
4.  Open a web browser and go to http://localhost:8080/
5. In order to stop the process simply run the command
```bash
sudo docker-compose -f docker-compose.yml down
```

#### Note:
In case that your ports **8080** and **8090** are occupied or you simply want to change them, this can be done by changing the content of the file `docker-compose.yml`. Specifically by changing the (bold) ports at  "- **8080**:8080" and "- **8090**:8090" (do not change the second, non-bold, ports). If the port  "- **8080**:8080"  was changed to e.g.  "- **1234**:8080" the web app could be accessed at http://localhost:1234/



