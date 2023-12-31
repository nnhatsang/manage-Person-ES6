const getEl = (value) => document.getElementById(value);
const queS = (value) => document.querySelector(value);

const arrID = [
    "userType",
    "userId",
    "firstName",
    "lastName",
    "email",
    "address",
    "math",
    "physics",
    "chemistry",
    "workDays",
    "dailySalary",
    "companyName",
    "invoiceValue",
    "rating",
  ],
  arrTB = [
    "spanUserType",
    "spanUserId",
    "spanFirsrName",
    "spanLastName",
    "spanEmail",
    "spanAddress",
    "spanMath",
    "spanPhysics",
    "spanChemistry",
    "spanWorkDays",
    "spanDailySalary",
    "spanCompanyName",
    "spanInvoiceValue",
    "spanRating",
  ];
const validateFormOnLoad = () => {
  // const userType = getEl("userType").value;
  // let checkType = true;
  // checkType &= validateFieldsByUserType(userType);
  // const formInputs = document.querySelectorAll(".form-group input ");
  // let checkInp = true;

  // formInputs.forEach((input, index) => {
  //   checkInp &= validateField(arrID[index], arrTB[index]);
  //   console.log(checkInp);
  // });

  // return checkType && checkInp ? true : false;
  var check = true;
  for (let i = 0; i < arrID.length; i++) {
    check &= validateField(arrID[i], arrTB[i]);
  }
  return check ? true : false;
};
document.addEventListener("DOMContentLoaded", function () {
  validateFormOnLoad();
});

const listPeople = new ListPerson();
console.log(listPeople.people);
listPeople.getLocalStore();
let renderGUI = () => {
  listPeople.renderGUI();
};
let detailPerson = (userId) => {
  listPeople.detailPerson(userId);
};
let saveLocalUser = () => {
  listPeople.saveLocalUser();
};

let deletePerson = (id) => {
  listPeople.deletePerson(id);
};
let addPerson = (value) => {
  listPeople.addPerson(value);
  saveLocalUser();
};
renderGUI();
getEl("addPerson").addEventListener("click", () => {
  document.querySelector("form").reset();
  getEl("btnCapNhat").style.display = "none";
  getEl("btnThemNV").style.display = "block";
});
function showFields() {
  const userType = getEl("userType").value;
  const additionalFieldsContainer = getEl("additionalFields");
  additionalFieldsContainer.innerHTML = "";

  switch (userType) {
    case "Student":
      additionalFieldsContainer.innerHTML += `
             <div class="form-group">
                <label for="math">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="math"
                  placeholder="Nhập điểm Toán"
                  oninput="validateField('math', 'spanMath')"
                />
                <span id="spanMath" class="text-danger"></span>
              </div>

      
      
      <div class="form-group">
        <label for="physics">Lý:</label>
        <input type="text" class="form-control" id="physics" placeholder="Nhập điểm Lý"
                  oninput="validateField('physics', 'spanPhysics')"

        >
        <span id="spanPhysics" class="text-danger"></span>
      </div>
      <div class="form-group">
        <label for="chemistry">Hóa:</label>
        <input type="text" class="form-control" id="chemistry" placeholder="Nhập điểm Hóa"
                  oninput="validateField('chemistry', 'spanChemistry')"
        >
        <span id="spanChemistry" class="text-danger"></span>
        
      </div>
    `;
      break;
    case "Employee":
      additionalFieldsContainer.innerHTML += `
      <div class="form-group">
        <label for="workDays">Số Ngày Làm Việc:</label>
        <input type="text" class="form-control" id="workDays" placeholder="Nhập số ngày làm việc"
                  oninput="validateField('workDays', 'spanWorkDays')"
        >
        <span id="spanWorkDays" class="text-danger"></span>

      </div>
      <div class="form-group">
        <label for="dailySalary">Lương Theo Ngày:</label>
        <input type="text" class="form-control" id="dailySalary" placeholder="Nhập lương theo ngày"
                  oninput="validateField('dailySalary', 'spanDailySalary')"
        >
        <span id="spanDailySalary" class="text-danger"></span>
      </div>
    `;
      break;
    case "Customer":
      additionalFieldsContainer.innerHTML += `
      <div class="form-group">
        <label for="companyName">Tên Công Ty:</label>
        <input type="text" class="form-control" id="companyName" placeholder="Nhập tên công ty"
                  oninput="validateField('companyName', 'spanCompanyName')"
        >
        <span id="spanCompanyName" class="text-danger"></span>
      </div>
      <div class="form-group">
        <label for="invoiceValue">Trị Giá Hóa Đơn:</label>
        <input type="text" class="form-control" id="invoiceValue" placeholder="Nhập trị giá hóa đơn"
                  oninput="validateField('invoiceValue', 'spanInvoiceValue')"
        >
        <span id="spanInvoiceValue" class="text-danger"></span>
      </div>
      <div class="form-group">
        <label for="rating">Đánh Giá:</label>
        <input type="text" class="form-control" id="rating" placeholder="Nhập đánh giá"
                  oninput="validateField('rating', 'spanRating')"
        >
        <span id="spanRating" class="text-danger"></span>
      </div>
    `;
      break;
    default:
      additionalFieldsContainer.innerHTML += ``;
      break;
  }
}

