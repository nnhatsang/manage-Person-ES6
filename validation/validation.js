function checkEmptyValue(value, idSpan) {
  console.log("first", idSpan);
  console.log("fifdfdrst", value);
  if (value == "") {
    getEl(idSpan).innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    getEl(idSpan).innerHTML = "";
    return true;
  }
}
function checkEmail(value, idSpan) {
  var regexMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   sử dụng phương thức test để kiểm tra dữ liệu đầu vào có thoả mãn không
  if (!regexMail.test(value)) {
    document.getElementById(idSpan).innerHTML = "Khônng hợp lệ";

    return false;
  } else {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  }
}

function regexNumInput(value, idSpan) {
  const regex = /^\d+$/;
  if (!regex.test(value)) {
    document.getElementById(idSpan).innerHTML = "Cần nhập số ở vùng này";
    return false;
  } else {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  }
}

function validateStudentFields() {
  let isValid = true;
  isValid &= validateField("math", "spanMath");
  isValid &= validateField("physics", "spanPhysics");
  isValid &= validateField("chemistry", "spanChemistry");
  return isValid;
}

function validateEmployeeFields() {
  let isValid = true;
  isValid &= validateField("workDays", "spanWorkDays");
  isValid &= validateField("dailySalary", "spanDailySalary");
  return isValid;
}

function validateCustomerFields() {
  let isValid = true;
  isValid &= validateField("companyName", "spanCompanyName");
  isValid &= validateField("invoiceValue", "spanInvoiceValue");
  isValid &= validateField("rating", "spanRating");
  return isValid;
}

function validateField(value, idSpan) {
  event.preventDefault();
  const field = document.getElementById(value).value;
  const error = document.getElementById(idSpan);

  switch (value) {
    case "userType":
    case "userId":
    case "firstName":
    case "lastName":
    case "address":
      return checkEmptyValue(field, idSpan);
    case "email":
      return checkEmptyValue(field, idSpan) && checkEmail(field, idSpan);
    case "math":
    case "physics":
    case "chemistry":
    case "workDays":
    case "dailySalary":
    case "rating":
    case "invoiceValue":
      return checkEmptyValue(field, idSpan) && regexNumInput(field, idSpan);
    default:
      return true ? (error.innerHTML = "") : "Còn lỗi";
      break;
  }
}
function validateFieldsByUserType(userType) {
  if (userType == "") return "Chưa chọn người dùng";
  switch (userType) {
    case "Student":
      return validateStudentFields();
    case "Employee":
      return validateEmployeeFields();
    case "Customer":
      return validateCustomerFields();
    default:
      return true;
  }
}