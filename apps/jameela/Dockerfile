# turbo prune for pnpm still inop
# Image size could be optimized but i'm too tired rn tbh
# TODO: Update and implement turbo prune once available
# useful: https://github.com/vercel/turborepo/issues/534#issuecomment-1241495163
# original example: https://github.com/vercel/turborepo/blob/main/examples/with-docker/apps/web/Dockerfile

FROM node:18-alpine as base
RUN apk add --no-cache libc6-compat && corepack enable
# ENV NODE_ENV production

# build with dev deps
FROM base as builder
WORKDIR /app

COPY ./packages /app/packages
COPY ./apps/jameela /app/apps/jameela

# Copy clean root files to root folder
COPY ./turbo.json /app/turbo.json
COPY ./.npmrc /app/.npmrc
# Add lockfile and package.json's of isolated subworkspace
COPY ./package.json /app/package.json
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml
COPY ./pnpm-workspace.yaml /app/pnpm-workspace.yaml

# Install deps, build, finally prune with pnpm 
RUN pnpm install && pnpm turbo run build --filter=jameela... && pnpm --filter jameela --prod deploy pruned && pnpm --filter database deploy pruned-db

WORKDIR /app/pruned-db
RUN pnpm run generate

# using prod deps except prisma
FROM base as runner
WORKDIR /app
COPY --from=builder /app/pruned/package.json .
COPY --from=builder /app/pruned/build ./build
COPY --from=builder /app/pruned/public ./public
COPY --from=builder /app/pruned/node_modules ./node_modules
COPY --from=builder /app/pruned-db ./node_modules/database

# Don't run production as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S remix -u 1001

USER remix

EXPOSE 3000
ENV PORT 3000

CMD ["pnpm", "run", "start:prod"]