function addUser() {
  event.preventDefault();
  const userType = queS("#userType").value;
  const userId = queS("#userId").value;
  const firstName = queS("#firstName").value;
  const lastName = queS("#lastName").value;
  const email = queS("#email").value;
  const address = queS("#address").value;
  listPeople.getLocalStore();

  let additionalFields;
  switch (userType) {
    case "Student":
      const math = queS("#math").value;
      const physics = queS("#physics").value;
      const chemistry = queS("#chemistry").value;
      additionalFields = { math, physics, chemistry, userType };
      break;
    case "Employee":
      const workDays = queS("#workDays").value;
      const dailySalary = queS("#dailySalary").value;
      additionalFields = { workDays, dailySalary, userType };
      break;
    case "Customer":
      const companyName = queS("#companyName").value;
      const invoiceValue = queS("#invoiceValue").value;
      const rating = queS("#rating").value;
      additionalFields = { companyName, invoiceValue, rating, userType };
      break;
    default:
      additionalFields = {};
  }

  // Create an instance of the appropriate Person class
  let newPerson;
  switch (userType) {
    case "Student":
      newPerson = new Student(
        firstName,
        lastName,
        address,
        userId,
        email,
        additionalFields.math,
        additionalFields.physics,
        additionalFields.chemistry,
        userType
      );
      newPerson.calculAverage = newPerson.calculAverage();
      break;
    case "Employee":
      newPerson = new Employee(
        firstName,
        lastName,
        address,
        userId,
        email,
        additionalFields.workDays,
        additionalFields.dailySalary,
        userType
      );
      newPerson.calcul = newPerson.calcul();
      break;
    case "Customer":
      newPerson = new Customer(
        firstName,
        lastName,
        address,
        userId,
        email,
        additionalFields.companyName,
        additionalFields.invoiceValue,
        additionalFields.rating,
        userType
      );
      break;
  }
  let isValid = validateField();
  // console.log(isValid);

  // console.log(newPerson);
  console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssss", isValid);
  if (isValid) {
    addPerson(newPerson);
    document.querySelector("form").reset();
    renderGUI();
    getEl("additionalFields").innerHTML = "";
    $("#myModal").modal("hide");
  }
}

function getPerson(userId) {
  // Assuming you have the arr variable containing your list of persons
  let person = listPeople.detailPerson(userId);

  // Set the modal fields with the person's information
  getEl("userId").value = person.userId;
  getEl("firstName").value = person.firstName;
  getEl("lastName").value = person.lastName;
  getEl("email").value = person.email;
  getEl("address").value = person.address;
  getEl("userType").value = person.userType;

  // Trigger the function to show additional fields based on userType
  showFields();

  // Set additional fields based on userType
  switch (person.userType) {
    case "Student":
      getEl("math").value = person.math || "";
      getEl("physics").value = person.physics || "";
      getEl("chemistry").value = person.chemistry || "";
      break;
    case "Employee":
      getEl("workDays").value = person.workDays || "";
      getEl("dailySalary").value = person.dailySalary || "";
      break;
    case "Customer":
      getEl("companyName").value = person.companyName || "";
      getEl("invoiceValue").value = person.invoiceValue || "";
      getEl("rating").value = person.rating || "";
      break;
    default:
      break;
  }

  // Change the submit button to update mode
  getEl("btnThemNV").style.display = "none";
  getEl("btnCapNhat").style.display = "block";

  // Show the modal
  $("#myModal").modal("show");
}
function showDetail(userId) {
  // Tìm người dùng trong danh sách dựa trên userId
  let selectedUser = listPeople.detailPerson(userId);
  console.log(selectedUser);
  if (selectedUser) {
    showDetailModal(selectedUser);
  } else {
    console.log(`User with userId ${userId} not found.`);
  }
}
getEl("btnCapNhat").onclick = updatePerson;

