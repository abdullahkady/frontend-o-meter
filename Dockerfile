FROM electronuserland/builder:wine

ADD . /project
WORKDIR /project
ENV ELECTRON_CACHE="/root/.cache/electron"
ENV ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder"

WORKDIR /project/frontend
RUN npm ci
WORKDIR /project/electron-app
RUN npm ci

WORKDIR /project
CMD ["bash", "build.sh"]