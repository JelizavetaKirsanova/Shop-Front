let file = null;
window.addEventListener("load", async () => {
    if (await AuthCheck()) {
        document.getElementById("buttons").style.display = "none";

        loadCategories().then((catList) => {
            let select = `<select id="select">`;
            catList.forEach(
                (cat) => (select += `<option value="${cat}">${cat}</option>`)
            );
            select += `</select>`;
            document.getElementById("root").innerHTML += select;
            let button = document.createElement("button");
            button.addEventListener("click", async () => {
                const title = document.getElementById("title");
                const description = document.getElementById("description");
                const price = document.getElementById("price");
                const select = document.getElementById("select");

                await addGood(
                    title.value,
                    description.value,
                    price.value,
                    select.options[select.selectedIndex].text
                );
            });
            button.innerText = "Submit";
            document.getElementById("root").append(button);
        });
    }
});

function sendImg(id) {
    const data = new FormData();

    data.append("category", "Good");
    data.append("id", id);
    file = document.getElementById("file").files;
    console.log(file);
    if (file) {
        for (let x = 0; x < file.length; x++) {
            data.append("file", file[x]);
        }
    }

    console.log(data);

    axios.post("http://localhost:3000/upload", data);
}

async function addGood(title, description, price, category) {
    console.log(title, category);
    return fetch("http://localhost:3000/addGood", {
        method: "POST",
        body: JSON.stringify({
            token: document.cookie,
            title,
            description,
            price,
            category,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            if (res.status == "ok") {
                alert("Good added");
                sendImg(res.id);
            } else {
                console.log(res);
                alert("Please login or register");
            }
        });
}
