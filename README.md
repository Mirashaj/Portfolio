# Erik - Portfolio (Vite + React)

This repo is a Vite + React scaffold of the original portfolio. It keeps the original `script.js` and `style.css` logic and loads them inside a React app.

Quick start (PowerShell):

```powershell
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open the URL printed by Vite (usually http://localhost:5173)
```

Notes:
- The legacy `script.js` is imported dynamically from `src/App.jsx` so existing cursor, Matrix mode and other effects work unchanged. If you make changes to `script.js` you may need to refresh the page.
- If you get plugin warnings, run:

```powershell
npm install -D @vitejs/plugin-react
```

- To build for production:

```powershell
npm run build
npm run preview
```

If you want, I can:
- extract the legacy JS into React components (recommended for maintainability)
- convert the custom cursor into a React component
- split styles into CSS modules or Tailwind

Tell me which next step you prefer and I’ll implement it.