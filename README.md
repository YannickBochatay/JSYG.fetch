# JSYG.fetch
fetch polyfill with control of http status :
the promise will be rejected if the status is ( < 200 and != 0) or ( >= 300 and != 304 ).


### Installation
```shell
npm install jsyg-fetch
```
You can also install it with bower


### Usage with webpack/babel
```javascript
import fetch from "jsyg-fetch"

fetch("http://myDomain/my/query/")
.then( response => response.json() )
.then( obj => console.log(obj) )
.catch( e => {
    
    e instanceof Error //true
    
    if (e.response.status == 400) console.error("this is a bad request")
})
```