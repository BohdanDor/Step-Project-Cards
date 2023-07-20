export class Visit {

    constructor(doctor, purpose, description, priority, name, id) {
        this.doctor = doctor;
        this.purpose = purpose;       
        this.description = description;
        this.priority = priority;
        this.name = name;
        this.id = id;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
                <p>ID: ${this.id}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-warning">Edit</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
    
    async deleteCard() {
		try {
			const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

			if (response.ok) {
				const cardElement = document.querySelector(`[data-id="${this.id}"]`);
				cardElement.remove();
			} else {
				console.error('Error:', response.status);
			}
		} catch (error) {
			console.error('Error:', error);
		}
    }   
}


export class VisitCardiologist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, pressure, bodyMassIndex, heart, age) {
        super(doctor, purpose, description, priority, name, id);
        this.pressure = pressure;
        this.bodyMassIndex = bodyMassIndex;
        this.heart = heart;
        this.age = age;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Pressure: ${this.pressure}</p>
				<p>Body mass index: ${this.bodyMassIndex}</p>
				<p>Diseases of heart: ${this.heart}</p>
				<p>Age: ${this.age}</p>
                <p>ID: ${this.id}</p>				
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit" >Edit</button>
			`;
		const btnDelete = cardElement.querySelector('.btn-close, .card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
        });

		return cardElement;
    }
}

export class VisitDentist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, lastVisit) {
        super(doctor, purpose, description, priority, name, id);
        this.lastVisit = lastVisit;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Last visit: ${this.lastVisit}</p>
                <p>ID: ${this.id}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit">Edit</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
}

export class VisitTherapist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, age) {
        super(doctor, purpose, description, priority, name, id);
        this.age = age;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Age: ${this.age}</p>
                <p>ID: ${this.id}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit">Edit</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
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

async function viewAllCards() {
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

    cards.forEach(card => {
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
