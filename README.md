# drugwars

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d0f0335-f7fe-4968-bad0-dafc28f000f1/deploy-status)](https://app.netlify.com/sites/kw-druugwars/deploys)

Replica of the old windows drugwars game - try to make money by buying/selling drugs.
I plan to update the prices by modelling some demand or other models to make the prices fluctuate, at the moment its only simple 2 point random number (if a>b then increase by a else decrease by a)

see the netlify app running [here](https://kw-druugwars.netlify.app/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# for pinia (the state store) see

https://vueschool.io/articles/vuejs-tutorials/techniques-for-sharing-data-between-vue-js-components/

# outstanding features

demand - the city has a population that demand things, the demand fluctuates which influences the price
