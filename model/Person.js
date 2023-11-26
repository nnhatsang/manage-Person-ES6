class Person {
  constructor(firstName, lastName, address, id, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.id = id;
    this.email = email;
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
    chemistry
  ) {
    super(firstName, lastName, address, id, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }
}

class Employee extends Person {
  constructor(firstName, lastName, address, id, email, workday, salary) {
    super(firstName, lastName, address, id, email);
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
    rating
  ) {
    super(firstName, lastName, id, email, address);
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
  deletePerson(value) {
    const index = this.people.indexOf(value);
    if (index != -1) {
      this.people.splice(index, 1);
    }
  }
}
