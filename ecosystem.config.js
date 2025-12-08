module.exports = {
  apps: [
    {
      name: "mytaxaccounting",
      script: "npm",
      args: "start",
      env: {
        PORT: 3050,
        NODE_ENV: "production"
      }
    }
  ]
};
