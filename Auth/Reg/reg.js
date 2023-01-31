window.addEventListener("load", () => {
    const button = document.getElementById("reg");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const passwords = document.getElementsByClassName("password");
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
                    console.log(response)
                    if (response.ok) {
                        alert("done");
                    }else{
                        alert('error')
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            alert("Check your data again");
        }
    });
});
