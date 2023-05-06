document.addEventListener("DOMContentLoaded", function () {
  //Seleccionamos los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputpassword = document.querySelector("#password");

  const btnEnviar = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const formulario = document.querySelector("#formulario");
  const spinner = document.querySelector("#spinner");
  //OCULTAMOS SPINNER REMOVIENDO SU CLASE
  //   spinner.classList.remove("sk-fading-circle");

  const userLogin = {
    email: "manuel.luevano21@gmail.com",
    password: "silverx25",
  };

  btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();

    //AGREGAMOS EFECTO SPINNER
    spinner.classList.add("sk-fading-circle");

    //VALIDAR LOGIN
    console.log("user", datosEnviar, "login", userLogin);
    if (
      datosEnviar.email === userLogin.email &&
      datosEnviar.password === userLogin.password
    ) {
      console.log("Login Success");
      setTimeout(function () {
        spinner.classList.remove("sk-fading-circle");

        //Reseteamos el formulario
        resetearFormulario();

        //MENSAJE DE ENVIO CORRECTO
        const alertaExito = document.createElement("P");
        alertaExito.classList.add(
          "bg-green-500",
          "text-white",
          "p-3",
          "text-center",
          "rounded-lg",
          "mt-10",
          "font-bold",
          "text-sm",
          "uppercase"
        );

        alertaExito.textContent = "Login Correcto!";
        formulario.appendChild(alertaExito);

        setTimeout(() => {
          alertaExito.remove();
          // location.replace("/pages/home.html");
        }, 2000);

        formulario.reset();
        comprobarFormulario();
      }, 2000);
    } else {
      setTimeout(function () {
        spinner.classList.remove("sk-fading-circle");

        // LOGIN ERROR
        const alertaError = document.createElement("P");
        alertaError.classList.add(
          "bg-red-600",
          "text-white",
          "p-2",
          "text-center",
          "rounded-lg",
          "mt-10",
          "font-bold",
          "text-sm",
          "uppercase"
        );

        alertaError.textContent =
          "* Por favor revisa tu correo y contraseña. Los campos son sensibles a mayúsculas y minúsculas.        !";
        formulario.appendChild(alertaError);

        setTimeout(() => {
          alertaError.remove();
          //reset input password
          inputpassword.value = "";
        }, 3000);

        comprobarFormulario();
      }, 2000);
    }
  });

  const datosEnviar = {
    email: "",
    password: "",
  };

  //   console.log(datosEnviar);

  // EVENTO AL SALIR DEL INPUT
  inputEmail.addEventListener("blur", validation);
  inputpassword.addEventListener("blur", validation);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetearFormulario();

    formulario.reset();
    comprobarFormulario();
  });

  //Funcion para valir el input al salir
  function validation(e) {
    comprobarFormulario();
    if (e.target.value.trim() === "") {
      //   console.log("Esta Vacio");
      mostrarAlerta(e.target.name, e.target.parentElement);
      //   console.log(e.target.parentElement);
      datosEnviar[e.target.name] = "";
      comprobarFormulario();
      return;
    }

    //VALIDAR EMAIL
    const resultado = validarEmail(e.target.value);
    if (e.target.id === "email" && !resultado) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      datosEnviar[e.target.name] = "";

      comprobarFormulario();

      return;
    }

    limpiarAlerta(e.target.parentElement);

    //ASIGNAR LOS VALORES AL OBJETO
    datosEnviar[e.target.name] = e.target.value.trim().toLowerCase();

    //VALIDAMOS QUE TODOS LOS CAMPOS TENGAN VALOR
    comprobarFormulario();

    console.log(datosEnviar);
  }

  function mostrarAlerta(mensaje, reference) {
    //COMPRUEBA SI EXISTE YA EL MENSAJE DE ERROR
    limpiarAlerta(reference);

    const error = document.createElement("P");

    error.textContent = `Hubo un error... el campo ${mensaje} es obligatorio`;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //inyectar el error al formulario
    reference.appendChild(error);
  }

  function limpiarAlerta(reference) {
    console.log("Desde limpiar Alerta");
    //COMPRUEBA SI EXISTE YA EL MENSAJE DE ERROR
    const alerta = reference.querySelector(".bg-red-600");
    console.log(alerta);
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    //expresion regular
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    console.log(resultado);

    return resultado;
  }

  function validarPassword(password) {
    console.log("Paswword obtenido", password);
    if (password === "silverx25") {
      return true;
    }
    return false;
  }

  function comprobarFormulario() {
    const result = Object.values(datosEnviar).includes("");
    if (result) {
      //Agregamos el disabled y opacidad del boton
      btnEnviar.disabled = true;
      btnEnviar.classList.add("opacity-50");
    } else {
      //Eliminamos el disabled y opacidad del boton
      btnEnviar.disabled = false;
      btnEnviar.classList.remove("opacity-50");
    }
    console.log(result);

    return result;
  }

  function resetearFormulario() {
    datosEnviar.email = "";
    datosEnviar.password = "";
  }
  // EVENTO QUE SE DISPARA CADA QUE SE ESCRIBE DENRTO
  //   inputEmail.addEventListener("input", function (e) {
  //     console.log("Escribiendo...", e.target.value);
  //   });
});
