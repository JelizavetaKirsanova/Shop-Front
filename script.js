window.addEventListener("load", () => {
    fetch("http://localhost:3000/")
        .then(
            (response) => {
                return response.json();
            },
            (error) => {
                console.log(error);
            }
        )
        .then((data) => {
            let divApi = document.getElementById("root");

            let p = document.createElement("p");

            fetch("http://localhost:3000/goods", {
                method: "POST",
                body: JSON.stringify({token : document.cookie}),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((res) => {
                let container = document.createElement("div");
                console.log(res.body)
                for (let good of res.goods) {
                    container.innerHTML += `<div>
                    <h2>${good.name}</h2>
                    <p>${good.description}</p>
                    <b>${good.price}</b>
                    </div>`;
                }
                divApi.append(container);
            });

            p.innerText = data.message;
            divApi.append(p);
        });
});
