FROM python:3.11.2-slim-bullseye

RUN apt-get update -y && apt-get install -y procps

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN pip install -r requirements.txt

CMD uvicorn crawler.main:app --host=0.0.0.0 --port=8000 --reload
