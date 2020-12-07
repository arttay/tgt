# Case Review App


## Prerequisite
[Node.js](https://nodejs.org/en/)
This will install Node.js and the NPM package manager

[Yarn](https://yarnpkg.com/getting-started/install)
Whiole not required, it will make operations easier 

## Dependencies
After Cloning and cd'ing into the directory, run `npm install` to install all dependencies. If you installed `yarn`, run `yarn` instead.


## Running
To start the server, run the `npm run start` command. Or if you have `yarn` run `yarn start` This server is for development only. See the `Building` section for how to build a production version. 

## Building 
To build a minified and package for production, run the `npm run build` command; `yarn build` 

## Testing
For Target folks, before installing Cypress, see https://target-tts.slack.com/archives/CLYBHBTHV/p1603904439133100


To run tests, run `npm run cy-run` or `yarn cy-run`.  This will open the Cypress dashboard, from there you can run each suite of tests or all tests.


# Assumptions


1. While its not stated in the doc, I need to focus on
    1. Accessibility
    2. Security
2. Some of the API documentation is wrong**
3. The application, at minimum, will need to work in the most recent version of the following
	4. Chrome
	5. IE/Edge
	6. Firefox
4. The document does not state I need to develop by stop number and route, but I will need to create this
5. I’m going to be asked why I didn't use Redux
