FROM node:22-alpine
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY dev.sh /dev.sh
RUN sed -i 's/\r$//' /dev.sh && chmod +x /dev.sh
USER node
EXPOSE 5173
CMD ["sh", "/dev.sh"]