window.addEventListener("load", async () => {
  if (await AuthCheck()) {
    document.getElementById("buttons").style.display = "none";
    let root = document.getElementById("root");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let title = document.createElement("h2")
    title.innerText = "USERS"
    root.append(title)
    loadUsers();


  }
});

function loadUsers() {
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({ token: document.cookie }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.status == "ok") {
        let divApi = document.getElementById("root");
        let users = document.createElement("div");
        let container = document.createElement("div");

        users.classList.add("users");

        container.classList.add("grid");
        console.log(res.user);
        for (let user of res.user) {
          console.log(user);
          container.innerHTML += `<div class="user">
                                  <h3>${user.name}</h3>
                                  <p>${user.email}</p>
                                  </div>`;
        }

        users.append(container);
        divApi.append(users);
      } else {
        console.log(res);
        alert("Please login or register");
      }
    });
}
