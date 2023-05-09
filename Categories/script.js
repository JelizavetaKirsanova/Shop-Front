
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
            let categories = document.createElement("div")

            categories.classList.add("categories")

            categories.innerHTML += `<a href="/Category/index.html?category=${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</a>`;
            
           
            divApi.append(categories);
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
