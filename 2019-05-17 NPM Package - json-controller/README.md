# json-controller

This plug-in can be used to filter json, reset parameter names, and reset parameter values for front-end and back-end interactions.

## Installation
```
npm install json-controller
```

## Useage
```
import { JsonController } from 'json-controller'

let data = JsonController(this.payload, {
  // Filter the required data
  params: ['id', 'content'],

  // Reset the key of the data
  resetKey: {
    id: 'value',
    content: 'list'
  },

  // Reset the value of the data from key
  resetValue: {
    value: '10'
    list: []
  }
})
```

## Filter JSON
When front-end and back-end data interact, the back-end returns many fields. The front-end only needs some fields. This method can be used to filter data.

```
this.payload = {
  errCode: 0,
  errMsg: '',
  id: 1,
  name: 'lee',
  age: 10,
  info: {
    city: 'ShangHai',
    job: 'WEB'
  }
}

this.payload = JsonController(this.payload, {
  params: ['id', 'name', 'age']
}

// Result
this.payload = {
  id: 1,
  name: 'lee',
  age: 10
}
```

## Reset Key
Sometimes, for example, the field names defined by the front end and the field names defined by the back end are not uniform. This method can be used to modify the field names.

```
this.payload = {
  errCode: 0,
  errMsg: '',
  id: 1,
  name: 'lee',
  age: 10,
  info: {
    city: 'ShangHai',
    job: 'WEB'
  }
}

this.payload = JsonController(this.payload, {
  params: ['id', 'name', 'age'],
  resetKey: {
    id: 'value',
    name: 'author'
  }
}

Result:
this.payload = {
  value: 1,
  author: 'lee',
  age: 10
}
```

## Reset Value

You can use this method to modify the value of a field

```
this.payload = {
  errCode: 0,
  errMsg: '',
  id: 1,
  name: 'lee',
  age: 10,
  info: {
    city: 'ShangHai',
    job: 'WEB'
  }
}

this.payload = JsonController(this.payload, {
  params: ['id', 'name', 'age', 'info'],
  resetKey: {
    id: 'value',
    name: 'author'
  },
  resetValue: {
    value: 10,
    author: 'lean',
    age: '11',
    info: {
      city: 'BeiJing',
      job: 'front-end'
    }
  }
}

Result:
this.payload = {
  value: 10,
  author: 'lean',
  age: 11,
  info: {
    city: 'BeiJing',
    job: 'front-end'
  }
}
```