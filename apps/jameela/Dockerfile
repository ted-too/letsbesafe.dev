# Current image size at 734MB
# Added turbo prune ✅
# Attempts to reduce the image size have prooved futile.
# Based on example https://github.com/vercel/turborepo/issues/1941#issuecomment-1246330480

# 1. Generate a sparse/partial monorepo with a pruned lockfile for a target workspace
FROM node:18-alpine as deps
RUN corepack enable

WORKDIR /app
COPY . .

# will remove `turbo@1.4.7-canary.0` to `turbo` after stable release of 1.4.7
RUN pnpm dlx turbo@1.4.7-canary.0 prune --scope=jameela --docker

# 2. Rebuild the source code only when needed
FROM node:18-alpine as builder
RUN corepack enable
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install

COPY --from=deps /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=jameela...

# 3. Production image, copy all the files and run next
FROM node:18-alpine as runner
RUN corepack enable
WORKDIR /app

COPY --from=builder /app .
# Attempts to copy only required build files didn't work
# this is because of remix's questionable build ideology
# COPY --from=builder /app/apps/jameela/package.json package.json
# COPY --from=builder /app/apps/jameela/public public
# COPY --from=builder /app/apps/jameela/build build

# Have to use root because of prisma generate and pnpm
# USER remix
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S remix -u 1001

EXPOSE 3000
ENV PORT 3000

# TODO: Take advantage of turbo pipelines
WORKDIR /app/apps/jameela
CMD ["pnpm", "run", "start"]