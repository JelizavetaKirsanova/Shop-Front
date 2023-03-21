window.addEventListener("load", async () => {
    if(await AuthCheck()){
        document.getElementById("buttons").style.display = "none"
        fetch("http://localhost:3000/goods", {
            method: "POST",
            body: JSON.stringify({ token: document.cookie }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.status == "ok") {
                    let divApi = document.getElementById("root");
                    let container = document.createElement("div");
                    console.log(res.body);
                    for (let good of res.goods) {
                        container.innerHTML += `<div>
                            <h2>${good.name}</h2>
                            <p>${good.description}</p>
                            <b>${good.price}</b>
                            </div>`;
                    }
                    divApi.append(container);
                } else {
                    console.log(res)
                    alert("Please login or register");
                }
            });
    }
    
});
