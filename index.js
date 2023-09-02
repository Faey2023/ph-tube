const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  console.log(categories);
  const tabContainer = document.getElementById("tab-container");
  categories.forEach((tab) => {
    // console.log(tab);
    const tabDiv = document.createElement("div");
    tabDiv.innerHTML = `
    <button
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
  if (videos?.length != 0) {
    const errDiv = document.getElementById("err-content");
    errDiv.classList.add("hidden");
  } else {
    const errDiv = document.getElementById("err-content");
    errDiv.classList.remove("hidden");
  }
  videos?.forEach((video) => {
    let second = video?.others?.posted_date;
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60);
    let ultimateMinute = minute - hour * 60;
    // console.log(hour, ultimateMinute);
    const time = ` ${hour}hours ${ultimateMinute}minutes ago.`;
    console.log(time);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
    <div class="relative flex flex-col">
  <img class="w-[312px] h-[200px] mb-5" src="${video?.thumbnail}" alt="" />
  <p class="bg-black text-white text-[10px] font-normal max-w-full absolute mt-40 ml-52">${time}</p>
</div>
<div class="flex justify-items-start gap-3">
  <img class="rounded-full max-w-[40px] max-h-[40px]" src="${
    video?.authors[0].profile_picture
  }" alt="" />
  <div>
    <h1 class="text-black text-[16px] font-bold">${video?.title}</h1>
    <div class="flex gap-2">
    <p class=" text-darkGrey text-[14px] font-normal">${
      video?.authors[0].profile_name
    }</p>
    <img class="max-w-[20px]" src="${
      video?.authors[0].verified
        ? "https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
        : ""
    } "/>
    </div>
    <p class="text-darkGrey text-[14px] font-normal">${video?.others?.views}</p>
  </div>
</div>`;
    mainContent.appendChild(videoDiv);
  });
};
loadData();
loadVideos("1001");

// main content starts here
