class Person {
  constructor(firstName, lastName, address, id, email, userType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.id = id;
    this.email = email;
    this.userType = userType;
  }
}

class Student extends Person {
  constructor(
    firstName,
    lastName,
    address,
    id,
    email,
    math,
    physics,
    chemistry,
    userType
  ) {
    super(firstName, lastName, address, id, email, userType);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }
  calculAverage() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

class Employee extends Person {
  constructor(
    firstName,
    lastName,
    address,
    id,
    email,
    workday,
    salary,
    userType
  ) {
    super(firstName, lastName, address, id, email, userType);
    this.workday = workday;
    this.salary = salary;
  }
  calcul() {
    return this.salary * this.workday;
  }
}

class Customer extends Person {
  constructor(
    firstName,
    lastName,
    address,
    id,
    email,
    companyName,
    invoiceValue,
    rating,
    userType
  ) {
    super(firstName, lastName, id, email, address, userType);
    this.rating = rating;
    this.companyName = companyName;
    this.invoiceValue = invoiceValue;
  }
}

class ListPerson {
  constructor() {
    this.people = [];
  }
  addPerson(value) {
    this.people.push(value);
  }
  saveLocalUser(key = "LIST_PERSON", value = this.people) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStore(key = "LIST_PERSON", arrLocal = this.people) {
    arrLocal = JSON.parse(localStorage.getItem(key));
  }

  deletePerson(value) {
    const index = this.people.indexOf(value);
    if (index != -1) {
      this.people.splice(index, 1);
    }
  }
}
