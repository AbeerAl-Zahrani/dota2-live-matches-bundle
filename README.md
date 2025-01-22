# NodeCG GP
NodeCG 2.x.x graphics package.

## Features

- Supports an unlimited number of dashboards and graphic files
- Parcel bundler

## Setting up

Clone this repository into your NodeCG instance's `bundles` directory.

Run `yarn` to install dependencies.
Run `yarn build:all` or `yarn build:final` to build dashboards, graphics and extensions.

## Usage

Start your NodeCG instance in a different terminal.

To start development for Dashboard components

 `yarn watch:dashboard` 

For graphics development 
 
`yarn watch:graphics`

For Extension development

`yarn watch:extension`

To create additional dashboards/graphics, create files called

`src/dashboard/index.{name}.tsx` or `src/graphics/index.{name}.tsx`

each one will be wrapped into a HTML page called `dashboard/{name}.html` or `graphics/{name}.html`.

Then reference the created dashboard panel/graphic in `package.json` under `nodecg`. (If you want to customise the generated HTML, create a file called `index.{name}.html`.)

