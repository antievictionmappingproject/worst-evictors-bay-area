<h1 align="center">
  Worst Evictors Bay Area
</h1>

This repository is a fork of the Right To Counsel (RTC) NYC
Coalition's Worst Evictors Website, repurposed for the evictors of the
Bay Area. This project is also developed as a companion to the
[Evictorbook](evictorbook.com/) project, as a sort of front-facing and
graphical introduction to the encyclopedic depth of the Evictorbook
tool.

It is based on a
[Gatsby starter](https://github.com/fhavrlent/gatsby-contentful-typescript-starter).
Almost all of the content is pulled from
[Contentful](https://www.contentful.com/).

Please direct any development questions for this project to Nathan Kim
(nathan.kim@yale.edu; also on the AEMP Slack).

## 🚀 Quick start

0. **Prerequisite**

For the moment, the following tools are required:

- Git
- Node v12 (nothing higher)
- Yarn (can be installed with `npm install --global yarn`)

It is also very useful to have Docker and Docker Compose on your
machine. If you are on Windows and choose to use Docker, you can also
consider installing Windows Subsystem for Linux so that Docker picks
up file changes in projects.

1. **Set Contentful API keys.**

Copy **`.env.sample`** to **`.env`** and set your Contentful API
variables. To grab these variables, make an account and create a
content space with [Contentful](https://www.contentful.com/). The
access key should be either a **content delivery token** or a
**content preview token**, not a content management token or a
personal access token. Alternatively, just message Nathan on the AEMP
Slack or email him at nathan.kim@yale.edu for our shared credentials.

2. **Install dependencies.**

Run `yarn --frozen-lockfile` to install all dependencies.

You must include `--frozen-lockfile`; otherwise yarn will break while
installing project dependencies. Specifically, it will try to install
a version of `node-sass` along with `node-gyp` that are incompatible
with each other, and fail.
[`node-sass`](https://github.com/sass/node-sass#node-sass) is a
deprecated project and has not kept up with `node-gyp`; we should
eventually move to [Dart Sass](https://sass-lang.com/dart-sass), but
not right now.

3. **Start developing.**

Run `yarn develop` to start developing.

Your site is now running at `http://localhost:8000`!

_Note: You'll also see a second link:
`http://localhost:8000___graphql`. This is a tool you can use to
experiment with querying your data. Learn more about using this tool
in the
[Gatsby tutorial](https://next.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

4. **Edit some files!**

Open the the repository's root directory in your code editor of choice
and edit `src/pages/index.tsx`. Save your changes and the browser will
update in real time!

## Docker setup

You can also run the site using Docker. Create an `.env` file as per
the quick start instructions, but then run:

```
docker-compose run app yarn --frozen-lockfile
docker-compose up
```

Then visit `http://localhost:8000`!

## Deployment

We deploy our version of the site using
[Netlify](https://www.netlify.com/), which links directly to this repo
and deploys on commits to the master branch. To use Netlify in
deploying your own version, follow this
[step-by-step guide](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

## Code of Conduct

Read about JustFix's code of conduct as an organization on our
[Mission page](https://www.justfix.nyc/our-mission/).
