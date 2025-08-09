---
# Website:
[![alt text][logo]][Website Link]

---

# MAJIMAPS - Synoptic Project Year 1


[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Postgresql](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/nodemon)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)


## Purpose:

This project was created as part of the [Engineering For People Design Challenege 2025](https://www.ewb-uk.org/upskill/design-challenges/engineering-for-people-design-challenge/), a nationally recognised initiative run by Engineers Without Borders UK. The brief was focused on supporting the Makers Valley community in Johannesburg, South Africa, by building meaningful, practical digital solutions around water infrastructure, accessibility, and local empowerment.

The challenge was designed as a team-based agile sprint, normally tackled by groups of 5–6 students over the course of two weeks, while balancing other end-of-year deadlines. The project followed a clear three-phase structure:

- Design: Researching the context and planning the solution
- Implementation: Developing a functional technical prototype
- Live Demonstration: Presenting and defending the system under assessment

Due to unforeseen circumstances within my group, I ended up taking on full responsibility for the entire implementation phase, alongside leading and completing a substantial portion of the design and demonstration work. This included everything from research and planning to full-stack development, UI/UX, backend design, data integration, and the final live presentation.

Although this wasn’t the original intention, I committed fully to delivering a high-quality outcome, despite the time pressure and scale, the final project earned a distinction mark of 83%.

While I worked independently in this instance, I’m a strong believer in collaborative development and thrive in environments where I can contribute to and learn from a team. This experience simply reinforced my ability to adapt, manage pressure, and take full ownership when needed.

This repository reflects the final assessed version of the project.


---


# MajiMaps

MajiMaps is an interactive web-based platform for showcasing water infrastructure reporting and mapping systems as part of the [Engineering For People Design Challenege 2024-2025](https://www.ewb-uk.org/upskill/design-challenges/engineering-for-people-design-challenge/). This project is finished and is structured using Node.js, Express, and EJS templating. It emphasizes modular design, clean data separation, and scalability for future dynamic features.



## Tech Stack

| Layer         | Technology                          | Purpose                                          |
| ------------- | ----------------------------------- | ------------------------------------------------ |
| **Frontend**  | EJS (Embedded JavaScript) Templates | Dynamic HTML templating for views                |
|               | Tailwind CSS                        | Utility-first styling framework                  |
|               | JavaScript                          | DOM manipulation, map integration, form handling |
| **Backend**   | Node.js + Express.js                | Web server and routing                           |
| **Database**  | PostgreSQL (via `pg` module)        | Storing reports, team info, map data             |
| **Maps API**  | Leaflet.js                          | Interactive map rendering                        |
| **Chart API** | Chart.js                            | Interactive database analytics                   |
| **Emails**    | Nodemailer                          | Email service which provided DB data             |
| **Auth**      | Express-Session / Cookie-based      | Simple admin authentication                      |
| **Testing**   | Manual / Peer testing               | Functional verification                          |
| **Hosting**   | Render Website Hosting              | Provide a real web environment for live marking  |

## Features

### Home based features

<details open>
  <summary><b>Interactive Maps</b></summary>
  <ul>
    <li>Leaflet.js API integration</li>
    <li>Highlighted Makers Valley area</li>
    <li>Display location based pins</li>
    <li>Dynamically updates via backend database</li>
    <li>HeatMap based distribution</li>
    <li>Changing view layers</li>
  </ul>

  
  
</details>

---

<details open>
  <summary><b>Report Submission System</b></summary>
</details>

---

<details open>
  <summary><b>Navigation and Layout System</b></summary>
</details>

---

<details open>
  <summary><b>Team and Contact Info</b></summary>
</details>

---

<details open>
  <summary><b>Newsletter System</b></summary>
</details>

---

<details open>
  <summary><b>Validation Submission Layer</b></summary>
</details>

---

<details open>
  <summary><b>Database data storage</b></summary>
</details>

---

### Admin based features
<details open>
  <summary><b>Secure Server Side Login System</b></summary>
</details>

---

<details open>
  <summary><b>Session Based Access</b></summary>
</details>

---

<details open>
  <summary><b>Chart.JS Data Analytics</b></summary>
</details>

---

<details open>
  <summary><b>Data Export to CSV</b></summary>
</details>

---

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


---


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


[logo]: https://github.com/Electricmantaray/Synoptic-Project-MajiMaps/blob/main/public/images/Complete-%20MajiMapsIcon.png "Website Link"
[Website Link]: https://www.hayden-jones.dev/