function updatePerson() {
  // Get the user ID from the modal
  const userId = getEl("userId").value;
  let arr = listPeople.getLocalStore();
  console.log(arr);
  // Find the index of the person in the array
  const index = arr.findIndex((p) => p.userId === userId);
  console.log(index);
  // Update the person's information
  arr[index].userId = getEl("userId").value;
  arr[index].firstName = getEl("firstName").value;
  arr[index].lastName = getEl("lastName").value;
  arr[index].email = getEl("email").value;
  arr[index].address = getEl("address").value;
  arr[index].userType = getEl("userType").value;

  console.log(arr[index].math);
  // Update additional fields based on userType
  switch (arr[index].userType) {
    case "Student":
      arr[index].math = getEl("math").value;
      arr[index].physics = getEl("physics").value;
      arr[index].chemistry = getEl("chemistry").value;

      break;
    case "Employee":
      arr[index].workDays = getEl("workDays").value;
      arr[index].dailySalary = getEl("dailySalary").value;
      break;
    case "Customer":
      arr[index].companyName = getEl("companyName").value;
      arr[index].invoiceValue = getEl("invoiceValue").value;
      arr[index].rating = getEl("rating").value;
      break;
    default:
      break;
  }
  console.log(arr);
  // Update the GUI to reflect the changes
  listPeople.saveLocalUser("LIST_PERSON", arr);
  renderGUI();

  // Close the modal
  $("#myModal").modal("hide");
}
function showDetailModal(person) {
  // Gán thông tin từ person vào modal
  document.getElementById("modalUserId").innerText = person.userId;
  document.getElementById("modalFirstName").innerText = person.firstName;
  document.getElementById("modalLastName").innerText = person.lastName;
  document.getElementById("modalEmail").innerText = person.email;
  document.getElementById("modalAddress").innerText = person.address;
  document.getElementById("modalUserType").innerText = person.userType;
  switch (person.userType) {
    case "Student":
      showStudentDetails(person);
      break;
    case "Employee":
      showEmployeeDetails(person);
      break;
    case "Customer":
      showCustomerDetails(person);
      break;
    default:
      break;
  }
  $("#detailModal").modal("show");
}

function showStudentDetails(student) {
  const modalInfoDetail = document.getElementById("modalInfoDetail");
  modalInfoDetail.innerHTML = `
    <p><strong>Math:</strong> ${student.math}</p>
    <p><strong>Physics:</strong> ${student.physics}</p>
    <p><strong>Chemistry:</strong> ${student.chemistry}</p>
    <p><strong>Average:</strong> ${student.calculAverage}</p>
  `;
}

function showEmployeeDetails(employee) {
  const modalInfoDetail = document.getElementById("modalInfoDetail");
  modalInfoDetail.innerHTML = `
    <p><strong>Work Days:</strong> ${employee.workDays}</p>
    <p><strong>Daily Salary:</strong> ${employee.dailySalary}</p>
    <p><strong>Total Salary:</strong> ${employee.calcul}</p>
  `;
}

function showCustomerDetails(customer) {
  const modalInfoDetail = document.getElementById("modalInfoDetail");
  modalInfoDetail.innerHTML = `
    <p><strong>Company Name:</strong> ${customer.companyName}</p>
    <p><strong>Invoice Value:</strong> ${customer.invoiceValue}</p>
    <p><strong>Rating:</strong> ${customer.rating}</p>
  `;
}
//
(function sort1(a, b) {
  return a - b;
});
(function sort9(a, b) {
  return a - b;
});
getEl("SapXepTang").addEventListener("click", function () {
  getEl("SapXepTang").style.display = "none";
  getEl("SapXepGiam").style.display = "block";
  // console.log("dsNhanVien", dsNhanVien);
  var arrSort = listPeople.getLocalStore().sort(function (a, b) {
    return a.firstName.localeCompare(b.firstName);
  });
  listPeople.renderGUI(arrSort);
});

getEl("SapXepGiam").addEventListener("click", function () {
  getEl("SapXepGiam").style.display = "none";
  getEl("SapXepTang").style.display = "block";
  var arrSort = listPeople.getLocalStore().sort(function (a, b) {
    return b.firstName.localeCompare(a.firstName);
  });
  listPeople.renderGUI(arrSort);
});

getEl("filterRole").onchange = () => {
  let checkInputRender = document.getElementById("filterRole").value;

  if (checkInputRender == "all") {
    renderGUI();
  }
  if (checkInputRender == "Student") {
    let renderAllStudent = listPeople
      .getLocalStore()
      .filter((item) => item.userType == "Student");
    console.log(renderAllStudent);
    listPeople.renderGUI(renderAllStudent);
  }
  if (checkInputRender == "Employee") {
    let renderAllEmployee = listPeople
      .getLocalStore()
      .filter((item) => item.userType == "Employee");
    console.log(renderAllEmployee);
    listPeople.renderGUI(renderAllEmployee);
  }
  if (checkInputRender == "Customer") {
    let renderAllCustomer = listPeople
      .getLocalStore()
      .filter((item) => item.userType == "Customer");
    console.log(renderAllCustomer);

    listPeople.renderGUI(renderAllCustomer);
  }
};
