FROM node:18.19.0-alpine

COPY --chown=1000:1000 main.js /noderoot/main.js
COPY --chown=1000:1000 config /noderoot/config/
COPY --chown=1000:1000 lib /noderoot/lib/
COPY --chown=1000:1000 routes /noderoute/routes/
COPY --chown=1000:1000 node_modules /noderoot/node_modules

CMD ["node", "/noderoot/main.js"]
