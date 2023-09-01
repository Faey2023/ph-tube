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
    <button
          class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-colGrey text-btnGrey text-xl font-medium"
        >
          <a class="tab" onclick="loadVideos('${tab.category_id}')">${tab.category}</a>
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
  console.log(videos);
  const mainContent = document.getElementById("main-content");
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
  });
};
loadData();
loadVideos("1003");
// main content starts here
