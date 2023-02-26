const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerText = "";
  //   display 20 phones only
  phones = phones.slice(0, 10);

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
  });
};

const searchPhones = () => {
  const searchText = document.getElementById("search-field").value;
  loadPhones(searchText);
};

loadPhones("iphone");
