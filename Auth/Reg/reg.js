
window.addEventListener("load", () => {
  const button = document.getElementById("reg");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const passwords = document.getElementsByClassName("password");

  if (AuthCheck()) {
    console.log(document.cookie);
    const form = document.getElementById("form");
    const linkBack = document.getElementById("linkBack");
    form.style.display = "none";
    linkBack.style.display = "block";
  } else {
    button.addEventListener("click", () => {
      if (
        name.value &&
        email.value &&
        passwords[0].value &&
        passwords[0].value == passwords[1].value
      ) {
        const user = {
          name: name.value,
          email: email.value,
          password: passwords[0].value,
        };

        fetch("http://localhost:3000/reg", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(
          (response) => {
            console.log(response);
            if (response.ok) {
              alert("done");
              response.json().then((data) => {
                console.log(data.token)
                SaveToken(data.token)
              });
            } else {
              alert("error");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        let str = ''

        if(!name.value){
            name.style.borderColor = "red"
            str += 'name, '
        }else{
            name.style.borderColor = "rgb(118, 118, 118)"
        }

        if(!email.value){
            email.style.borderColor = "red"
            str += 'email, '
        }else{
            email.style.borderColor  = "rgb(118, 118, 118)"
        }


        if(!passwords[0].value){
            passwords[0].style.borderColor = "red"
            str += 'first password field, '
        }else{
            passwords[0].style.borderColor = "rgb(118, 118, 118)"
        }


        if(!passwords[1].value){
            passwords[1].style.borderColor = "red"
            str += 'second password field, '
        }else{
            passwords[1].style.borderColor  = "rgb(118, 118, 118)"
        }


        if(passwords[0].value != passwords[1].value){
            passwords[0].style.borderColor = "red"
            passwords[1].style.borderColor = "red"
            str += 'password are equal, '
        }else if (passwords[0].value && passwords[1].value){
            passwords[0].style.borderColor = "rgb(118, 118, 118)"
            passwords[1].style.borderColor = "rgb(118, 118, 118)"   
        }


        alert(`Check your ${str}`);

      }
    });
  }
});
