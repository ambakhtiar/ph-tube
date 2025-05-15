//Create Load catagories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//Create Load Videos
const loadVideos = () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

//Create display catagories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoriesContainer.append(button);
    // console.log(item)
  });
};

const cardDemo = {
  "category_id": "1001",
  "video_id": "aaaa",
  "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
  "title": "Shape of You",
  "authors": [
    {
      "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
      "profile_name": "Olivia Mitchell",
      "verified": ""
    }
  ],
  "others": {
    "views": "100K",
    "posted_date": "16278"
  },
  "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
          <figure class="h-[200px] relative">
            <img class="w-full h-full object-cover"
            src= ${video.thumbnail}
            alt="Shoes" />
            <span class="absolute right-2 bottom-2 bg-black text-white">${video.others.posted_date}</span>
          </figure>
          <div class="flex gap-2 px-0 py-2">
            <div>
              <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
            </div>
            <div>
              <h2 class="font-bold">${video.title}</h2>
              <div class="flex gap-2 items-center">
                <h2 class="text-grey-400">${video.authors[0].profile_name}</h2>
                ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
              </div>
              <p></p>
              <p></p>
            </div>
          </div>
        `;
    videosContainer.append(card);
  });
};

loadCategories();
loadVideos();
