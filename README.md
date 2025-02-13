<h1 align="center">
   👋 Jorge Peñaranda's Portfolio
</h1>

Hello! I'm a passionate web developer with boundless creativity and an unwavering commitment to
excellence in code. I design and develop websites that are not only visually appealing but also
highly functional and user-friendly. My focus is on creating stunning and effective online
experiences.

![App Screenshot](./public/assets/images/banner.png)

## 🧰 Tech Stack

<div align="center">
  <img src="https://ui.shadcn.com/favicon.ico" height="40" alt="shadcn logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg" height="40" alt="eslint logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" height="40" alt="prisma logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg" height="40" alt="vitest logo" />
</div>

## 🖥️ Running Locally

You need the following programs before you start:

- npm: https://www.npmjs.com/package/download
- PostgreSQL: https://www.postgresql.org/download/

1. Clone the repo

```sh
git clone https://github.com/JorgePeniaranda/Portfolio
```

2. Navigate to the project

```sh
cd ./Portfolio
```

3. Install NPM packages

```sh
npm install
```

4. Set up PostgreSQL:

- Make sure PostgreSQL is installed and running on your machine.
- Create a new database for the project (e.g., portfolio_db).

5. Configure the database connection:

- In the .env file (or create one), set the DATABASE_URL environment variable to match your
  PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"
```

6. Generate Prisma Client:

- After configuring your .env file, run the following command to generate the Prisma Client:

```sh
npm run prisma:generate
```

7. Migrate the database:

- Run Prisma migrations to set up the database schema:

```sh
npm run prisma:migrate
```

8. Execute the project

```sh
npm run dev
```

This will start the development server. You can now access your application at
http://localhost:4321.

## 🔄 Git Flow

This project follows the **Git Flow** workflow for efficient development and deployment.

### Main branches:

- **`main`**: The **Release Candidate (RC)** branch, containing code ready for final testing and
  static build generation for production.
- **`develop`**: The development branch where new features and improvements are implemented.
- **`production`**: Contains the generated static files ready for production. It is updated when the
  code in `main` is ready for deployment.

### Workflow:

1. **Work in `develop`**: Develop new features in feature branches derived from `develop`.

   ```bash
   git checkout develop
   git checkout -b feature/new-feature
   ```

2. **Preparation for testing**: Once a feature is ready, merge the feature branch into `develop` and create a release branch for final testing.

   ```bash
   git checkout develop
   git merge feature/new-feature
   git checkout -b release/v1.0.0
   ```

3. **Testing in `main`**: After testing in the release branch, merge the changes into `main` for additional testing if necessary.

   ```bash
   git checkout main
   git merge release/v1.0.0
   ```

4. **Production deployment**: Once the changes in `main` have been validated, merge `main` into `production`.

   ```bash
   git checkout production
   git merge main
   ```
Here's the updated workflow, including the manual build and deployment process:

---

### 🚀 Deployment

1. **Production deployment**: Once the changes in `main` have been validated, merge `main` into `production`.  

   ```bash
   git checkout production
   git merge main
   ```

2. **Generate the production build**: Start by running the build command to generate the static files needed for production. The build files will be generated in the `docs/` directory.

   ```bash
   npm run dev & npm run build  # Start dev server and build production files
   ```

3. **Ensure `.nojekyll` exists**:  
Before deploying to GitHub Pages, ensure that the `.nojekyll` file exists in the `docs/` folder to prevent Jekyll processing.

   #### **For Linux/macOS**:
   ```bash
   touch docs/.nojekyll  # Creates .nojekyll in the docs folder
   ```

   #### **For Windows (CMD or PowerShell)**:
   ```bash
   echo "" > docs\.nojekyll  # Creates .nojekyll in the docs folder
   ```

4. **Stage the built files**: After the build is complete, add the `docs/` folder (which contains the production build) to the staging area.

   ```bash
   git add -f docs/  # Stage the build files
   ```

5. **Commit and push the changes**: After staging the build files, commit them with a clear message and push them directly to the `production` branch to trigger the deployment.

   ```bash
   git commit -m "Deploy to production" && git push origin production  # Commit and push to production branch
   ```

Now, your `docs/` folder will be included in the `production` branch, making it ready for deployment to **GitHub Pages**. 🚀
