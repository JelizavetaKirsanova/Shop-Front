
window.addEventListener("load", async () => {
    if (await AuthCheck()) {
      document.getElementById("buttons").style.display = "none";
      loadCategories().then(catList => {
          let select = `<select id="select">`
          catList.forEach(cat => select += `<option value="${cat}">${cat}</option>`)
          select += `</select>`
          document.getElementById("root").innerHTML += select
          let button = document.createElement("button")
          button.addEventListener("click", () => {
            const title = document.getElementById("title")
            const description = document.getElementById("description")
            const price = document.getElementById("price")
            const select = document.getElementById("select")
            console.log(title.value)
            console.log(description.value)
            console.log(price.value)
            console.log(select.value)
          })
          button.innerText = "Submit"
          document.getElementById("root").append(button)
        }
      )
    }
  });
  
  
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
  
  