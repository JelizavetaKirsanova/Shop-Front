async function AuthCheck() {
    return await fetch("http://localhost:3000/checkToken", {
        method: "POST",
        body: JSON.stringify({ token: document.cookie }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res.status)
            if (res.status == "ok") return true;
            return false;
        });
}
