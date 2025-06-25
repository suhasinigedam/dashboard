# 🧩 Mini Dashboard

## 👩‍💻 About Me

**Suhasini Gedam**  
Experienced frontend developer with 9+ years of expertise in frontend and software development. I’m a collaborative team player with a positive attitude and a strong belief that _“learning is a life-time process.”_ I'm always eager to explore and adopt new technologies to improve product quality and user experience.

---

## 📊 Project Overview

**Mini Dashboard** is a customizable, interactive dashboard built with modern frontend technologies. It allows users to manage and organize widgets with real-time data and local persistence. The UI is responsive, accessible, and offers dark mode support.

### 🧱 Features

- ⚙️ **Add / Remove / Reorder Widgets**  
  Drag-and-drop interface using `@dnd-kit` for full widget layout flexibility.

- 💡 **Types of Widgets**:
  - **Weather Info** — Fetches live weather using [OpenWeatherMap API](https://openweathermap.org/api)
  - **Crypto Price** — Displays live cryptocurrency prices using [CoinGecko API](https://www.coingecko.com/)
  - **Task List** — Manage tasks (add/edit/delete) with **local storage** persistence

- 🧭 **Routing**:  
  Powered by `react-router` for navigation between widgets.

- 🎨 **UI/UX**:
  - Responsive Design using **Tailwind CSS**
  - Built-in **Dark Mode** toggle
  - Debounced search/filter functions (In search Cities / search Crypto currency)

- ⚙️ **Tech Stack**:
  - React + TypeScript
  - Redux Toolkit (state management)
  - Axios (API calls)
  - React Hooks
  - Code Splitting + Lazy Loading (widget-level)
  - Jest + React Testing Library (unit & component testing)

---

## 🚀 Installation

```bash
npm install
npm run dev
```

### 🔨 Build for Production

```bash
npm run predeploy
```

### 📦 Deploy (via GitHub Pages)

```bash
npm run deploy
```

> Ensure the correct `homepage` is set in your `package.json` before deploying.

---

## 📁 Project Structure

```
📦 mini-dashboard/
 ┣ 📂 src/
 ┃ ┣ 📂 components/
 ┃ ┣ 📂 widgets/
 ┃ ┣ 📂 store/
 ┃ ┣ 📂 hooks/
 ┃ ┗ App.tsx, main.tsx
 ┣ 📂 public/
 ┣ 📂 __tests__/
 ┣ .env
 ┣ vite.config.ts
 ┣ package.json
 ┗ README.md
```

---

## 🔧 Pending Improvements

- ✅ More unit tests need to be written for comprehensive coverage
- ☁️ Application can be hosted on cloud-native services like:
  - AWS Amplify
  - S3 + CloudFront
  - Azure App Service
- 🌐 Custom domain name configuration
- 🔐 Add authentication (Okta, Google, MSAL)
- 🧪 Implement end-to-end (E2E) testing
- 📱 Run responsiveness testing across multiple devices/screen sizes

---

## 📌 Demo

🌐 [Live Demo](https://suhasinigedam.github.io/dashboard/) (GitHub Pages)

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
