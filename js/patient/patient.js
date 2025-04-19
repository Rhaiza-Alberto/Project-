function editProfile() {
  const name = prompt("Enter patient name:", document.getElementById("patient-name").textContent);
  const age = prompt("Enter age:", document.getElementById("patient-age").textContent.replace("Age: ", ""));
  const gender = prompt("Enter gender:", document.getElementById("patient-gender").textContent.replace("Gender: ", ""));

  if (name) document.getElementById("patient-name").textContent = name;
  if (age) document.getElementById("patient-age").textContent = "Age: " + age;
  if (gender) document.getElementById("patient-gender").textContent = "Gender: " + gender;
}
