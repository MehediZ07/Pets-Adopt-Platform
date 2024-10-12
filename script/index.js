// Load button function

function loadButton() {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((json) => displayCategoryBtn(json));
}

// Display button function
const displayCategoryBtn = (data) => {
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  data.categories.forEach((btn) => {
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = `
                          <button id="${btn.id}" onclick="loadCategory(${btn.id},'${btn.category}')"
                                class="flex w-full border solid border-gray-300 rounded-xl text-2xl items-center text-center font-bold gap-4 justify-center py-4 md:py-8 btn-common-class">
                                <img src="${btn.category_icon}" alt=""><span>${btn.category}</span>
                        </button>
  `;
    categoryBtnContainer.append(categoryBtn);
  });
};

// load category
function loadCategory(id, category) {
  const categoryBtn = document.getElementById(id);
  const allBtn = document.querySelectorAll(".btn-common-class");

  for (let btn of allBtn) {
    btn.classList.remove(
      "bg-[#0E7A811A]",
      "border-2",
      "border-[#0e7981]",
      "rounded-full"
    );
    btn.classList.add("border", "border-gray-300", "rounded-xl");
  }
  categoryBtn.classList.remove("border", "border-gray-300", "rounded-xl");
  categoryBtn.classList.add(
    "bg-[#0E7A811A]",
    "border-2",
    "border-[#0e7981]",
    "rounded-full"
  );

  sortBtnDiv = document.getElementById("sort-btn-container");
  sortBtnDiv.innerHTML = "";
  sortBtnDiv.innerHTML = `
               <div class="flex justify-between mb-4">
                                <h1 class="text-2xl font-bold text-black">Best Deal for you</h1>
                                <div class="dropdown ">
                                      <div tabindex="0" role="button" class="btn m-1 py-2 px-6 hover:bg-[#0E7A81] bg-[#0E7A81] text-xl text-white font-medium rounded-lg">Sort By Price</div>
                                      <ul tabindex="0" class="dropdown-content menu bg-transparent space-y-2 rounded-box z-[1] w-44 p-2 shadow">
                                        <li><a onclick="loadCategoryPatsSort('${category}', 1)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81] text-lg text-white font-medium rounded-lg">Price: Low-High</a></li>
                                          <li><a onclick="loadCategoryPatsSort('${category}', 2)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81]  text-lg text-white font-medium rounded-lg">Price: High-Low</a></li>
                                       </ul>
                                  </div>
                             </div>
                        </div>
  `;

  // <button onclick="loadCategoryPatsSort('${category}')" class="py-2 px-6 bg-[#0E7A81] text-xl text-white font-medium rounded-lg">Sort
  //                                       by Price</button></a>

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((response) => response.json())
    .then((json) => displayCategoryPets(json));
}

