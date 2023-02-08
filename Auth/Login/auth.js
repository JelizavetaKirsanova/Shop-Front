window.addEventListener("load", () => {
    const button = document.getElementById("login");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    button.addEventListener("click", () => {
        if (email.value && password.value) {
            const user = {
                email: email.value,
                password: password.value,
            };

            fetch("http://localhost:3000/log", {
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
                    } else {
                        alert("error");
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
