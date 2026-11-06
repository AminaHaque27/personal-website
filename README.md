# Amina Haque — Personal Website

Source for my personal site: **[aminahaque27.github.io/personal-website](https://aminahaque27.github.io/personal-website/)**

I'm a software engineer and M.S. Computer Science student at The University of Texas at Dallas. The site covers my experience, projects, research, and resume.

## What's here

The site has two modes:

- **Main site** (`/`): a single page with experience, projects, skills, education, and contact details.
- **Retro desktop** (`/#/desktop`): the original version of this portfolio, a retro operating-system desktop with draggable windows, a taskbar, and a typing mini-game. Sound is off until you turn it on.

## Built with

- React 19 (Create React App)
- React Router (hash routing, so it works on GitHub Pages)
- Plain CSS, with light and dark themes on the main site
- GitHub Pages for hosting

## Project structure

```
public/                    Static files: resume PDF, images, sounds
src/
  data/siteData.js         All site content (experience, projects, skills, education)
  Components/
    Home.js / Home.css             Main site
    IntroDesktop.js / .css         Boot screen for the retro desktop
    MainPage.js / MainPage.css     Retro desktop
    TypingGame.js / .css           Typing mini-game
```

To update a job, project, or skill, edit `src/data/siteData.js`. Both the main site and the retro desktop read from it.

To update the resume, replace `public/Amina_Haque_Resume.pdf` (keep the same file name).

## Running locally

```bash
npm install
```

```bash
npm start
```

The site opens at `http://localhost:3000/personal-website`.

## Deploying

```bash
npm run deploy
```

This builds the site and publishes it to the `gh-pages` branch.

## Contact

- Email: aminashaque@gmail.com
- LinkedIn: [linkedin.com/in/amina-syeda-haque](https://www.linkedin.com/in/amina-syeda-haque/)
