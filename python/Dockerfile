FROM tiangolo/meinheld-gunicorn:python3.6

WORKDIR /app

EXPOSE 1800

RUN pip3 install cython numpy opencv-python tensorflow==1.14.0 scipy

RUN git clone https://github.com/thtrieu/darkflow.git

RUN pip install ./darkflow

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt 

COPY . .

RUN wget https://pjreddie.com/media/files/yolov2.weights -O ./cfg/yolov2.weights

CMD ["python", "main.py"]