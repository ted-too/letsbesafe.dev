module.exports = {
  apps: [
    {
      name: "main-site",
      cwd: "apps/main-site",
      script: "pnpm",
      args: "start",
    },
    {
      name: "main-site-api",
      cwd: "apps/main-site-api",
      script: "./main-site-api",
      args: 'serve --http="127.0.0.1:3000"',
    },
  ],
};
