class Person {
  constructor(firstName, lastName, address, userId, email, userType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.userId = userId;
    this.email = email;
    this.userType = userType;
  }
}

class Student extends Person {
  constructor(
    firstName,
    lastName,
    address,
    userId,
    email,
    math,
    physics,
    chemistry,
    userType
  ) {
    super(firstName, lastName, address, userId, email, userType);
    this.math = parseFloat(math);
    this.physics = parseFloat(physics);
    this.chemistry = parseFloat(chemistry);
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
    userId,
    email,
    workDays,
    dailySalary,
    userType
  ) {
    super(firstName, lastName, address, userId, email, userType);
    this.workDays = parseInt(workDays);
    this.dailySalary = parseFloat(dailySalary);
  }
  calcul() {
    return this.dailySalary * this.workDays;
  }
}

class Customer extends Person {
  constructor(
    firstName,
    lastName,
    address,
    userId,
    email,
    companyName,
    invoiceValue,
    rating,
    userType
  ) {
    super(firstName, lastName, userId, email, address, userType);
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

  getLocalStore(key = "LIST_PERSON") {
    return JSON.parse(localStorage.getItem(key));
    // let arrLocal = JSON.parse(localStorage.getItem(key));
    // // //   kiểm tra dữ liệu
    // if (arrLocal) {
    //   this.people = arrLocal;
    //   this.renderGUI();
    // }
  }

  deletePerson(id) {
    let newArr = this.getLocalStore().filter((i) => i.userId != id);
    console.log("local", newArr);
    // let arr = this.people;
    // const index = arr.findIndex((person) => person.userId === userId);
    // console.log(this.people);

    // if (index != -1) {
    //   this.people.splice(index, 1);
    // }

    this.saveLocalUser("LIST_PERSON", newArr);
    this.renderGUI();
  }
  renderGUI() {
    let arr = this.getLocalStore();
    var content = "";
    for (let i = 0; i < arr.length; i++) {
      let valuePerson = arr[i];
      const person = new Person();
      Object.assign(person, valuePerson);
      console.log(person);
      let { userId, firstName, lastName, email, address, userType } = person;
      content += `
        <tr>
          <td>${userId}</td>
          <td>${firstName} ${lastName}</td>
          <td>${email}</td>
          <td>${address}</td>
          <td>${userType}</td>
          <td>
           <button class="btn btn-warning text-black mb-2"  data-bs-toggle="modal"
                data-bs-target="#myModal" onclick="detailPerson('${userId}')" >Xem</button></td>
          <td>
           <button
        type="submit"

        class="btn btn-dark mb-2"
        data-bs-toggle="modal"
                data-bs-target="#myModal"
        >Sửa</button>
        <button class="btn btn-danger mb-2" onclick="deletePerson('${userId}')" >Xoá</button>
          </td>
        </tr>
      `;
    }

    getEl("tableDanhSach").innerHTML = content;
  }

  detailPerson(person) {
    console.log(person);
  }
}
