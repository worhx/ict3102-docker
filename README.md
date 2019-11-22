# ICT3102 - Docker Team 7
![Docker](Title.png)
## :bookmark_tabs:Table of Contents

- [About](#about)
- [System Architecture](#system_architecture)
- [Getting Started](#getting_started)
- [Prerequisites](#prerequisities)
- [Installing](#installing)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## 🧐  About <a name = "about"></a>

This project allows users to upload an image onto the application and receive a new image with the YOLO image object detection implmented.

![Upload Image](UploadImage.png)

User can choose to upload image conventionally using the file explorer or simply drag and drop an image that will instantly trigger the object detection process.

![Result](Result.png)
The uploaded image is immediately rendered at the bottom of the screen and once the response (positions, labels, confidences) is received, it will simply overlay the image with the rectangles and other information instead of having to re-render the entire image.

## :computer: System Architecture <a name = "system_architecture"></a>

![System Architecture](System_Architecture.jpg)

At the frontend (React), client will upload an image which will trigger a REST API call (POST) to port 90 where the NGINX web server will be listening. The image file will be sent as the body of the POST request. All request will be proxied to the server group consisting currently of two flask services that can handle the POST request. This essentially forms a reverse proxy pattern where NGINX retrieves resources on behalf of the client from the two flask services and returns the response to the client. 

NGINX will decide which of the two flask services to delegate the POST request to based on least connection load balancing. Least connection method was chosen as it appears to be a fairer choice compared to the default round robin that only allocates load sequentially. This is because image sizes and amount of possible objects to be detected can differ from image to image. Instead of blindly following a sequence to distribute load, the load can be distributed based on which server is the least busy at that moment. 

Upon receiving the request from NGINX, the flask service will then process the image through the YOLO object detection algorithm and generate the positions, labels, and confidence of each object into a json response. The threshold of 0.1 for object confidence was increased to 0.25 to reduce objects that are probably inaccurate to be omitted from the response. This will reduce the size of the response and increase the response time of the API call.

The response will then be directed back from NGINX to React and based on the positions, React will render out the rectangles, labels, and confidences onto the respective objects that was detected. The reason for rendering on the frontend is so that the data in transit will be significantly reduced since only a very small amount of JSON data is being passed through the API calls as compared to the entire image being sent. This again, helps to improve the response time of the process of uploading an image to receiving the objects detected.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites <a name = "prerequisities"></a>

You will need to have the following installed on your local machine in order for the code to run in your local environment.


| Required | Link                                              |
| -------- | ------------------------------------------------- |
| Docker   | https://www.docker.com/products/docker-desktop    |



### Installation <a name = "installation"></a>

Clone this repository to your desired directory.
```
git clone https://github.com/worhx/ict3102-docker.git
```
Docker

```

docker-compose up

```

## :hammer: Built Using <a name = "built_using"></a>

### [Flask](https://flask.palletsprojects.com/en/1.1.x/) <a name = "flask"></a>
Optimization consideration - Flask is a micro web framework written in Python and does not require particular tools or libraries to run. In addition, Flask do not have database abstraction layer and form-validation. This causes Flask to be lightweight which is important especially in the docker environment where multiple Flask services may be deployed and a smaller sized service will benefit the application as a whole by reducing overheads and improving scalability.

### [Nginx](https://www.nginx.com/)  <a name = "nginx"></a>
Optimization consideration - Nginx is a web server which can also be used as a reverse proxy and a load balancer. It allows the request from the client to be properly distributed (round robin) such that the multiple flask services can receive the requests equally. By having multiple flask services, it improves the availability of the application such that in the event of a flask service being down or if it is busy servicing an existing request, the other flask service can still process a new request. Load balancing reduces the stress on a single service and increases the performance of the application.

### [React](https://reactjs.org/) <a name = "react"></a>
Optimization consideration - ReactJS is one of the best performing frontend framework as it is designed to be a simple and lightweight Javascript Library. One of the advantages of React is the fast rendering which uses virtual DOM through React's [memory reconciliation algorithm](https://reactjs.org/docs/reconciliation.html) as opposed to conventional DOM which is tree structured and small changes at the top layers creates a ripple effect to the interface.  

### [Docker](https://www.docker.com/) <a name = "docker"></a>
Each component of the application is stored in its own containers that communicates through the team's designed networks and ports.

Optimizing Docker
- Choosing smaller sized images that provides the same functionalities as full sized images (e.g. nginx:1.13.7-alpine, tiangolo/meinheld-gunicorn:python3.6)
- Run commands on a single line rather than multiple lines (where applicable) to reduce layers.
- Arrange docker commands that would be changed least frequently to be at the top of the file to reduce unnecessary rebuilds.




## ✍️ Authors <a name = "authors"></a>

- SIT ICT SE - Class of 2021 ICT3102 Team 7


| Student ID & Email | Name & LinkedIn | GitHub |
| -------- | ------------------------------------------------- |--------|
| [1702555](mailto:1702555@sit.singaporetech.edu.sg) | [Cassandra Leong Sok Yee](https://www.linkedin.com/in/cassandra-leong-738317bb)|[cssndrleong](https://github.com/cssndrleong)|  
| [1702673](mailto:1702673@sit.singaporetech.edu.sg) | [Chen Guan Hua](https://www.linkedin.com/in/guanhua-chen-04a420174/) |[Lunchenmeat](https://github.com/Lunchenmeat)
| [1702419](mailto:1702419@sit.singaporetech.edu.sg) | [Ong Xuan](https://www.linkedin.com/in/xuan-ong-50752910a/) |[Xuanong](https://github.com/Xuanong)|  
| [1700512](mailto:1700512@sit.singaporetech.edu.sg) | [Quek Jun Hao](https://www.linkedin.com/in/jun-hao-quek-5455a0175/) |[QJunHao](https://github.com/QJunHao)| 
| [1701591](mailto:1701591@sit.singaporetech.edu.sg) | [Ker Beng Hian](https://www.linkedin.com/in/benghianker/) |[worhx](https://github.com/worhx)
| [1701217](mailto:1701217@sit.singaporetech.edu.sg) | [Tan Qin Xiang](https://www.linkedin.com/in/qin-xiang-tan-19570a113/) |[tqx2012](https://github.com/tqx2012)|

## :man_teacher: Acknowledgments <a name = "acknowledgments"></a>
- Trieu for [darkflow](https://github.com/thtrieu/darkflow.git)
- [Drag & Drop](https://medium.com/@mannycodes/build-a-react-drag-drop-progress-file-uploader-fb874c515a7)
- [Meinheld Gunicorn Flask](https://github.com/tiangolo/meinheld-gunicorn-flask-docker)
- [Draw shape react](https://github.com/ansu5555/draw-shape-reactjs)
