
window.addEventListener("load", async () => {
  if (await AuthCheck()) {
    document.getElementById("buttons").style.display = "none";
    loadCategories().then(catList => 
        catList.forEach(cat => loadGoodsByCat(cat))
    )
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
            console.log(res.body);
            for (let good of res.goods) {
              container.innerHTML += `<div>
                              <h3>${good.title}</h3>
                              <p>${good.description}</p>
                              <p>${good.price}</p>
                              </div>`;
            }
            
            category.append(container);
            divApi.append(category);
          } else {
            console.log(res);
            alert("Please login or register");
          }
        });
}

async function loadCategories(){
    return fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify({ token: document.cookie}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.status == "ok") {
            return res.categories.map(category => category.category)
          } else {
            console.log(res);
            alert("Please login or register");
          }
        });
}

