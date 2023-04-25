window.addEventListener("load", async () => {
    if (await AuthCheck()) {
        document.getElementById("buttons").style.display = "none";
        let root = document.getElementById("root");
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id")
        let good  = await loadGood(id)
        let title = document.createElement("h2").innerText 
        title = good.title
        let description = document.createElement("p")
        description.innerText = good.description
        let price = document.createElement("p")
        price.innerText = good.price
        for (let good of res.goods) {
          console.log(good)
        category.innerHTML = `<a href="/Category/index.html?id=${good.ID} ">
                        <h1>${good.category}</h1>
                        </a>`;
      }
      
        let user = document.createElement("a")
        user.innerText = "User: " + good.userId 
        root.append(title, description, price, category, user)

    }
});

async function loadGood(id){
    return fetch("http://localhost:3000/good", {
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
            console.log(res.good)
            return res.good
          } else {
            console.log(res);
            alert("Please login or register");
          }
        });
}