// display category
const displayCategoryPets = (pets) => {
  const petParentDiv = document.getElementById("pets-parent-div");
  const petContainer = document.getElementById("Pet-container");
  petContainer.innerHTML = `<div id='loadingDiv' class="col-span-3 w-full flex justify-center items-center">
                                <span class="loading loading-bars loading-lg"></span>
                        </div>`;

  // Condition for if category product are not available
  const SortBtn = petParentDiv.querySelector(":scope > div");
  const length = Object.keys(pets.data).length;
  if (length === 0) {
    document.getElementById("loadingDiv").classList.add("hidden");
    const petDiv = document.createElement("div");
    petContainer.classList.add("bg-gray-200", "rounded-2xl", "w-full", "mt-10");
    petDiv.classList.add(
      "col-span-3",
      "max-h-[520px]",
      "sm:w-96",
      "lg:w-[600px]",
      "xl:w-[800px]",
      "2xl:w-[1000px]",
      "flex",
      "flex-col",
      "items-center",
      "mx-auto",
      "p-4",
      "space-y-6",
      "text-center"
    );

    petDiv.innerHTML = `
                                <img class= "w-52 md:w-72" src="./images/error.webp" alt="">
                                <h1 class="text-xl md:text-3xl lg:text-5xl text-center font-bold w-full">No Information Available</h1>
                                <p class="text-s md:text-base">Please select other category, i wish you found the best Pets</p>
                     
            `;
    petContainer.appendChild(petDiv);
    return;
  }

  SortBtn.classList.remove("hidden");
  // Loading function call after two second
  setTimeout(loading, 2000);
  petContainer.classList.remove("bg-gray-200", "mt-10");
  let cardId = 0;
  pets.data.forEach((pet) => {
    const petDiv = document.createElement("div");
    cardId++;
    petDiv.id = `card-${cardId}`;
    petDiv.classList.add("hidden");

    petDiv.innerHTML = `

<div class="card bg-base-100 max-w-96 border-2 solid border-[#1313131A]">
  <figure class="px-8 pt-8 h-60">
    <img class="rounded-2xl h-full object-cover"
      src="${pet.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
 <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
 
    </h2>
    <p><i class="fa-solid fa-border-none pr-2"></i> Breed: &nbsp; ${
      pet.breed ? `${pet.breed}` : "N/A"
    }</p>
    <p><i class="fa-regular fa-calendar pr-2"></i> Birth day: &nbsp;${
      pet.date_of_birth ? `${pet.date_of_birth}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-mercury pr-2"></i> Gender: &nbsp;${
      pet.gender ? `${pet.gender}` : "N/A"
    }</p>
    <p class="pb-2"><i class="fa-solid fa-dollar-sign pr-2"></i> Price: &nbsp;${
      pet.price ? `${pet.price}` : "N/A"
    }</p>
      <hr>
    <div class="card-actions justify-between pt-2">
<button id="like-${pet.petId}" onclick="addLikedList(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-3 py-2 border-2 solid border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up"></i></button>

<button id="disLike-${pet.petId}" onclick="removeLikedList(${
      pet.petId
    })" class="text-base hidden font-semibold px-3 py-2 border-2 solid bg-[#0e79813f] border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up text-[#0E7A81]"></i></button>
<button id="btn-${pet.petId}" onclick="adoptPet(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Adopt</button>
<button onclick="loadDetails(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Details</button>

    </div>
  </div>
</div>
        `;
    petContainer.appendChild(petDiv);
  });
};

// Load home page function
const loadAllPats = () => {
  const allBtn = document.querySelectorAll(".btn-common-class");

  for (let btn of allBtn) {
    btn.classList.remove(
      "bg-[#0E7A811A]",
      "border-2",
      "border-[#0e7981]",
      "rounded-full"
    );
    btn.classList.add("border", "border-gray-300", "rounded-xl");
  }
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((response) => response.json())
    .then((json) => displayPets(json));
};

// Display home page function
const displayPets = (pets) => {
  const petParentDiv = document.getElementById("pets-parent-div");
  petParentDiv.innerHTML = `
                         <div id="sort-btn-container" class="">
                          <div class="flex justify-between mb-4">
                                <h1 class="text-2xl font-bold text-black">Best Deal for you</h1>
                                <div class="dropdown ">
                                      <div tabindex="0" role="button" class="btn m-1 py-2 px-6 hover:bg-[#0E7A81] bg-[#0E7A81] text-xl text-white font-medium rounded-lg">Sort By Price</div>
                                      <ul tabindex="0" class="dropdown-content menu bg-transparent space-y-2 rounded-box z-[1] w-44 p-2 shadow">
                                        <li><a onclick="loadAllPetsSort(1)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81] text-lg text-white font-medium rounded-lg">Price: Low-High</a></li>
                                          <li><a onclick="loadAllPetsSort(2)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81]  text-lg text-white font-medium rounded-lg">Price: High-Low</a></li>
                                       </ul>
                                  </div>
                       
                        </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-8 xl:grid-cols-4 ">
                                          <div 
                                        class="col-span-1 md:col-span-5 xl:col-span-3 lg:col-span-5 mx-auto">
                                        <div id="Pet-container" class= "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10">
                                        
                                        </div>
                                </div>
                                <div  class=" text-center mt-10 py-8 bg-white md:ml-6 rounded-2xl col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-1">

                                   <div id="liked-photos" class="border-2 solid border-[#1313131A] rounded-2xl -mt-8 px-2 pb-2 mx-auto max-w-96">
                                   
                                   
                                        <h1 class="mt-8 col-span-2 text-2xl font-bold  text-[#0E7A81] mb-8">Your Liked Pets!</h1>
                                        <p id="error-massage" class="col-span-2 text-[#131313B3] py-16 flex flex-col justify-center items-center gap-6"> <img
                                        class="max-w-24" src="../images/error.webp" alt="">Currently you don't like any pets.</p>
                                   
                                   
                                   </div>
                                </div>
                        </div>
                
  `;

  const petContainer = document.getElementById("Pet-container");

  petContainer.innerHTML = `<div id='loadingDiv' class="col-span-3 w-full flex justify-center items-center">
                                <span class="loading loading-bars loading-lg"></span>
                        </div>`;

  // Condition for if category product are not available

  const length = Object.keys(pets.pets).length;
  if (length == 0) {
    document.getElementById("sort-btn-div").innerHTML = "";
    document.getElementById("loadingDiv").classList.add("hidden");
    const petDiv = document.createElement("div");
    petContainer.classList.add("bg-gray-200", "rounded-2xl", "w-full");
    petDiv.classList.add(
      "col-span-3",
      "w-full",
      "flex",
      "flex-col",
      "items-center",
      "mx-auto",
      "space-y-6"
    );

    petDiv.innerHTML = `
                      <div class="max-h-[400px]">
                                <img class="w-72" src="./images/error.webp" alt="">
                                <h1 class="text-5xl text-center font-bold w-full">No Information Available</h1>
                                <p>Please select other category, i wish you found the best Pets</p>
                            </div>
            `;
    petContainer.appendChild(petDiv);
    return;
  }

  // Loading function call after two second
  setTimeout(loading, 2000);

  petContainer.classList.remove("bg-gray-200");
  let cardId = 0;
  pets.pets.forEach((pet) => {
    const petDiv = document.createElement("div");
    cardId++;
    petDiv.id = `card-${cardId}`;
    petDiv.classList.add("hidden");

    petDiv.innerHTML = `

<div class="card bg-base-100 max-w-96 border-2 solid border-[#1313131A]">
  <figure class="px-8 pt-8 h-60">
    <img class="rounded-2xl h-full object-cover"
      src="${pet.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
 <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
 
    </h2>
    <p><i class="fa-solid fa-border-none pr-2"></i> Breed: &nbsp; ${
      pet.breed ? `${pet.breed}` : "N/A"
    }</p>
    <p><i class="fa-regular fa-calendar pr-2"></i> Birth day: &nbsp;${
      pet.date_of_birth ? `${pet.date_of_birth}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-mercury pr-2"></i> Gender:&nbsp; ${
      pet.gender ? `${pet.gender}` : "N/A"
    }</p>
    <p class="pb-2"><i class="fa-solid fa-dollar-sign pr-2"></i> Price:&nbsp; ${
      pet.price ? `${pet.price}` : "N/A"
    }</p>
      <hr>
    <div class="card-actions flex justify-between pt-2">
<button id="like-${pet.petId}" onclick="addLikedList(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-3 py-2 border-2 solid border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up"></i></button>

<button id="disLike-${pet.petId}" onclick="removeLikedList(${
      pet.petId
    })" class="text-base hidden font-semibold px-3 py-2 border-2 solid bg-[#0e79813f] border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up text-[#0E7A81]"></i></button>

<button id="btn-${pet.petId}" onclick="adoptPet(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Adopt</button>
<button onclick="loadDetails(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Details</button>

    </div>
  </div>
</div>
        `;
    petContainer.appendChild(petDiv);
  });
};

