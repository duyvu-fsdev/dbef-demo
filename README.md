# Hello

## Push github

`git remote add origin https://github.com/user/repo.git`
`git branch -M main`
`git init`
`git add .`
`git commit -m 'message'`
`git push -u origin master`

## Cài đặt customize-cra : `npm i customize-cra react-app-rewired -D`

---

..Create a `config-overrides.js` file in the root directory

    module.exports = function override(config, env) {

//do stuff with the webpack config...
return config;
}

---

..'Flip' the existing calls to react-scripts in npm scripts for start, build and test `package.json`

      "scripts": {
    -   "start": "react-scripts start",
    +   "start": "`react-app-rewired` start",
    -   "build": "react-scripts build",
    +   "build": "`react-app-rewired` build",
    -   "test": "react-scripts test",
    +   "test": "`react-app-rewired` test",
        "eject": "react-scripts eject"
    }

---

## Cài đặt babel-plugin-module-resolver : `npm install --save-dev babel-plugin-module-resolver`

---

Specify the plugin in your `.babelrc` with the custom root or alias. Here's an example:

    {
      "plugins": [
        ["module-resolver", {
          "alias": {
            "~": "./src"
          }
        }]
      ]
    }

---

..VS Code: Configure the path mapping in `jsconfig.json` file in the root directory

    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "~/*": ["src/*"]
        }
      }
    }

---

..Edit the `config-overrides.js` file in the root directory

    const { override, useBabelRc } = require("customize-cra");
    module.exports = override(

useBabelRc()
);

---

## Cài đặt và cấu hình Prettier

..create `.prettierrc` file in the root directory

{
"arrowParens": "always",
"bracketSameLine": false,
"bracketSpacing": true,
"embeddedLanguageFormatting": "auto",
"htmlWhitespaceSensitivity": "css",
"insertPragma": false,
"jsxSingleQuote": false,
"printWidth": 120,
"proseWrap": "preserve",
"quoteProps": "as-needed",
"requirePragma": false,
"semi": true,
"singleQuote": true,
"tabWidth": 4,
"trailingComma": "all",
"useTabs": false,
"vueIndentScriptAndStyle": false
}

..create `.vscode/settings.json` file

{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
}

---

## Cấu hình sử dụng CSS/SASS

..reate file `GlobalStyles.scss`
..Tạo GlobalStyles component

..Cài thư viện SASS: `npm i -D sass`
..Reset CSS : `npm install --save normalize.css`

..`@import 'normalize.css`'; to file GlobalStyles.scss

..Default CSS: font-family, font-size, line-height

---

## Cài đặt react-router-dom: `npm i react-router-dom`

---

## Cài thư viện classnames: `npm i classnames`

---

## Cài thư viện axios: `npm install axios`

---

## Cài thư viện Material UI: `npm install @mui/material @emotion/react @emotion/styled`

..Cài Material Icons font: `npm install @mui/icons-material` or add `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>` at `public/index.html`

..Cài Roboto font: `npm install @fontsource/roboto` or add `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>` at `public/index.html`

...All Components : `https://mui.com/material-ui/` ... `Overriding styles with class names - className` see more `https://mui.com/material-ui/customization/how-to-customize/`

## Cài thư viện moedim :`npm i -s moedim` tạo calendar

.. use

... `import Calendar from 'moedim'; ... <Calendar className={cx('calendar')} onChange={() => {}} />`
