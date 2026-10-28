#!/bin/sh
set -e
cd /app

if [ ! -f package.json ]; then
  echo ">> Premier lancement : création du projet"
  cat > package.json <<'EOF'
{
  "name": "pepe-hero",
  "private": true,
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": {
    "framer-motion": "^11.18.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.11"
  }
}
EOF
fi

[ -f vite.config.js ] || cat > vite.config.js <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173, watch: { usePolling: true, interval: 300 } },
});
EOF

[ -f index.html ] || cat > index.html <<'EOF'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nicolas Pépé</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

mkdir -p src public/pepe

[ -f src/main.jsx ] || cat > src/main.jsx <<'EOF'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
EOF

[ -f src/index.css ] || echo 'body { margin: 0; }' > src/index.css

[ -f src/App.jsx ] || cat > src/App.jsx <<'EOF'
import Hero from "./Hero.jsx";
export default function App() { return <Hero />; }
EOF

[ -f src/Hero.jsx ] || echo ">> ATTENTION : copiez Hero.jsx dans pepe-hero/src/"

npm install --no-audit --no-fund
exec npm run dev -- --host