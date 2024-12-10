# 使用官方的 Node 镜像作为基础镜像
# 这里使用 22.12.0-alpine 版本的 Alpine Linux 镜像
FROM node:22.12.0-alpine AS builder

LABEL authors="wangqiang"

# 设置工作目录为 /app
# 所有后续操作都会在这个目录下进行
WORKDIR /app

# 将当前项目目录的所有文件拷贝到容器的 /app 目录中
COPY . .

# 下载项目的依赖
RUN npm config set registry https://registry.npmmirror.com/

RUN npm i -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com/

RUN pnpm i

# 编译项目，生成文件
RUN pnpm run build

# 使用一个更小的基础镜像（Alpine）来运行应用程序
# Alpine 是一个极简的 Linux 发行版，适合部署阶段
FROM nginx:latest

# 设置工作目录为 /app
WORKDIR /app

# 从编译阶段的镜像中拷贝编译后的文件到运行镜像中
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# 暴露容器的 8080 端口，用于外部访问
EXPOSE 80

# 设置容器启动时运行的命令
CMD ["nginx", "-g", "daemon off;"]
