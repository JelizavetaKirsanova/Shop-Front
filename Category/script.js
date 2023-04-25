window.addEventListener("load", async () => {
  if (await AuthCheck()) {
      document.getElementById("buttons").style.display = "none";
      let root = document.getElementById("root");
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      let cat  = document.getElementsByTagName(h1);
      
    

  }
});

function loadGoodsByCat(cat){
  fetch("http://localhost:3000/goods", {
      method: "POST",
      body: JSON.stringify({ token: document.cookie, category: cat}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.status == "ok") {
          let divApi = document.getElementById("root");
          let category = document.createElement("div")
          let container = document.createElement("div");

          category.classList.add("category")

          category.innerHTML += `<h2>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>`;

          container.classList.add("grid");
          for (let good of res.goods) {
              console.log(good)
            container.innerHTML += `<a href="/Good/index.html?id=${good.ID} ">
                            <h3>${good.title}</h3>
                            <p>${good.description}</p>
                            <p>${good.price}</p>
                            </a>`;
          }
          
          category.append(container);
          divApi.append(category);
        } else {
          console.log(res);
          alert("Please login or register");
        }
      });
}   

