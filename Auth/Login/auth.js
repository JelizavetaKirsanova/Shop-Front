window.addEventListener("load", () => {
    const button = document.getElementById("login");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (document.cookie.includes("email")) {
        console.log(document.cookie);
        const form = document.getElementById("form");
        const linkBack = document.getElementById("linkBack");
        form.style.display = "none"
        linkBack.style.display = "block"
    } else {
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
                            response.json().then((data) => {
                                document.cookie = `email=${data.user.email}`;
                            });
                        } else {
                            alert(response.statusText);
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
    }
});