// Load home page function if chick sort by price
const loadAllPetsSort = (order) => {
  const allBtn = document.querySelectorAll(".btn-common-class");

  for (let btn of allBtn) {
    btn.classList.remove(
      "bg-[#0E7A811A]",
      "border-2",
      "border-[#0e7981]",
      "rounded-full"
    );
    btn.classList.add("border", "border-gray-300", "rounded-xl");
  }
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((response) => response.json())
    .then((json) => displayPetsSort(json, order));
};

// display home page function if chick sort by price
const displayPetsSort = (pets, order) => {
  const petParentDiv = document.getElementById("pets-parent-div");

  const petContainer = document.getElementById("Pet-container");

  petContainer.innerHTML = `<div id='loadingDiv' class="col-span-3 w-full flex justify-center items-center">
                                <span class="loading loading-bars loading-lg"></span>
                        </div>`;

  // Condition for if category product are not available

  const length = Object.keys(pets.pets).length;
  if (length == 0) {
    document.getElementById("sort-btn-div").innerHTML = "";
    document.getElementById("loadingDiv").classList.add("hidden");
    const petDiv = document.createElement("div");
    petContainer.classList.add("bg-gray-200", "rounded-2xl", "w-full");
    petDiv.classList.add(
      "col-span-3",
      "w-full",
      "flex",
      "flex-col",
      "items-center",
      "mx-auto",
      "space-y-6"
    );

    petDiv.innerHTML = `
                      
                                <img class=" w-52 md:w-72" src="./images/error.webp" alt="">
                                <h1 class=" text-3xl md:text-5xl text-center font-bold max-w-80 md:w-full">No Information Available</h1>
                                <p text-xs md:text-base >Please select other category, i wish you found the best Pets</p>
                        
            `;
    petContainer.appendChild(petDiv);
    return;
  }

  // Loading function call after two second
  setTimeout(loading, 2000);
  let sortedPetsPrice;
  if (order === 1) {
    sortedPetsPrice = pets.pets.sort(
      (lowPrice, highPrice) => lowPrice.price - highPrice.price
    );
  } else {
    sortedPetsPrice = pets.pets.sort(
      (lowPrice, highPrice) => highPrice.price - lowPrice.price
    );
  }

  petContainer.classList.remove("bg-gray-200", "mt-10");
  let cardId = 0;
  sortedPetsPrice.forEach((pet) => {
    const petDiv = document.createElement("div");
    cardId++;
    petDiv.id = `card-${cardId}`;
    petDiv.classList.add("hidden");

    petDiv.innerHTML = `

<div class="card bg-base-100 max-w-96 border-2 solid border-[#1313131A]">
  <figure class="px-8 pt-8 h-60">
    <img class="rounded-2xl h-full object-cover"
      src="${pet.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
 <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
 
    </h2>
    <p><i class="fa-solid fa-border-none pr-2"></i> Breed:  &nbsp;${
      pet.breed ? `${pet.breed}` : "N/A"
    }</p>
    <p><i class="fa-regular fa-calendar pr-2"></i> Birth day: &nbsp;${
      pet.date_of_birth ? `${pet.date_of_birth}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-mercury pr-2"></i> Gender: &nbsp;${
      pet.gender ? `${pet.gender}` : "N/A"
    }</p>
    <p class="pb-2"><i class="fa-solid fa-dollar-sign pr-2"></i> Price: &nbsp;${
      pet.price ? `${pet.price}` : "N/A"
    }</p>
      <hr>
    <div class="card-actions justify-between pt-2">
<button id="like-${pet.petId}" onclick="addLikedList(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-3 py-2 border-2 solid border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up"></i></button>

<button id="disLike-${pet.petId}" onclick="removeLikedList(${
      pet.petId
    })" class="text-base hidden font-semibold px-3 py-2 border-2 solid bg-[#0e79813f] border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up text-[#0E7A81]"></i></button>
<button id="btn-${pet.petId}" onclick="adoptPet(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Adopt</button>
<button onclick="loadDetails(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Details</button>

    </div>
  </div>
</div>
        `;
    petContainer.appendChild(petDiv);
  });
};

// Load category function if chick sort by price
const loadCategoryPatsSort = (category, order) => {
  sortBtnDiv = document.getElementById("sort-btn-container");
  sortBtnDiv.innerHTML = "";
  sortBtnDiv.innerHTML = `
               <div class="flex justify-between mb-4">
                                <h1 class="text-2xl font-bold text-black">Best Deal for you</h1>
                                <div class="dropdown ">
                                      <div tabindex="0" role="button" class="btn m-1 py-2 px-6 hover:bg-[#0E7A81] bg-[#0E7A81] text-xl text-white font-medium rounded-lg">Sort By Price</div>
                                      <ul tabindex="0" class="dropdown-content menu bg-transparent space-y-2 rounded-box z-[1] w-44 p-2 shadow">
                                        <li><a onclick="loadCategoryPatsSort('${category}', 1)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81] text-lg text-white font-medium rounded-lg">Price: Low-High</a></li>
                                          <li><a onclick="loadCategoryPatsSort('${category}', 2)" class="py-2 px-3 bg-[#0e7981c2] hover:bg-[#0E7A81]  text-lg text-white font-medium rounded-lg">Price: High-Low</a></li>
                                       </ul>
                                  </div>
                             </div>
                        </div>
  `;
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((response) => response.json())
    .then((json) => displayCategorySort(json, order));
};

// display category function if chick sort by price
function displayCategorySort(pets, order) {
  const petParentDiv = document.getElementById("pets-parent-div");
  const petContainer = document.getElementById("Pet-container");
  petContainer.innerHTML = `<div id='loadingDiv' class="col-span-3 w-full flex justify-center items-center">
                                <span class="loading loading-bars loading-lg"></span>
                        </div>`;

  // Condition for if category product are not available
  const SortBtn = petParentDiv.querySelector(":scope > div");
  const length = Object.keys(pets.data).length;
  if (length === 0) {
    document.getElementById("loadingDiv").classList.add("hidden");
    const petDiv = document.createElement("div");
    petContainer.classList.add("bg-gray-200", "rounded-2xl", "w-full", "mt-10");
    petDiv.classList.add(
      "col-span-3",
      "max-h-[520px]",
      "sm:w-96",
      "lg:w-[600px]",
      "xl:w-[800px]",
      "2xl:w-[1000px]",
      "flex",
      "flex-col",
      "items-center",
      "mx-auto",
      "p-4",
      "space-y-6",
      "text-center"
    );

    petDiv.innerHTML = `
                                <img class= "w-52 md:w-72" src="./images/error.webp" alt="">
                                <h1 class="text-xl md:text-3xl lg:text-5xl text-center font-bold w-full">No Information Available</h1>
                                <p class="text-s md:text-base">Please select other category, i wish you found the best Pets</p>
                     
            `;
    petContainer.appendChild(petDiv);
    return;
  }

  SortBtn.classList.remove("hidden");
  // Loading function call after two second
  setTimeout(loading, 2000);
  petContainer.classList.remove("bg-gray-200", "mt-10");
  console.log(order);
  let sortedPetsPrice;
  if (order === 1) {
    sortedPetsPrice = pets.data.sort(
      (lowPrice, highPrice) => lowPrice.price - highPrice.price
    );
  } else {
    sortedPetsPrice = pets.data.sort(
      (lowPrice, highPrice) => highPrice.price - lowPrice.price
    );
  }

  let cardId = 0;
  sortedPetsPrice.forEach((pet) => {
    const petDiv = document.createElement("div");
    cardId++;
    petDiv.id = `card-${cardId}`;
    petDiv.classList.add("hidden");

    petDiv.innerHTML = `

<div class="card bg-base-100 max-w-96 border-2 solid border-[#1313131A]">
  <figure class="px-8 pt-8 h-60">
    <img class="rounded-2xl h-full object-cover"
      src="${pet.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
 <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
 
    </h2>
    <p><i class="fa-solid fa-border-none pr-2"></i> Breed: &nbsp; ${
      pet.breed ? `${pet.breed}` : "N/A"
    }</p>
    <p><i class="fa-regular fa-calendar pr-2"></i> Birth day: &nbsp;${
      pet.date_of_birth ? `${pet.date_of_birth}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-mercury pr-2"></i> Gender: &nbsp;${
      pet.gender ? `${pet.gender}` : "N/A"
    }</p>
    <p class="pb-2"><i class="fa-solid fa-dollar-sign pr-2"></i> Price: &nbsp;${
      pet.price ? `${pet.price}` : "N/A"
    }</p>
      <hr>
    <div class="card-actions justify-between pt-2">
<button id="like-${pet.petId}" onclick="addLikedList(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-semibold px-3 py-2 border-2 solid border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up"></i></button>

<button id="disLike-${pet.petId}" onclick="removeLikedList(${
      pet.petId
    })" class="text-base hidden font-semibold px-3 py-2 border-2 solid bg-[#0e79813f] border-[#0e79813f] rounded-xl"><i class="fa-regular fa-thumbs-up text-[#0E7A81]"></i></button>
<button id="btn-${pet.petId}" onclick="adoptPet(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Adopt</button>
<button onclick="loadDetails(${
      pet.petId
    })" class="text-base text-[#0E7A81] font-bold px-2 py-2 border-2 solid border-[#0e79813f] rounded-xl">Details</button>

    </div>
  </div>
</div>
        `;
    petContainer.appendChild(petDiv);
  });
}

