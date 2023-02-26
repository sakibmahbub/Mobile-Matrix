const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerText = "";
  //   Display 20 phones only
  phones = phones.slice(0, 10);
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
     </div>
    </div>

    `;
    phonesContainer.appendChild(phoneDiv);

    // Stop loader
    toggleLoader(false);
  });
};

const searchPhones = () => {
  // Start loader
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
  searchField.value = "";
};

const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
