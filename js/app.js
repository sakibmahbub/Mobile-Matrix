const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerText = "";
  //   Display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // Display no phones found
  const noPhoneFound = document.getElementById("no-phone-msg");
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }

  //   Display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <btton onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"   data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Read More</btton>
     </div>
    </div>

    `;
    phonesContainer.appendChild(phoneDiv);

    // Stop loader
    toggleLoader(false);
  });
};

// Process Search
const processSearch = (dataLimit) => {
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// Handle search button click
const searchPhones = () => {
  processSearch(10);
};

// Search handler on enter key
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

// Preloader
const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// Show all phones
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// Load phone details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
//Display phone details
const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalTitle");
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById("phone-details-body");
  modalBody.innerHTML = `
  <p>Release Date : ${
    phone.releaseDate ? phone.releaseDate : "No release date found"
  }</p>
  <p>Processor : ${
    phone.mainFeatures ? phone.mainFeatures.chipSet : "No info found"
  }</p>
  <p>Display : ${
    phone.mainFeatures ? phone.mainFeatures.displaySize : "No info found"
  }</p>
  <p>Storage : ${
    phone.mainFeatures ? phone.mainFeatures.storage : "No info found"
  }</p>
  `;
};

loadPhones("apple");
