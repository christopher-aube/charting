# Charting App

This app makes use of [Typescript](https://www.typescriptlang.org/), [SASS](https://sass-lang.com/), [NodeJS](https://nodejs.dev/), [PostgeSQL](https://www.postgresql.org/), and [Docker](https://www.docker.com/get-started).

Although Node is apart of the Docker container you will need to have it installed to use the commands that instantiate and run the app.

## Setup
To get the app setup, run these commands in your terminal.

`npm install` Get the node dependencies.

`npm run build` This is compile Typescript and SASS files into a dist folder which is used to create the Docker image.

`npm run serve` This will bootup the Docker images/containers. The app is exposed on http://localhost:8080/.

`npm run seed` This will generated random data into the DB.

## The App
The app is an example dashboard that is divided into three main panels: a data table, a chart, and chart controls. There is a header toolbar but that is for display purposes only, which was inspired by this [shot](https://dribbble.com/shots/16328271-Negotiation-tool-Dashboard/attachments/8349046?mode=media) on [dribble](https://dribbble.com/).

The table displays the raw DB values.

The chart is a component using [Highcharts](https://www.highcharts.com/demo). Highcharts requires data to be formatted in a specific manner in order to render the chart. To do that I've made a [translator service](./src/app/scripts/components/chart/translator.ts) that takes in raw (JSON) DB results and a simple configuration object and splits out Highcharts series data.

The controls allow you to change how the chart is constructed. The controls are a custom implementation but heavily inspired from [Material Design](https://material.io/components?platform=web).

## Other
If you make changes to just the frontend, you can run the command `npm run build:app`. If you make changes to just the backend, run `npm run build:server`. After which you can run `npm run serve` to rebuild/replace the Docker image.

It is recommended that you run `npm run lint` command before building.

You can stop and teardown the app with the `npm run stop` command.