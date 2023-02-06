window.addEventListener("load", () => {
    const button = document.getElementById("login");
    const email = document.getElementById("email");
    const password = document.getElementsByClassName("password");
    button.addEventListener("click", () => {
        if (
            email.value &&
            password.value
        ) {
            const user = {
                email: email.value,
                password: password.value,
            };
            
        }
    });
});
