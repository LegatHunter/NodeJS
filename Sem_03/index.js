const fs = require('fs');
const path = require('path')

const obj = {
  name: 'Ivan',
  surname: 'Ivanov',
  age: 33,
  city: 'Moscow'
}

fs.writeFileSync(path.join(__dirname, 'person.json'), JSON.stringify(obj, null, 2))