// Two second loading  function
const loading = () => {
  const loadingDiv = document.getElementById("loadingDiv");
  loadingDiv.classList.add("hidden");
  const petContainer = document.getElementById("Pet-container");
  const childrenNumber = petContainer.children.length;
  for (i = 1; i <= childrenNumber; i++) {
    document.getElementById(`card-${i}`).classList.remove("hidden");
  }
};

// Add liked list photo function
function addLikedList(id) {
  const allSamePetPhoto = document.querySelectorAll(`.pet-${id}`);
  const likeBtn = document.getElementById(`like-${id}`);
  const disLikeBtn = document.getElementById(`disLike-${id}`);
  likeBtn.classList.remove("hidden");
  disLikeBtn.classList.add("hidden");
  allSamePetPhoto.forEach((element) => {
    element.remove();
  });

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((response) => response.json())
    .then((json) => addLikedListDisplay(json));
  errorMassage();
}
//  Display liked list photo
function addLikedListDisplay(data) {
  document.getElementById("error-massage").classList.add("hidden");
  const likedPhotosDiv = document.getElementById("liked-photos");
  likedPhotosDiv.classList.add(
    "grid",
    "grid-cols-2",
    "gap-2",
    "w-full",
    "h-auto"
  );
  const newElement = document.createElement("div");
  newElement.classList.add(
    "p-2",
    "rounded-xl",
    "border-2",
    "solid",
    "h-32",
    "border-[#1313131A]",
    `pet-${data.petData.petId}`
  );
  newElement.innerHTML = `
  <img id="" class="h-full w-full object-cover rounded-lg pet-${data.petData.petId}"  src="${data.petData.image}" alt="">
 `;
  likedPhotosDiv.append(newElement);

  const likeBtn = document.getElementById(`like-${data.petData.petId}`);
  const disLikeBtn = document.getElementById(`disLike-${data.petData.petId}`);
  likeBtn.classList.add("hidden");
  disLikeBtn.classList.remove("hidden");
  errorMassage();
}

