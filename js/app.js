let employess = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=us`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".modal-next");
const modalPrevious = document.querySelector(".modal-previous");

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name.first + ' ' + employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}">
                <div class="text-container">
                    <h2 class="name">${name}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
          `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}">
        <div class="text-container" id="modal-container" data-index="${index}">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
      `;
      overlay.classList.remove('hidden');
      modalContainer.innerHTML = modalHTML;
};

gridContainer.addEventListener('click', e => {
    if ( e.target !== gridContainer ) {
        // console.log('event listener')
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
});

modalNext.addEventListener('click', e => {
    let overlayContainer = document.getElementById('modal-container');
    let overlayIndex = overlayContainer.getAttribute('data-index');
    let newIndex = parseInt(overlayIndex) + 1
    if ( newIndex === 12) {
        displayModal(0);
    } else {
        displayModal(newIndex);
    }
});

modalPrevious.addEventListener('click', e => {
    let overlayContainer = document.getElementById('modal-container');
    let overlayIndex = overlayContainer.getAttribute('data-index');
    let newIndex = parseInt(overlayIndex) - 1
    if ( newIndex < 0) {
        displayModal(11);
    } else {
        displayModal(newIndex);
    }
});

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));