function getTimeString(time) {
    time = parseInt(time);
    let hour = parseInt(time / 3600);
    time -= (hour * 3600);
    let min = parseInt(time / 60);
    return `${hour}h ${min}m ${time - min * 60}s`;
}


//Create Load catagories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((response) => response.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

//Create Load Videos
const loadVideos = (searchText = "") => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));
};

const removeactiveBtn = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (btn of buttons) {
        btn.classList.remove("active");
    }
}
const loadCategoryVideos = (id) => {
    // alert(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            removeactiveBtn();
            const activeBtn = document.getElementById(`btn-${id}`);
            //console.log(id);
            activeBtn.classList.add("active");
            displayVideos(data.category);
        })
        .catch((error) => console.log(error));
}

//Create display catagories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id
            })" class="btn category-btn">${item.category}</button>
    `;
        categoriesContainer.append(buttonContainer);
        // console.log(item)
    });
};

const loadVideoDetails = async (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayVideoDetails(data.video);
}

const displayVideoDetails = (id) => {
    console.log(id);
    const detailContainer = document.getElementById("modelContent");
    detailContainer.classList = "space-y-4";
    detailContainer.innerHTML = `
    <img src=${id.thumbnail} />
    <p>${id.description}</p>
    `;
    // way 1 
    // document.getElementById('showModelData').click();
    // way 2
    document.getElementById('customModal').showModal();
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos");
    videosContainer.innerHTML = "";

    if (videos.length === 0) {
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-5 min-h-screen">
            <img src="./Assets/Icon.png" />
            <h2 class="text-xl font-bold">No Content Here</h2>
        <div>
    `;
        return;
    } else {
        videosContainer.classList.add("grid");
    }
    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact my-2";
        card.innerHTML = `
          <figure class="h-[200px] relative">
            <img class="w-full h-full object-cover" src=${video.thumbnail} alt="Shoes" />
            ${video.others.posted_date?.length === 0 ? "" : `<span
                class="absolute right-2 bottom-2 bg-black text-white">${getTimeString(video.others.posted_date)}</span>`}

        </figure>
        <div class="flex gap-2 px-0 py-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex gap-2 items-center">
                    <h2 class="text-grey-400">${video.authors[0].profile_name}</h2>
                    ${video.authors[0].verified === true ? `<img class="w-5 h-5"
                        src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ""}
                </div>
                
            </div>
        </div>
        <p><button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-sm btn-error ml-2">Details</button></p>
        `;
        videosContainer.append(card);
    });
};

document.getElementById("searchInput").addEventListener("keyup", (event) => {
    // console.log(event.target.value);
    loadVideos(event.target.value);
})
loadCategories();
loadVideos();