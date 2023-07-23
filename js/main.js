const visitForm = document.forms.visitForm;
const doctor = visitForm.doctor;
const form = document.forms.login;


import { getToken } from "./authorization.js";
import { VisitCardiologist } from "./classes.js";
import { VisitDentist } from "./classes.js";
import { VisitTherapist } from "./classes.js";
import { Visit } from "./classes.js";

if (localStorage.getItem('token')) {
    viewAllCards();
} 

// get token
form.addEventListener('submit', (el) => {
    el.preventDefault(); 

    const loginBtn = document.querySelector('.header__btn-login');
    const createBtn = document.querySelector('.header__btn-create-visit');
    const noitems = document.querySelector('.main__items-text');
    const welcome = document.querySelector('.main__text-wrapper');
    const cardsWrapper = document.querySelector('.main__cards-wrapper');

    loginBtn.classList.add('d-none');
    createBtn.classList.remove('d-none');
    noitems.classList.remove('d-none');
    welcome.classList.add('d-none');
    cardsWrapper.classList.remove('d-none');

    async function login() {
        await getToken();
        await viewAllCards();
    }

    login();
   
})


// choose a doctor
doctor.addEventListener('change', () => {
    
    const cardiologist = document.querySelector('.cardiologist-options');
    const dentist = document.querySelector('.dentist-options');
    const therapist = document.querySelector('.therapist-options');
    const lastVisit = document.querySelector('#lastVisit');
    const age = document.querySelector('#age');
    const pressure = document.querySelector('#pressure');
    const bodyMassIndex = document.querySelector('#bodyMassIndex');
    const heart = document.querySelector('#heart');


    switch(doctor.value) {
        case 'cardiologist':  
            cardiologist.classList.remove('d-none');
            dentist.classList.add('d-none');
            therapist.classList.remove('d-none');
            lastVisit.removeAttribute('required'); 
            
            if (pressure.hasAttribute('required')||bodyMassIndex.hasAttribute('required')||heart.hasAttribute('required')||age.hasAttribute('required')) {        
                break;
            } else {
                pressure.setAttribute('required', 'required'); 
                bodyMassIndex.setAttribute('required', 'required'); 
                heart.setAttribute('required', 'required'); 
                age.setAttribute('required', 'required');
                break;
            }

        case 'dentist':
            dentist.classList.remove('d-none');
            cardiologist.classList.add('d-none');
            therapist.classList.add('d-none');
            age.removeAttribute('required');
            pressure.removeAttribute('required');
            bodyMassIndex.removeAttribute('required');
            heart.removeAttribute('required');

            if (lastVisit.hasAttribute('required')) {        
                break;
            } else {
                lastVisit.setAttribute('required', 'required');              
                break;
            }

        case 'therapist':  
            therapist.classList.remove('d-none');
            cardiologist.classList.add('d-none');
            dentist.classList.add('d-none');
            pressure.removeAttribute('required');
            bodyMassIndex.removeAttribute('required');
            heart.removeAttribute('required');
            lastVisit.removeAttribute('required');   
                   
        default:
            break;
    }    
})


// create card
async function createCard() {

    try {
        let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                doctor: `${doctor.value}`,
                purpose: `${visitForm.purpose.value}`,
                description: `${visitForm.description.value}`,
                priority: `${visitForm.priority.value}`,
                name: `${visitForm.name.value}`,
                pressure: `${visitForm.pressure.value}`,
                bodyMassIndex: `${visitForm.bodyMassIndex.value}`,
                heart: `${visitForm.heart.value}`,
                age: `${visitForm.age.value}`,
                lastVisit: `${visitForm.lastVisit.value}`,
            })
        })    
        
        let card = await response.json(); 

        viewAllCards();
        
    } catch (err) {
        alert(err.message)
    }
}

visitForm.addEventListener('submit', (el) => {
    el.preventDefault(); 
    createCard();
    let modal = document.getElementById('create-visit');
    let modalInstance = bootstrap.Modal.getInstance(modal); // Отримати екземпляр модального окна
    modalInstance.hide();
    visitForm.reset(); 
})


// view all cards
async function viewAllCards() {

	let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    let cards = await response.json();   

    const loginBtn = document.querySelector('.header__btn-login');
    const createBtn = document.querySelector('.header__btn-create-visit');
    const noitems = document.querySelector('.main__items-text');
    const welcome = document.querySelector('.main__text-wrapper');
    const cardsWrapper = document.querySelector('.main__cards-wrapper');

    loginBtn.classList.add('d-none');
    createBtn.classList.remove('d-none');
    noitems.classList.remove('d-none');
    welcome.classList.add('d-none');
    cardsWrapper.classList.remove('d-none');

    if (cards.length) {
        noitems.classList.add('d-none');
    }

    cardsWrapper.innerHTML = '';


    cards.forEach(card => {	

        if (card.doctor === 'cardiologist') {
            const visitCardiologist = new VisitCardiologist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.pressure, card.bodyMassIndex, card.heart, card.age );
            const cardElement = visitCardiologist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else if (card.doctor === 'dentist') {
            const visitDentist = new VisitDentist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.lastVisit );
            const cardElement = visitDentist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else if (card.doctor === 'therapist') {
            const visitTherapist = new VisitTherapist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.age );
            const cardElement = visitTherapist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else {
            const visit = new Visit(card.doctor, card.purpose, card.description, card.priority, card.name, card.id);
            const cardElement = visit.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        }
        	       
	}); 
}


//add filters

const searchInput = document.querySelector('input[type="search"]');
const selectPriority = document.getElementById('selectPriority');

searchInput.addEventListener('input', handleFilterChange);
selectPriority.addEventListener('change', handleFilterChange);

function handleFilterChange() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const priorityFilter = selectPriority.value.toLowerCase();

    if (searchValue === '' && priorityFilter === 'choose priority') {
        viewAllCards();
    } else {
        viewFilteredCards(searchValue, priorityFilter);
    }
}


async function viewFilteredCards(searchValue, priorityFilter) {
    let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    let cards = await response.json();

    if (cards.length) {
        document.querySelector('.main__items-text').classList.add('d-none');
    } else {
        document.querySelector('.main__items-text').classList.remove('d-none');
    }

    const cardsWrapper = document.querySelector('.main__cards-wrapper');
    cardsWrapper.innerHTML = '';

    cards.filter(card => {
        return (
            card.name.toLowerCase().includes(searchValue) ||
            card.doctor.toLowerCase().includes(searchValue) ||
            card.purpose.toLowerCase().includes(searchValue) ||
            card.description.toLowerCase().includes(searchValue)
        ) && (
            priorityFilter === 'choose priority' || card.priority.toLowerCase() === priorityFilter
        );
    }).forEach(card => {
        let cardElement;
        if (card.doctor === 'cardiologist') {
            const visitCardiologist = new VisitCardiologist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.pressure, card.bodyMassIndex, card.heart, card.age);
            cardElement = visitCardiologist.render();
        } else if (card.doctor === 'dentist') {
            const visitDentist = new VisitDentist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.lastVisit);
            cardElement = visitDentist.render();
        } else if (card.doctor === 'therapist') {
            const visitTherapist = new VisitTherapist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.age);
            cardElement = visitTherapist.render();
        }
        cardElement.setAttribute('data-id', card.id);
        cardsWrapper.append(cardElement);
    });
}

