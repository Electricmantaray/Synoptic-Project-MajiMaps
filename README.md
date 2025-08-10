---
# Website:
[![alt text][logo]][Website Link]

---
<p align="center">
<b>All data seen in demo and on website is dummy data (fake) for demonstration purposes</b>
</p>

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

---

## Feature Breakdown


### Home based features

<a id="interactive-maps"></a>
<details open>
  <summary><b>Interactive Maps</b></summary>
  <ul>
    <li>Leaflet.js API integration with OpenStreetMaps for accurate, mobile-first mapping</li>
    <li>Highlighted Makers Valley area to focus on general target location</li>
    <li>Dynamic pins showing user-submitted reports which dynamically updates via backend database</li>
    <li>Heatmap distribution view to anonymise sensitive location data while showing problematic areas</li>
    <li>Layer switching between map styles for better accuracy reporting</li>
    <li>"Locate Me" function which prompts user for location permissions and directs the user to their exact location, displaying a circle of uncertainty around them</li>
    <li>Mobile first, aimed to support low-end mobile devices and offline caching for areas of poor connectivity</li>
  </ul>
</details>

---

<a id="report-submission-system"></a>
<details open>
  <summary><b>Report Submission System</b></summary>
  <ul>
    <li>Map based form allowing both GPS and manual pin placement</li>
    <li>Fields:</li>
    <ul>
      <li>Location Data</li>
      <li>Drop down report type</li>
      <li>Description</li>
    </ul>
    <li>Validation on client and server</li>
    <ul>
      <li>Client side for quick feedback</li>
      <li>Server side for SQL injection prevention and spam control on submissions</li>
    </ul>
    <li>Anonymous submissions</li>
    <li>Immediate data upload to database for instant map updates</li>
  </ul>
</details>

---

<a id="navigation-and-layout-system"></a>
<details open>
  <summary><b>Navigation and Layout System</b></summary>
  <ul>
    <li>Shared/Global EJS partials (header, footer) for consistent navigation</li>
    <li>Tailwind CSS responsive design to improve on the mobile first approach</li>
  </ul>
</details>

---

<a id="team-and-contact-info"></a>
<details open>
  <summary><b>Team and Contact Info</b></summary>
  <ul>
    <li>Team Page layout showing contributors and the amount they contributed</li>
    <li>Contact Form:</li>
    <ul>
      <li>Intergrated with nodemailer which sends email to MAJIMAPS official email address</li>
      <li>Validated email address using validation layer, custom validation requiring atleast one checkbox selection</li>
    </ul>
  </ul>
</details>

---

<a id="newsletter-system"></a>
<details open>
  <summary><b>Newsletter System</b></summary>
  <ul>
    <li>Subscription form which stores emails securely in database</li>
    <li>Admin can send personalised emails to all subscribers and filter by subscription type (Newsletter and Emergency)</li>
    <li>Email alerts for emergencies (e.g., droughts, leaks)</li>
  </ul>
</details>

---

<a id="validation-submission-layer"></a>
<details open>
  <summary><b>Validation Submission Layer</b></summary>
  <ul>
    <li>Validation Layer:</li>
    <ul>
      <li>Generalised validation layer intended for all forms to pass through</li>
      <li>Live feedback highlighting correct/incorrect fields and providing a clarifying message</li>
      <li>Modular by design making additions to validation easy to incorporate</li>
      <li>Prevents duplicate submissions and enforces required fields</li>
    </ul>
    <li>Database Validation:</li>
    <ul>
      <li>Tables have appropriate constraints and enforce correct data formatting and types</li>
    </ul>
    <li>SQL injection prevention and rate limiting:</li>
    <ul>
      <li>Utilising 'Bind Variables'/parameterised queries preventing malicious code from being injected</li>
      <li>Form submission have a limited number of requests in a set time frame using express, if this limit is surpassed then user will be timed out for 5 minutes</li>
    </ul>
  </ul>
</details>

---

<a id="database-data-storage"></a>
<details open>
  <summary><b>Database data storage</b></summary>
  <ul>
    <li>PostgreSQL database for:</li>
    <ul>
      <li>Reports</li>
      <li>Contact form</li>
      <li>Newsletter</li>
    </ul>
    <li>Offline cachining so recent maps and report data is available without a connection once successfully loaded</li>
  </ul>
