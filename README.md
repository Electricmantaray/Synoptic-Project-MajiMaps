---
# MAJIMAPS - Synoptic Project Year 1
---

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)


## GitHub setup:
---
### If you **HAVE NOT** already setup a github (shouldve been setup in semsester 1 webdev)

- Create a personal access token:
  - Go to profile picture -> Settings -> Developer Settings -> Personal access tokens -> Tokens (classic) -> Generate new token -> Generate new token (classic)
  - Enter a note to remember it (eg: "repo")
  - Select the repo checkbox
  - Save the token with a password manager

---
### If you **HAVE** setup github beforehand

- Open a terminal
- Move to the location you want the folder using `cd`
- Clones the repository with:
  - ```
    git clone https://{Your GitHub username}:{Your personal access token}@github.com/Electricmantaray/Synoptic-Project-MajiMaps.git)
    ```
  - Example:
    - ```
      git clone https://Electricmantaray:ACCESSCODE55555@github.com/Electricmantaray/Synoptic-Project-MajiMaps.git)
      ```
- Move into the project directory `cd` Synoptic-Project-MajiMaps
    
- If you **HAVE NOT** setup before step:
  - ```
    git config user.name {name};
    git config user.email {your email};
    ```
- Install dependencies:
  - ```
    npm install
    ```
- Add .env file:
  - ```
    # ask hayden for any required
    # .env.example
    EMAIL=your-email@example.com
    APP_PASSWORD=your-app-password
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD_HASH=your-bcrypt-hash
    USE_CACHE=false
    ```
---   

## Development

Start Web server with nodemon:
  - ```
    npm run build:css
    npm run dev
    ```

Adding a new feature - can be done natively in vscode ui
  - creating a new branch (use - instead of spaces)
    - ```
      git checkout -b feature/{feature-name}
      ```
    - Example for home page
      - ```
        git checkout -b feature/{Home-Page}
        ```
  - After you finish
    - ```
      git status
      git add {file-1|directory1 file-2|directory2 file-3|directory3 ...}
      ```
    - ```
      git commit -m "message description"
      git push -u origin features/{feature-name}
      ```


---


# GPT explanation of file structure

Here's a solid starting point for your `README.md` that explains the structure and basic functionality of your project (`Synoptic-Project-MajiMaps`). Since you're still in the initialization/setup stage, this focuses on what you've built so far, keeping it clear and professional but not overkill:

---

## 📍 MajiMaps

MajiMaps is an interactive web-based platform for showcasing water infrastructure reporting and mapping systems. This project is currently under development and is structured using Node.js, Express, and EJS templating. It emphasizes modular design, clean data separation, and scalability for future dynamic features.

---

## 📁 Project Structure

```
Synoptic-Project-MajiMaps/
├── public/               # Static assets (CSS, images)
│   ├── css/
│   │   └── styles.css    # Global styles
│   └── images/           # Publicly served images
│
├── src/
│   ├── controllers/      # Request handlers (controllers)
│   │   └── controller.js
│   ├── data/             # JSON data files
│   │   └── index.json    # Homepage content
│   ├── routes/           # Express router definitions
│   │   └── routes.js
│   ├── services/         # Data access and service logic
│   │   └── services.js
│   └── views/            # EJS templates
│       └── index.ejs     # Homepage view
│
├── .env                  # Environment variables (e.g., PORT)
├── app.js                # App initialization and middleware
├── server.js             # Main entry point (starts server)
└── package.json
```

---

## ⚙️ Functionality Overview

### Home Page (`/`)

* The homepage is rendered using `index.ejs`, which dynamically receives data from `index.json`.
* This includes a title, description, and an image path – all handled through `indexData` fetched via a service module.
* The image and CSS are served statically from the `public/` directory.

### Static Files

* All assets in the `public/` directory (e.g., stylesheets and images) are automatically served using Express’ static middleware.
* This enables styling and media usage across multiple pages with just one CSS file.

---

## 🧠 How It Works (Flow)

1. **Client requests `/`**
2. The route defined in `routes.js` calls `getIndex` from the controller.
3. `getIndex` fetches JSON data from `services.js`.
4. The JSON is passed to `index.ejs` and rendered on the homepage.
5. Any images or CSS referenced from `/public` are loaded directly by the browser.

---

## 📌 Notes

* This project uses ESM (ECMAScript Modules), so `import`/`export` syntax is used.
* The initial focus is content rendering via JSON and layout styling. Future plans include dynamic user interaction and database integration.


