# Burke_Docker
A docker version of Burke (a Bio-tools and edam User interface foR automated worKflow Exploration), a web app used to demonstrate the functionalities of APE library.

Web application can be found at http://ape.science.uu.nl/

## Installation (on the local machine)

Before running the web app locally, it is required to have installed the following software on the local machine:
- Docker (https://docs.docker.com/install/)
- Docker-compose (https://docs.docker.com/compose/install/)

## Running the web application (on the local machine)

In order to run the web application on the local machine the following steps should be performed:

1. Clone this repo to your local machine using 
```bash
git clone git@github.com:sanctuuary/Burke_Docker.git
```
or
```bash
git clone https://github.com/sanctuuary/Burke_Docker.git
```
2. Navigate to the root directory of the repo in terminal
```bash
cd ~/git/Burke_Docker
```
3. Execute command
```bash
sudo docker-compose -f docker-compose.yml up -d --build
```
4.  Open a web browser and go to http://localhost:81/
5. Experiment with the tool
6. In order to stop the process simply run the command
```bash
sudo docker-compose -f docker-compose.yml down
```

#### Note:
In case that your ports **81** and **8001** are occupied or you simply want to change them, this can be done by changing the content of the file `docker-compose.yml`. Specifically by changing the (bold) ports at  "- **81**:8080" and "- **8001**:8001" (do not change the second, non-bold, ports). If the port  "- **81**:8080"  was changed to e.g.  "- **1234**:8080" the web app could be accessed at http://localhost:1234/



