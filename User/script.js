window.addEventListener("load", async () => {
    if (await AuthCheck()) {
        document.getElementById("buttons").style.display = "none";
        let root = document.getElementById("root");
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id")
        let user  = await loadUser(id)
        let name = document.createElement("h2").innerText 
        name = user.name
        let email = document.createElement("p")
        email.innerText = user.email
        root.append(name, email)

    }
});

async function loadUser(id){
    return fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({ token: document.cookie, id : id}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {    
          console.log(res);
          if (res.status == "ok") {
            console.log(res.user)
            return res.user
          } else {
            console.log(res);
            alert("Please login or register");
          }
        });
}
