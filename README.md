# Simple React Panel

This is just a stub to show how you can create a basic visualization plugin.

First, install dependencies:
```
yarn install
```

To work with this plugin run:
```
yarn dev
```

or
```
yarn watch
```

This will run linting tools and apply prettier fix.


To build the plugin run:
```
yarn build
```


docker run -d -p 3000:3000 --name grafana-giphy-panel -e GF_COOKIE_SAMESITE=none -e GF_COOKIE_SECURE=true --volume /Users/iz/code/grafana-giphy-panel/dist:/var/lib/grafana/plugins/giphy-panel grafana/grafana
