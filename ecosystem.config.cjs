// ai-router/ecosystem.config.cjs
const path = require("path")
const VENV = path.resolve(__dirname, "../toefl-project")

module.exports = {
  apps: [
    {
      name: "headroom",
      cwd: path.resolve(__dirname, ".."),
      script: path.join(VENV, "bin/headroom"),
      args: "proxy --host 127.0.0.1 --port 8787",
      interpreter: "none",            // run the venv script as-is; don't let PM2 use node
      env: {
        VIRTUAL_ENV: VENV,            // same effect as `source venv/bin/activate`
        PATH: `${VENV}/bin:${process.env.PATH}`,
        PYTHONUNBUFFERED: "1",        // logs show up in `pm2 logs` immediately
      },
      autorestart: true,
      max_memory_restart: "2G",       // it loads ML compression models
      kill_timeout: 10000,
      time: true,
    },
    {
      name: "ai-router",
      cwd: __dirname,
      script: "npm",
      args: "start",
      env: { NODE_ENV: "production" },
      autorestart: true,
      max_memory_restart: "1G",
      time: true,
    },
  ],
}
