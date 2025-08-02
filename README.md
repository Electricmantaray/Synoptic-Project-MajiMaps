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
📁 Synoptic-Project-MajiMaps               # Root project folder
├── 📁 db                                   # Database initialization scripts
│   └── init-db.sql                         
├── 📁 public                               # Static assets served to client
│   ├── 📁 css                              # Compiled and source stylesheets
│   │   ├── output.css                      
│   │   └── styles.css                      
│   ├── 📁 images                           # Static image assets
│   └── 📁 scripts                          # Frontend JavaScript files
│       ├── main.js                         # Core client-side logic
│       ├── maps.js                         # Map-specific frontend code
│       └── validation.js                   # Form validation logic
├── 📁 src                                  # Server-side source code
│   ├── 📁 controllers                      # Controller logic for route handling
│   │   ├── adminController.js              
│   │   └── controller.js                   
│   ├── 📁 data                             # Static data used by views/controllers
│   │   ├── 📁 admin                        # Admin dashboard data
│   │   │   ├── dashboardCSV.json           
│   │   │   ├── dashboardGraph.json         
│   │   │   ├── dashboardMap.json           
│   │   │   ├── dashboardSend.json          
│   │   │   ├── dashboardStats.json         
│   │   │   └── login.json                  
│   │   ├── 📁 common                       # Shared/global static data
│   │   │   └── common.json                 
│   │   └── 📁 main                         # Main site page data
│   │       ├── contacts.json               
│   │       ├── hero.json                   
│   │       ├── introduction.json           
│   │       ├── maps.json                   
│   │       ├── report.json                 
│   │       └── team.json                   
│   ├── 📁 routes                           # Express routing modules
│   │   ├── adminRoute.js                   
│   │   └── routes.js                       
│   ├── 📁 services                         # Backend utility services
│   │   ├── emailService.js                 # Email dispatch logic
│   │   ├── pgService.js                    # PostgreSQL interaction logic
│   │   └── services.js                     # Shared/general service functions
│   ├── 📁 views                            # EJS templates for rendering pages
│   │   ├── 📁 admin                        # Admin views and partials
│   │   │   ├── 📁 pages                    # Full admin page templates
│   │   │   │   ├── dashboard.ejs           
│   │   │   │   ├── dashboardCSV.ejs        
│   │   │   │   ├── dashboardGraph.ejs      
│   │   │   │   ├── dashboardMap.ejs        
│   │   │   │   ├── dashboardSend.ejs       
│   │   │   │   ├── dashboardStats.ejs      
│   │   │   │   └── login.ejs               
│   │   │   └── 📁 partials                 # Admin partial templates
│   │   │       └── header.ejs              # Admin shared header
│   │   ├── 📁 main                         # Main site views and partials
│   │   │   ├── 📁 pages                    # Main public-facing pages
│   │   │   │   ├── contacts.ejs            
│   │   │   │   ├── hero.ejs                
│   │   │   │   ├── introduction.ejs        
│   │   │   │   ├── layout.ejs              # Shared layout wrapper
│   │   │   │   ├── maps.ejs                
│   │   │   │   ├── report.ejs              
│   │   │   │   └── team.ejs                
│   │   │   └── 📁 partials                 # Public page partials
│   │   │       ├── footer.ejs              
│   │   │       └── header.ejs              
│   │   └── 📁 partialsGlobal               # Global partials used across views
│   │       ├── head.ejs                    # Head tag content (meta, title)
│   │       └── scripts.ejs                 # Shared JS includes
│   ├── app.js                              # Main Express app config and middleware
├── └── index.js                            # Application entry point
├── .env                                    # Environment variable definitions
├── .env.example                            # Example .env for reference/config
├── .gitignore                              
├── package-lock.json                       # Locked package versions (auto-generated)
├── package.json                            # Project metadata, scripts, dependencies
├── postcss.config.cjs                      # PostCSS configuration (used by Tailwind)
├── README.md                               
└── tailwind.config.cjs                     # Tailwind CSS configuration

```



---



