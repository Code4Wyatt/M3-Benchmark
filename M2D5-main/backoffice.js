window.onload = async () => {
    

    displayEntries();

    if (id) {
        document.querySelector('h3').innerHTML = "Edit Movie/Show";
        getMovieDetails(id);
    }

}

const params = new URLSearchParams(location.search)
const id = params.get('id')
const url = "https://striveschool-api.herokuapp.com/api/movies/"
const headers = new Headers({
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
    "Content-Type": "application/json",
});

async function getMovieDetails(id) {
    const response = await fetch(url + id, {
        headers
    })
    
    const movie = await response.json()
    console.log(response)
    console.log(movie)
}

async function deleteMovie() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/movies/" + id, {
        method: 'DELETE',
        headers
    })
    const movie = await response.json()
    if (!response.ok) throw new Errow("Failed to delete movie/show.")

    alert('Deleted succesfully!')
    } catch (error) {
        alert(error.message)
    }
}

const handleSubmit = async (event) => {
    event.preventDefault()

    const url = "https://striveschool-api.herokuapp.com/api/movies/"

    

    const newMovie = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("imageUrl").value,
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "username": "testusername",
                "password":"pass"
            }
        })
        
    } catch (err) {
        console.log(err);
    }

}

const displayEntries = async () => {
    const container = document.querySelector('.entriesGallery');

    try {
        const entryData = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(yourBody) ONLY IF NEEDED
        });
        //now get data
        if (entryData.ok) {
            const categories = await entryData.json();
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
                const chunks = [];
                let k = 0
                while (k < arr.length) {
                    chunks.push(arr.slice(k, (k += 6)));
        }
                console.log(chunks);
                const gallery = `<div class="edit-section">
                <div class="movie-gallery m-2 entry-div">
            <h4 class="text-light mt-2 mb-2 category">${arr[0].category}</h4>
            <div id="${arr[0].category}" class="">
                <div class="">
                ${chunks.map((chunk, i) => `<div class="">
                        <div class="movie-row">
                            <div class="row">
                            ${chunk.map((movie) => `<div class="col-sm-4 col-lg-1 movie-cards">
                                    <div style="color: white;">${movie.name}</div>
                                    <a><button class="btn btn-outline-secondary" onclick="deleteEntry()">Edit</button></a>
                                    <button id="${movie.id}" class="btn btn-outline-danger" onclick="deleteMovie(id)">Delete</button>
                                </div>`)
                            .join("")}
                               

                            </div>
                        </div>
                    </div>
                    </div>`)
                        .join("")}

                </div>
               
            </div>

        </div>`;
                container.innerHTML += gallery;
            })
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteEntry = async (id) => {
    try {
        const delData = await fetch('https://striveschool-api.herokuapp.com/api/movies/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "Content-Type": "application/json",
            }
                
        });
        //     const data = await delData.json();
        // console.log(data);
    } catch(error) {
        console.log(error)
    }
}