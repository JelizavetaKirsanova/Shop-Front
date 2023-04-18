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
