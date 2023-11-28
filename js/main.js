function getEl(value) {
  return document.getElementById(value);
}
function queS(value) {
  return document.querySelector(value);
}
const listPeople = new ListPerson();
let arrPerson = listPeople.people;
console.log(arrPerson);

function showFields() {
  const userType = getEl("userType").value;
  const additionalFieldsContainer = getEl("additionalFields");
  additionalFieldsContainer.innerHTML = "";

  switch (userType) {
    case "Student":
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
      break;
    case "Employee":
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
      break;
    case "Customer":
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
      break;
    default:
      additionalFieldsContainer.innerHTML += ``;
      break;
  }
}

function saveUser() {
  const userType = queS("#userType").value;
  const id = queS("#userId").value;
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
        id,
        firstName,
        lastName,
        address,
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
        id,
        firstName,
        lastName,
        address,
        email,
        additionalFields.workDays,
        additionalFields.dailySalary,
        userType
      );
      newPerson.calcul = newPerson.calcul();
      break;
    case "Customer":
      newPerson = new Customer(
        id,
        firstName,
        lastName,
        address,
        email,
        additionalFields.companyName,
        additionalFields.invoiceValue,
        additionalFields.rating,
        userType
      );
      break;
  }
  console.log(newPerson);

  listPeople.addPerson(newPerson);
  listPeople.saveLocalUser();
  document.querySelector("form").reset();
  getEl("additionalFields").innerHTML = "";
  $("#myModal").modal("hide");
}

// function renderGUI(arr = listPeople) {
//   var content = "";
//   for (let i = 0; i < arr.length; i++) {
//     var person = arr[i];
//     var diemTB =
//       (person.diemToan + person.diemLy + person.diemHoa + person.diemRenLuyen) /
//       4;
//     content += `
//         <tr class="table-dark">
//               <td scope="row">${person.maperson}</td>
//               <td>${person.tenperson}</td>
//               <td>${person.loaiperson}</td>
//               <td>${diemTB}</td>
//               <td>${person.email}</td>
//               <td>${person.soDienThoai}</td>
//               <td>
//                 <button type="button" class="btn btn-danger" onclick="deleteUser('${sinhVien.maSinhVien}')">Xoá</button>
//       <button class="btn btn-warning" onclick="getInfoUser('${sinhVien.maSinhVien}')">Sửa</button>
//               </td>
//             </tr>
//         `;
//   }
//   queS("tableDanhSach").innerHTML = content;
// }
console.log(listPeople.people);
