from darkflow.net.build import TFNet
import cv2
import numpy as np
import io

import os
from scipy import misc
from io import BytesIO
from urllib.request import urlopen, Request
from flask import Flask, request, Response, abort, jsonify, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

font = cv2.FONT_HERSHEY_SIMPLEX
UPLOAD_FOLDER = './img'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
options = {"model": "./cfg/yolo.cfg",
               "load": "./cfg/yolov2.weights", "threshold": 0.25, "gpu": 1.0, "json": True}
tfnet = TFNet(options)
@app.route("/test/nia", methods=['GET'])
def test():
    return"hello"

def fileUpload():
    target = os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    return destination


@app.route("/api/yolo", methods=['POST'])
def yoloapi():
    destination = fileUpload()
    # options = {"model": "./cfg/yolo.cfg",
    #            "load": "./cfg/yolov2.weights", "threshold": 0.1, "gpu": 1.0, "json": True}
    # tfnet = TFNet(options)
    img = cv2.imread(destination)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = tfnet.return_predict(img)
    return str(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1800, debug=False)