// remove liked list photo
function removeLikedList(id) {
  errorMassage();
  const allSamePetPhoto = document.querySelectorAll(`.pet-${id}`);
  const likeBtn = document.getElementById(`like-${id}`);
  const disLikeBtn = document.getElementById(`disLike-${id}`);
  likeBtn.classList.remove("hidden");
  disLikeBtn.classList.add("hidden");

  allSamePetPhoto.forEach((element) => {
    element.remove();
  });
}

const errorMassage = () => {
  const children = document.getElementById("liked-photos").children.length;

  if (children > 1) {
    document.getElementById("error-massage").classList.add("hidden");
  } else {
    document.getElementById("error-massage").classList.remove("hidden");
  }
};

// Adopt confirmation function call
function adoptPet(id) {
  document.getElementById(`btn-${id}`).disabled = true;
  document.getElementById(`btn-${id}`).innerText = "Adopted";
  document.getElementById("adopt-popup").classList.remove("hidden");
  secondCountdown(2);
}
// Adopt confirmation popup massage display function
function secondCountdown(seconds) {
  let popupMassageDiv = document.getElementById("second");
  let interval = setInterval(function () {
    popupMassageDiv.innerText = seconds;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      popupMassageDiv.innerText = 3;
      document.getElementById("adopt-popup").classList.add("hidden");
    }
  }, 1000);
}

