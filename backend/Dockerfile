FROM python:3.10.5-alpine

COPY . .

WORKDIR /

RUN pip install -r pip_requirements.txt

EXPOSE 80

CMD uvicorn main:app --reload --host 0.0.0.0 --port 80