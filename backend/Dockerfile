FROM python:3.12-slim

# 設定工作目錄
WORKDIR /app

# 安裝基本建置工具與 PostgreSQL client library
# psycopg2（非 binary 版）會用到 libpq-dev
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 複製 requirements
COPY requirements.txt /app/

# 安裝 Python 套件（包含 uvicorn[standard], pydantic-core, psycopg2）
RUN pip install --no-cache-dir -r requirements.txt

# Dev 模式：程式碼用 volume 掛載，所以 image 裡不放後端程式碼
# 這裡不加入任何 COPY backend/

# 預設保持容器存活，但不進 bash
# docker-compose 的 command 會覆寫它
CMD ["tail", "-f", "/dev/null"]