// load details by id
function loadDetails(id) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((response) => response.json())
    .then((json) => showDetails(json));
}

//Show details popup
function showDetails(id) {
  const popupMassage = document.getElementById("popup-massage");
  const details = document.getElementById("details");
  const NewElement = document.createElement("div");
  NewElement.id = "pet-details";
  NewElement.classList.add("space-y-6", "text-left");

  NewElement.innerHTML = `
                          
                        
                        <img class="mx-auto w-[100%] h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] m-2 rounded-xl object-cover" src="${
                          id.petData.image
                        }" alt="">
                       
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 gap-x-1 md:gap-2 text-xs md:text-base">
    <h2 class="text-xl  md:text-3xl  pb-1 font-bold sm:col-span-2">
      ${id.petData.pet_name}
 
    </h2>
    <p><i class="fa-solid fa-border-none pr-2"></i> Breed:  &nbsp;${
      id.petData.breed ? `${id.petData.breed}` : "N/A"
    }</p>
    <p><i class="fa-regular fa-calendar pr-2"></i> Birth day:&nbsp; ${
      id.petData.date_of_birth ? `${id.petData.date_of_birth}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-mercury pr-2"></i> Gender: ${
      id.petData.gender ? `${id.petData.gender}` : "N/A"
    }</p>
    <p><i class="fa-solid fa-dollar-sign pr-2"></i> Price: ${
      id.petData.price ? `${id.petData.price}` : "N/A"
    }</p>
    <p class="md:pb-2"><i class="fa-solid fa-syringe pr-1"></i> Vaccinated Status:&nbsp; ${
      id.petData.vaccinated_status ? `${id.petData.vaccinated_status}` : "N/A"
    }</p>
  </div>
                   
<div class="text-left space-y-1 sm:space-y-3">
 <h1 class="text-lg md:text-xl xl:text-2xl font-bold text-black">Details Information</h1>
<p class="text-xs md:text-base">${
    id.petData.pet_details ? `${id.petData.pet_details}` : "N/A"
  }</p>
</div>
                       
                
                
  `;
  details.prepend(NewElement);
  popupMassage.classList.remove("hidden");
}

//Close details popup function
document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("pet-details").innerHTML = "";
  document.getElementById("popup-massage").classList.add("hidden");
});

loadButton();
loadAllPats();
