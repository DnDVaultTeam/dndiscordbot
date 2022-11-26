###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node prisma ./prisma

COPY --chown=node:node scripts ./scripts

RUN yarn ci

COPY --chown=node:node . .

USER node

CMD [ "scripts/deploy-dev.sh" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --chown=node:node package*.json ./

COPY --chown=node:node prisma ./prisma

COPY --chown=node:node scripts ./scripts

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn prebuild

RUN yarn build

USER node

CMD [ "scripts/deploy-prod.sh" ]

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node","dist/main.ts" ]
