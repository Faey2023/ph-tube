const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  // console.log(categories);
  const tabContainer = document.getElementById("tab-container");
  categories.forEach((tab) => {
    // console.log(tab);
    const tabDiv = document.createElement("div");
    tabDiv.innerHTML = `
    <button onclick=changeColor() id="tab-btn"
          class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-colGrey text-btnGrey text-xl font-medium"
        >
          <a class="tab text-center" onclick="loadVideos('${tab.category_id}')">${tab.category}</a>
    `;
    tabContainer.appendChild(tabDiv);
  });
};
const loadVideos = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const videos = data.data;
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  videos?.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
    <div>
  <img class="w-[312px] h-[200px] mb-5" src="${video?.thumbnail}" alt="" />
</div>
<div class="flex justify-items-start gap-3">
  <img class="rounded-full max-w-[40px] max-h-[40px]" src="${video?.authors[0].profile_picture}" alt="" />
  <div>
    <h1 class="text-black text-[16px] font-bold">${video?.title}</h1>
    <p class="inline-block text-darkGrey text-[14px] font-normal">${video?.authors[0].profile_name}</p>
    
    <p class="text-darkGrey text-[14px] font-normal">${video?.others?.views}</p>
  </div>
</div>`;
    mainContent.appendChild(videoDiv);
    // error content
    console.log(data?.status);
    const errContent = document.getElementById("err-content");
    if (data?.status !== "true") {
      errContent.innerHTML = `
  <img src="images/Icon.png" alt="" />
  <h3 class="text-4xl font-bold text-black">
    Oops!! Sorry, There is no content here.
  </h3>`;
    } else {
      errContent.innerHTML = "";
    }
  });
};
const changeColor = () => {
  //button color change
  document.getElementById("tab-btn").style.backgroundColor = "#FF1F3D";
  document.getElementById("tab-btn").style.color = "#FFF";
};

loadData();
loadVideos("1001");

// main content starts here
