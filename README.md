# Burke_Docker
A docker version of Burke (a Bio-tools and edam User interface foR automated worKflow Exploration), a webapp used to demonstrate the functionalities of APE library.

## Installation

Before running the webapp, it is required to have installed the following software on the hosting machine (in case of sunning on the locas server, the software should be instaled on the local machine):
- Docker (https://docs.docker.com/install/)
- Docker-compose (https://docs.docker.com/compose/install/)

## Running the webbapp on the local server

In oreder to run the webapp the 
1. Clone this repo to your local machine using 
```bash
git clone git@github.com:sanctuuary/Burke_Docker.git
```
2. Navigate in the terminal to the root directory of the repo
3. Execute command
```bash
sudo docker-compose up
```
4.  Open a web browser and go to http://localhost:8080/
5. In order to stop the process simply run the command
```bash
sudo docker-compose down
```

#### Note:
In case that your ports **8080** and **8090** are occupied or you simply want to change them, this can be done by changing the content of the file `docker-compose.yml`. Specifically by changing the (bolded) ports at  "- **8080**:8080" and "- **8090**:8090" (do not change the second, non-bolded ports). If the port  "- **8080**:8080"  was changed to e.g.  "- **1234**:8080" the webapp could be accessed at http://localhost:1234/



