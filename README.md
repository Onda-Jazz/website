# Local build instructions


## Install software

```
bundle install
```

## development mode building
```
bundle exec jekyll serve --watch --config _config.yml,_config_local.yml
```

## Build the CSS

```
./node_modules/.bin/grunt recess
```

## Build the JS

```
./lint.sh
./node_modules/.bin/grunt default
node deploy.js
```
