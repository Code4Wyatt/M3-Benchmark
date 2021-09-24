window.onload = () => {
    getMovies();
}


const getMovies = async () => {
    //movie categories
    const container = document.querySelector('.genres');
    try { 
        const rawData = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(yourBody) ONLY IF NEEDED
        });
        //these are actual movies 
        if (rawData.ok) {
            const categories = await rawData.json();
            console.log(categories);
            const movies = await Promise.all(
                categories.map(async (category) => {
                    const res = await fetch(
                        "https://striveschool-api.herokuapp.com/api/movies/" + category, {
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                        },
                    }
                    );
                    return await res.json();
                })
            );
            console.log(movies);
            movies.forEach(arr => {
                console.log(arr);
                const chunks = []
                let k = 0
                while (k < arr.length) {
                    chunks.push(arr.slice(k, (k += 6)));
                }
                console.log("chunks:", chunks);
             
                 
                const gallery = `<div class="movie-gallery m-2">
            <h4 class="text-light mt-2 mb-2">${arr[0].category}</h4>
            <div id="${arr[0].category}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                ${chunks.map((chunk, i) => `<div class="carousel-item ${i === 1 ? "active" : ""}">
                        <div class="movie-row">
                            <div class="row">
                            ${chunk.map((movie) => `<div class="col-sm-4 col-lg-1 movie-cards">
                                    <img class="movie-cover" src="${movie.imageUrl}">
                                    <a class="info" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill info" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg></a>
                                    <a id="edit" class="btn btn-warning" href="backoffice.html?id=${movie._id}">Edit</a>
                                </div>`)
                            .join("")}
                               

                            </div>
                        </div>
                    </div>`)
                        .join("")}

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${arr[0].category}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#trending-now" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </div>`;
                container.innerHTML += gallery;
            });
        }
       
    } catch (error) {
        console.error(error)
    }
}