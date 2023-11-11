FROM python:3.11
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH $PATH:/root/.local/bin
WORKDIR /app
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --no-root --no-dev
COPY ./ ./
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