</details>

---
<br></br>
### Admin based features

<a id="secure-server-side-login-system"></a>
<details open>
  <summary><b>Secure Server Side Login System</b></summary>
  <ul>
    <li>Bcrypt password hashing (Comparing hashed entry to .env stored password)</li>
    <li>Session cookie based authentication</li>
    <li>Redirects all active admin routes to login page if unathorised</li>
    <li>Credentials and all sensitive data securely stored in .env and referenced in scripts</li>
  </ul>
</details>

---

<a id="session-based-access"></a>
<details open>
  <summary><b>Session Based Access</b></summary>
  <ul>
    <li>Access to admin page retained until session expiration/cookie termination (browser closed)</li>
    <li>Prevents unauthorised data viewing or modification</li>
  </ul>
</details>

---

<a id="live-statistics"></a>
<details open>
  <summary><b>Live Statistics</b></summary>
  <ul>
    <li>Counters which display various important statistics</li>
    <li>Displayed Statistics:</li>
    <ul>
      <li>Total Reports</li>
      <li>Reports This Week</li>
      <li>Reports This Week (Validated)</li>
    </ul>
  </ul>
</details>

---

<a id="admin-map"></a>
<details open>
  <summary><b>Leaflet.js Admin Map</b></summary>
  <ul>
    <li>Consistent with public map but with pin accuracy access instead of generalised heatmap anonymisation</li>
    <li>Custom colour coded pins for easier visual sorting with expandable information details upon hovering over report</li>
  </ul>
</details>

---

<a id="data-analytics"></a>
<details open>
  <summary><b>Chart.js Data Analytics</b></summary>
  <ul>
    <li>Graphical output showing data trends over the previous 30 days</li>
    <li>Report type seperated by colour</li>
    <li>Verification status seperated by line style</li>
  </ul>
</details>

---

<a id="data-export-to-csv"></a>
<details open>
  <summary><b>Data Export to CSV</b></summary>
  <ul>
    <li>Button generates CSV of reports from database and downloads it to device</li>
    <li>Functionality to auto email current CSV to stakeholders/partners (e.g., Johannesburg Water for easier repairs)</li>
  </ul>
</details>

---

<a id="mass-email-to-subscribers"></a>
<details open>
  <summary><b>Mass Email to Subscribers</b></summary>
  <ul>
    <li>Sends templated personalised updates to newsletter subscribers</li>
    <li>Sends urgent updates to emergency subscribers</li>
  </ul>
</details>

---


## Demonstrations

### Hero/Landing page
<img width="1866" height="1040" alt="image" src="https://github.com/user-attachments/assets/52ead421-8cd4-4e2d-877f-0fa063e15094" />

---

### Mobile First Design
https://github.com/user-attachments/assets/ccc1b68f-ca5d-46e1-9500-519c4dc81a77

---

### Maps
https://github.com/user-attachments/assets/c064f154-c850-44e3-9579-608ff20ce73e

https://github.com/user-attachments/assets/a7d8f0a2-d1d5-490f-a779-2201ebe5eb1d

---

### Report Form
https://github.com/user-attachments/assets/b26db884-5243-4945-8635-100452e25614

---

### Contact Us
https://github.com/user-attachments/assets/a48b4197-2e5a-448d-b5c1-f289b051098b

---

### Email service
https://github.com/user-attachments/assets/d639e6c5-91f5-4277-9179-f6ab8b6d9d9a

<img width="844" height="417" alt="SubscriberEmail" src="https://github.com/user-attachments/assets/8b58524d-3099-4236-bbe7-6fbb3c94847f" />

---

### Admin Login
https://github.com/user-attachments/assets/15494cd8-9ee2-421c-be80-b031dd614cff

---
### Admin Map
https://github.com/user-attachments/assets/f2e87c06-f294-47e1-a8d5-29b8ea4a9846

---

### Chart
https://github.com/user-attachments/assets/a695dbe2-083c-4fd0-a674-d53eed3936d8

---

### CSV Export
https://github.com/user-attachments/assets/f302b477-f356-44d2-b7d7-57f8cb58feff

https://github.com/user-attachments/assets/41f29f33-6658-4a44-8879-8f405b55013e

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

