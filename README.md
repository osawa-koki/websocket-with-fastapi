# websocket-with-fastapi

🥮🥮🥮 FastAPIでWebSocketを使用してみる！  

## 実行方法

```shell
docker build -t my-image .
docker run -d --rm --name my-container -p 8000:8000 my-image
```

## 環境構築

DevContainerに入って、以下のコマンドを実行します。  

```shell
# ターミナル1
poetry run uvicorn app.main:app --reload

# ターミナル2
cd ./www/
yarn install
export NODE_ENV=development
yarn dev
```
