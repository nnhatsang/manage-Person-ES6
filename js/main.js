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
  const userType = getEl("userType").value;
  let checkType = true;
  let checkInp = true;
  checkType &= validateFieldsByUserType(userType);
  const formInputs = document.querySelectorAll(".form-group input ");

  formInputs.forEach((input, index) => {
    checkInp &= validateField(input.id, arrTB[index]);
  });

  return checkType && checkInp ? true : false;
};
document.addEventListener("DOMContentLoaded", function () {
  validateFormOnLoad();
});

const listPeople = new ListPerson();
listPeople.getLocalStore();
let renderGUI = () => {
  listPeople.renderGUI();
};
let detailPerson = (person) => {
  listPeople.detailPerson(person);
};
let saveLocalUser = () => {
  listPeople.saveLocalUser();
};

let deletePerson = (id) => {
  listPeople.deletePerson(id);
};
renderGUI();
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
  let isValid = validateFormOnLoad();
  // console.log(isValid);

  // console.log(newPerson);
  console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssss", isValid);
  if (isValid) {
    listPeople.addPerson(newPerson);
    saveLocalUser();
    document.querySelector("form").reset();
    renderGUI();
    getEl("additionalFields").innerHTML = "";
    $("#myModal").modal("hide");
  }
}
