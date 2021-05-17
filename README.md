# Quasar Chat App

> A Quasar project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

## Message Data Structure

``` javascript

{
  id: String,
  name: String,
  text: Array,
  avatar: String,
  side: Boolean,
  info: Object {
    type: String,
    stamp: Date,
    sent: Object {
      state: Boolean,
      at: Date
    },
    seen: Object {
      state: Boolean,
      at: Date
    },
    delivered: Object {
      state: Boolean,
      at: Date
    }
  }
}
