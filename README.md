# Install

First of all - the build process is based on node. To install node -
https://nodejs.org/es/download/

Make sure you have yarn installed - https://yarnpkg.com/en/docs/install

Then in project directory:
```
yarn global add gulp-cli
yarn install
```

Compile project:
```
gulp

# or
npm run build
```

Compile templates ony:
```
gulp templates
```

Edit mode
```
gulp dev

# or
npm run serve
```

# Content ideas

the content ideas are managed on https://app.asana.com/0/734282938557938/board

# Branch build

Each branch is build & deployed to:
http://efektywnyaltruizm.org.s3-website.eu-central-1.amazonaws.com/
