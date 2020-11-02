const yup = require("yup");
const swal = require("sweetalert2");
const { remote } = require("electron");
const main = require("../main");

// get elements
const image = document.getElementById("image");
const inputImage = document.getElementById("inputImage");
const txtName = document.getElementById("name");
const txtCharge = document.getElementById("charge");
const txtPhone = document.getElementById("phone");
const txtCard = document.getElementById("card");

// validacion de datos
async function validateUser(data) {
  const validationForm = yup.object().shape({
    name: yup
      .string()
      .required("nombre es requerido")
      .matches(
        /^([A-Z\u00C0-\u0178\u00f1]+ )*([A-Z\u00C0-\u0178\u00f1])+$/i,
        "nombre: invalido verificar"
      )
      .min(3, "nombre: debe tener minimo 3 caracteres")
      .max(40, "nombre: demasiado largo maximo 40 caracteres"),
    charge: yup
      .string()
      .required("cargo es requerido")
      .matches(
        /^([A-Z\u00C0-\u0178\u00f1]+ )*([A-Z\u00C0-\u0178\u00f1])+$/i,
        "cargo: solo puede contener letras"
      )
      .max(140, "nombre: demasiado largo maximo 40 caracteres"),
    phone: yup.string(),
    card: yup.string(),
  });

  try {
    const res = await validationForm.validate(data);
    main.registerUser(data);
  } catch (e) {
    swal.fire({
      toast: true,
      icon: "error",
      title: e.message,
      position: "top-right",
    });
  }
}

// submit event
const formUser = document.getElementById("form-user");
formUser.addEventListener("submit", (e) => {
  e.preventDefault(); // evita el envio del form al iniciar

  // get values
  const newUser = {
    name: txtName.value,
    charge: txtCharge.value,
    phone: txtPhone.value,
    card: txtCard.value,
  };
  swal.fire({
    toast: "true",
    icon: "success",
    title: "Usuario agregado!",
    showConfirmButton: false,
    timer: 1500,
    position: "top-right",
  });
  validateUser(newUser);
});

// event open input when press avatar
image.addEventListener("click", () => {
  inputImage.click();
});

// event change input avatar
inputImage.addEventListener("change", () => {
  // validate selection image
  if (inputImage.files[0] !== undefined) {
    const reader = new FileReader();
    reader.readAsDataURL(inputImage.files[0]);

    reader.onload = function (e) {
      image.src = e.target.result;
      // const image = new Image();
      // image.src = e.target.result;

      // image.onload = function () {
      //   const height = image.height;
      //   const width = image.width;
      // };
    };
  }
});
