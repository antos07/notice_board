FROM python:3.11-slim-buster

ENV PYTHONUNBUFFERED=1

ARG POETRY_VERSION=1.2.2

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /code
COPY poetry.lock pyproject.toml /code/

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

COPY . /code

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
