---
# MAJIMAPS - Synoptic Project Year 1
---

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)


## GitHub setup:
---
### If you **HAVE NOT** already setup a github

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


# File structure

## MajiMaps

MajiMaps is an interactive web-based platform for showcasing water infrastructure reporting and mapping systems. This project is finished and is structured using Node.js, Express, and EJS templating. It emphasizes modular design, clean data separation, and scalability for future dynamic features.

---

## Project Structure

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



