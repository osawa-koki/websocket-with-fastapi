FROM node:20 AS build
ENV NODE_ENV production
WORKDIR /src/
COPY ./www/package.json ./www/yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production
COPY ./www/ ./
RUN yarn build

FROM python:3.11 AS server
ENV ENV production
EXPOSE 8000
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH $PATH:/root/.local/bin
WORKDIR /app/
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --no-root --no-dev
COPY --from=build /src/public/ ./public/
COPY ./ ./
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
