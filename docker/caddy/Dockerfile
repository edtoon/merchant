FROM alpine

RUN apk add --no-cache openssh-client git tar curl

ARG plugins=cors,expires,ipfilter,jwt,locale,ratelimit,upload

RUN curl --silent --show-error --fail --location \
  --header "Accept: application/tar+gzip, application/x-gzip, application/octet-stream" -o - \
  "https://caddyserver.com/download/build?os=linux&arch=amd64&features=${plugins}" \
  | tar --no-same-owner -C /usr/bin -xz caddy \
  && chmod 0755 /usr/bin/caddy \
  && /usr/bin/caddy -version

EXPOSE 80 443
VOLUME /root/.caddy
WORKDIR /srv

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
