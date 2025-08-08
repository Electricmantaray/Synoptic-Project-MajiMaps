---
# Website:
[![alt text][logo]][Website Link]

---

# MAJIMAPS - Synoptic Project Year 1


[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)




## GitHub setup:

<details>
  <summary><b>Instructions</b></summary>
  
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
    
</details>


## Development

<details>
  <summary><b>Usage</b></summary>

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

</details>


---


# MajiMaps

MajiMaps is an interactive web-based platform for showcasing water infrastructure reporting and mapping systems. This project is finished and is structured using Node.js, Express, and EJS templating. It emphasizes modular design, clean data separation, and scalability for future dynamic features.

## Tech Stack



## Project Structure

<details open>
  <summary><b>File Structure</b></summary>

  ```
  📁 Synoptic-Project-MajiMaps
  ├── 📁 public                         # Static assets served to the client
  │   ├── 📁 css                        # Compiled and source stylesheets
  │   │   ├── output.css
  │   │   └── styles.css
  │   ├── 📁 images                     # Static image assets (omitted here)
  │   └── 📁 scripts                    # Frontend JavaScript files
  │       ├── admin.js
  │       ├── chart.js
  │       ├── main.js
  │       ├── maps.js
  │       └── validation.js
  │
  ├── 📁 src                           # Server-side source code
  │   ├── 📁 controllers                # Route controller logic
  │   │   ├── adminController.js
  │   │   └── controller.js
  │   │
  │   ├── 📁 data                       # Static JSON used in rendering
  │   │   ├── 📁 admin
  │   │   │   ├── dashboardData.json
  │   │   │   ├── dashboardGraph.json
  │   │   │   ├── dashboardMap.json
  │   │   │   ├── dashboardStats.json
  │   │   │   └── login.json
  │   │   ├── 📁 common
  │   │   │   └── common.json
  │   │   └── 📁 main
  │   │       ├── contacts.json
  │   │       ├── hero.json
  │   │       ├── introduction.json
  │   │       ├── maps.json
  │   │       ├── report.json
  │   │       └── team.json
  │   │
  │   ├── 📁 db                         # Database initialization and config
  │   │   ├── DDL-db.sql
  │   │   ├── index-db.js
  │   │   └── initialise-db.js
  │   │
  │   ├── 📁 routes                     # Express route modules
  │   │   ├── adminRoute.js
  │   │   └── routes.js
  │   │
  │   ├── 📁 services                   # Backend service utilities
  │   │   ├── emailService.js
  │   │   ├── pgService.js
  │   │   └── services.js
  │   │
  │   ├── 📁 views                      # EJS templating for server-side rendering
  │   │   ├── 📁 admin
  │   │   │   ├── 📁 pages
  │   │   │   │   ├── dashboard.ejs
  │   │   │   │   ├── dashboardData.ejs
  │   │   │   │   ├── dashboardGraph.ejs
  │   │   │   │   ├── dashboardMap.ejs
  │   │   │   │   ├── dashboardStats.ejs
  │   │   │   │   └── login.ejs
  │   │   │   └── 📁 partials
  │   │   │       └── header.ejs
  │   │   │
  │   │   ├── 📁 main
  │   │   │   ├── 📁 pages
  │   │   │   │   ├── contacts.ejs
  │   │   │   │   ├── hero.ejs
  │   │   │   │   ├── introduction.ejs
  │   │   │   │   ├── layout.ejs
  │   │   │   │   ├── maps.ejs
  │   │   │   │   ├── report.ejs
  │   │   │   │   └── team.ejs
  │   │   │   └── 📁 partials
  │   │   │       ├── footer.ejs
  │   │   │       └── header.ejs
  │   │   │
  │   │   └── 📁 partialsGlobal         # Global partials reused across views
  │   │       ├── head.ejs
  │   │       └── scripts.ejs
  │   │
  │   ├── app.js                        # Main Express app setup
  │   └── index.js                      # Entry point
  │
  ├── .env                              # Runtime environment variables
  ├── .env.example                      # Sample .env file
  ├── .gitignore                        # Ignored files and folders
  ├── package-lock.json                 # Lockfile for npm installs
  ├── package.json                      # Project metadata and dependencies
  ├── postcss.config.cjs                # Tailwind/PostCSS config
  ├── README.md                         # This file
  └── tailwind.config.cjs              # Tailwind custom configuration
  ```
</details>

## Pages / Features

<details open>
  <summary><b>Hero</b></summary>
  
</details>








[logo]: https://github.com/Electricmantaray/Synoptic-Project-MajiMaps/blob/main/public/images/Complete-%20MajiMapsIcon.png "Website Link"
[Website Link]: https://www.hayden-jones.dev/

