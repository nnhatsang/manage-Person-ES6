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
  }

  deletePerson(id) {
    let newArr = this.getLocalStore().filter((i) => i.userId != id);
    console.log("local", newArr);
    this.saveLocalUser("LIST_PERSON", newArr);
    this.renderGUI();
  }
  renderGUI(arr = this.getLocalStore()) {
    var content = "";
    for (let i = 0; i < arr.length; i++) {
      let valuePerson = arr[i];
      const person = new Person();
      Object.assign(person, valuePerson);
      // console.log(person);
      let { userId, firstName, lastName, email, address, userType } = person;
      content += `
        <tr>
          <td>${userId}</td>
          <td>${firstName} ${lastName}</td>
          <td>${email}</td>
          <td>${address}</td>
          <td>${userType}</td>
          <td>
           <button class="btn btn-warning text-black mb-2 " 
                  onclick="showDetail('${userId}')" >Xem</button></td>
          <td>
           <button
        type="submit"

        class="btn btn-dark mb-2 px-4"
        data-bs-toggle="modal"
                data-bs-target="#myModal"
                onclick="getPerson('${userId}')"
        >Sửa</button>
        <button class="btn btn-danger mb-2 px-4" onclick="deletePerson('${userId}')" >Xoá</button>
          </td>
        </tr>
      `;
    }

    getEl("tableDanhSach").innerHTML = content;
  }
  findPersonById(userId) {
    let arr = listPeople.getLocalStore();
    return arr.find((person) => person.userId === userId);
  }
  detailPerson(userId) {
    // Lấy thông tin người dùng từ localStorage hoặc một nguồn dữ liệu khác
    return this.findPersonById(userId);
  }
  // editInfoUser(value) {
  //   let indexUser = this.getLocalStore().findIndex(
  //     (item) => item.userId == value.userId
  //   );
  //   console.log(indexUser);
  //   if (indexUser != -1) {
  //     this.people[indexUser] = userId;
  //     this.renderGUI(this.people);
  //     this.setLocalStorage(this.people);
  //   }
  // }
}
