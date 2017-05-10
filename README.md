# Lowbar

A practice project to brush up on core js skills.

These functions have the same useage as those in [underscore.js](http://underscorejs.org/).

## Full list of functions

1. identity
2. first
3. last
4. each
5. indexOf
6. filter
7. reject
8. uniq
9. map
10. pluck
11. reduce
12. contains
13. every
14. some
15. extend
16. defaults
17. once
18. memeoize
19. delay
20. shuffle
21. invoke
22. sortBy
23. zip
24. sortedIndex
25. intersection
26. difference
27. flatten
28. throttle

## How to include in another project

Copy the `advanced-lowbar.js` file into your directory and import it into any files that require it.

```javascript
const _ = require('path/to/advanced-lowbar');
```
*Or*
```javascript
import _ from 'path/to/advanced-lowbar';
```

The lowbar functions can then be accessed like this...
```javascript
_.identity();
```

## Running the tests

Ensure that you are running the latest version of node (as of now this is v7.9.0)
```
$ node --version
```

Ensure that you have mocha installed
```
$ npm i mocha -g
```

Install dependancies
```
$ npm i
```

Run the tests
```
$ npm t
```