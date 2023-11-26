function getEl(value) {
  return document.getElementById(value);
}
function queS(value) {
  return document.querySelector(value);
}
const listPeople = new ListPerson();

function showFields() {
  const userType = document.getElementById("userType").value;
  const additionalFieldsContainer = document.getElementById("additionalFields");


  if (userType === "Student") {
    additionalFieldsContainer.innerHTML += `
      <div class="form-group">
        <label for="math">Toán:</label>
        <input type="text" class="form-control" id="math" placeholder="Nhập điểm Toán">
      </div>
      <div class="form-group">
        <label for="physics">Lý:</label>
        <input type="text" class="form-control" id="physics" placeholder="Nhập điểm Lý">
      </div>
      <div class="form-group">
        <label for="chemistry">Hóa:</label>
        <input type="text" class="form-control" id="chemistry" placeholder="Nhập điểm Hóa">
      </div>
    `;
  } else if (userType === "Employee") {
    additionalFieldsContainer.innerHTML += `
      <div class="form-group">
        <label for="workDays">Số Ngày Làm Việc:</label>
        <input type="text" class="form-control" id="workDays" placeholder="Nhập số ngày làm việc">
      </div>
      <div class="form-group">
        <label for="dailySalary">Lương Theo Ngày:</label>
        <input type="text" class="form-control" id="dailySalary" placeholder="Nhập lương theo ngày">
      </div>
    `;
  } else if (userType === "Customer") {
    additionalFieldsContainer.innerHTML += `
      <div class="form-group">
        <label for="companyName">Tên Công Ty:</label>
        <input type="text" class="form-control" id="companyName" placeholder="Nhập tên công ty">
      </div>
      <div class="form-group">
        <label for="invoiceValue">Trị Giá Hóa Đơn:</label>
        <input type="text" class="form-control" id="invoiceValue" placeholder="Nhập trị giá hóa đơn">
      </div>
      <div class="form-group">
        <label for="rating">Đánh Giá:</label>
        <input type="text" class="form-control" id="rating" placeholder="Nhập đánh giá">
      </div>
    `;
  }
}

function saveUser() {
  const userType = document.querySelector("#userType").value;
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const address = document.querySelector("#address").value;

  let additionalFields;

  if (userType === "Student") {
    const math = document.querySelector("#math").value;
    const physics = document.querySelector("#physics").value;
    const chemistry = document.querySelector("#chemistry").value;

    additionalFields = { math, physics, chemistry };
  } else if (userType === "Employee") {
    const workDays = document.querySelector("#workDays").value;
    const dailySalary = document.querySelector("#dailySalary").value;

    additionalFields = { workDays, dailySalary };
  } else if (userType === "Customer") {
    const companyName = document.querySelector("#companyName").value;
    const invoiceValue = document.querySelector("#invoiceValue").value;
    const rating = document.querySelector("#rating").value;

    additionalFields = { companyName, invoiceValue, rating };
  }

  // Create an instance of the appropriate Person class
  let newPerson;
  if (userType === "Student") {
    newPerson = new Student(
      firstName,
      lastName,
      address,
      email,
      additionalFields.math,
      additionalFields.physics,
      additionalFields.chemistry
    );
  } else if (userType === "Employee") {
    newPerson = new Employee(
      firstName,
      lastName,
      address,
      email,
      additionalFields.workDays,
      additionalFields.dailySalary
    );
  } else if (userType === "Customer") {
    newPerson = new Customer(
      firstName,
      lastName,
      address,
      email,
      additionalFields.companyName,
      additionalFields.invoiceValue,
      additionalFields.rating
    );
  }

  // Add the new person to the list
  listPeople.addPerson(newPerson);
  console.log(listPeople);

  // Alert to show the user information (you can remove this if not needed)
  alert(`Thông tin Người Dùng:
    Loại: ${userType},
    Họ: ${firstName},
    Tên: ${lastName},
    Email: ${email},
    Địa Chỉ: ${address},
    ${additionalFields}`);

  // Hide the modal
  $("#myModal").modal("hide");
}
