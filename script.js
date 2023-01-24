

window.addEventListener("load",( ) => {
    fetch("http://localhost:3000/").then(
        (response) => {
            return response.json()
        },
        (error) => {
            console.log(error)
        }
    ).then(
            (data) => {
                let divApi = document.getElementById("root")
                
                
                    let p = document.createElement("p")
                    
                    p.innerText = data.message
                    divApi.append(p) 
                
            }
        )
    })
