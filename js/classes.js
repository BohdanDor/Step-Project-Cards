export class Visit {

    constructor(doctor, purpose, description, priority, name, id) {
        this.doctor = doctor;
        this.purpose = purpose;       
        this.description = description;
        this.priority = priority;
        this.name = name;
        this.id = id;
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
    
    openEditModal() {
            
        const inputDoctor = document.getElementById('doctor');
        const inputPurpose = document.getElementById('purpose');
        const inputDescription = document.getElementById('description');
        const inputPriority = document.getElementById('priority');
        const inputName = document.getElementById('name');
        const inputPressure = document.getElementById('pressureCardiologist');
        const inputBodyMassIndex = document.getElementById('bodyMassIndexCardiologist');
        const inputHeart = document.getElementById('heartCardiologist');
        const inputAge = document.getElementById('ageCardiologist');
       
        inputDoctor.value = this.doctor;
        inputPurpose.value = this.purpose;
        inputDescription.value = this.description;
        inputPriority.value = this.priority;       
        inputName.value = this.name;
        inputPressure.value = this.pressure;
        inputBodyMassIndex.value = this.bodyMassIndex;
        inputHeart.value = this.heart;
        inputAge.value = this.age;

        const form = document.getElementById('editForm');
        form.addEventListener('submit', (ev) => {
            // ev.preventDefault();
            this.saveCardChanges();
            let modal = document.getElementById('edit-visit');
            let modalInstance = bootstrap.Modal.getInstance(modal); // Отримати екземпляр модального окна
            modalInstance.hide();
            editForm.reset(); 
        });

    }

    async saveCardChanges() {
        try {
            
            const inputDoctor = document.getElementById('doctor');
            const inputPurpose = document.getElementById('purpose');
            const inputDescription = document.getElementById('description');
            const inputPriority = document.getElementById('priority');
            const inputName = document.getElementById('name');
            const inputPressure = document.getElementById('pressureCardiologist');
            const inputBodyMassIndex = document.getElementById('bodyMassIndexCardiologist');
            const inputHeart = document.getElementById('heartCardiologist');
            const inputAge = document.getElementById('ageCardiologist');
                  

            const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: this.id,
                    doctor: inputDoctor.value,
                    purpose: inputPurpose.value,
                    description: inputDescription.value,
                    priority: inputPriority.value,
                    name: inputName.value,
                    pressure: inputPressure.value,
                    bodyMassIndex: inputBodyMassIndex.value,
                    heart: inputHeart.value,
                    age: inputAge.value
                })
            });
            
        } catch (error) {
            console.error('Error:', error);
        }        
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-secondary show-more-button">Show More</button>
                <div class="more-data mt-3" style="display: none;">
                    <p>Purpose of visit: ${this.purpose}</p>
                    <p>Description of visit: ${this.description}</p>
                    <p>Priority: ${this.priority}</p>
                    <p>Pressure: ${this.pressure}</p>
                    <p>Body mass index: ${this.bodyMassIndex}</p>
                    <p>Diseases of heart: ${this.heart}</p>
                    <p>Age: ${this.age}</p>
                    <p>ID: ${this.id}</p>				
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit" >Edit</button>
                </div>
				
			`;
		const deleteBtn = cardElement.querySelector('.btn-close, .card-button');
		deleteBtn.addEventListener('click', () => {
			this.deleteCard();
        });

        const editBtn = cardElement.querySelector('.btn.btn-warning');
        editBtn.addEventListener('click', () => {
            this.openEditModal(); 
        });

        const showMoreBtn = cardElement.querySelector('.show-more-button');
        const moreData = cardElement.querySelector('.more-data');

        showMoreBtn.addEventListener('click', () => {
            if (moreData.style.display === 'none') {
                moreData.style.display = 'block';
                showMoreBtn.textContent = 'Show Less';
            } else {
                moreData.style.display = 'none';
                showMoreBtn.textContent = 'Show More';
            }
        })

		return cardElement;
    }
}

export class VisitDentist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, lastVisit) {
        super(doctor, purpose, description, priority, name, id);
        this.lastVisit = lastVisit;
    }

    openEditModal() {
            
        const inputDoctor = document.getElementById('doctorDentist');
        const inputPurpose = document.getElementById('purposeDentist');
        const inputDescription = document.getElementById('descriptionDentist');
        const inputPriority = document.getElementById('priorityDentist');
        const inputName = document.getElementById('nameDentist');
        const inputLastVisit = document.getElementById('lastVisitDentist');
        
       
        inputDoctor.value = this.doctor;
        inputPurpose.value = this.purpose;
        inputDescription.value = this.description;
        inputPriority.value = this.priority;       
        inputName.value = this.name;
        inputLastVisit.value = this.lastVisit;

        const form = document.getElementById('editFormDentist');
        form.addEventListener('submit', (ev) => {
            // ev.preventDefault();
            this.saveCardChanges();
            let modal = document.getElementById('edit-visit-dentist');
            let modalInstance = bootstrap.Modal.getInstance(modal); // Отримати екземпляр модального окна
            modalInstance.hide();
            editForm.reset(); 
        });
    }

    async saveCardChanges() {
        try {
            
            const inputDoctor = document.getElementById('doctorDentist');
            const inputPurpose = document.getElementById('purposeDentist');
            const inputDescription = document.getElementById('descriptionDentist');
            const inputPriority = document.getElementById('priorityDentist');
            const inputName = document.getElementById('nameDentist');
            const inputLastVisit = document.getElementById('lastVisitDentist');
                  

            const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: this.id,
                    doctor: inputDoctor.value,
                    purpose: inputPurpose.value,
                    description: inputDescription.value,
                    priority: inputPriority.value,
                    name: inputName.value,
                    lastVisit: inputLastVisit.value
                })
            });
            
        } catch (error) {
            console.error('Error:', error);
        }        
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-secondary show-more-button">Show More</button>
                <div class="more-data mt-3" style="display: none;">
                    <p>Purpose of visit: ${this.purpose}</p>
                    <p>Description of visit: ${this.description}</p>
                    <p>Priority: ${this.priority}</p>
                    <p>Last visit: ${this.lastVisit}</p>
                    <p>ID: ${this.id}</p>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit-dentist">Edit</button>
                </div>
			`;
		const deleteBtn = cardElement.querySelector('.card-button');
		deleteBtn.addEventListener('click', () => {
			this.deleteCard();
        });
        
        const editBtn = cardElement.querySelector('.btn.btn-warning');
        editBtn.addEventListener('click', () => {
            this.openEditModal(); 
        });

        const showMoreBtn = cardElement.querySelector('.show-more-button');
        const moreData = cardElement.querySelector('.more-data');

        showMoreBtn.addEventListener('click', () => {
            if (moreData.style.display === 'none') {
                moreData.style.display = 'block';
                showMoreBtn.textContent = 'Show Less';
            } else {
                moreData.style.display = 'none';
                showMoreBtn.textContent = 'Show More';
            }
        })

		return cardElement;
    }
}

export class VisitTherapist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, age) {
        super(doctor, purpose, description, priority, name, id);
        this.age = age;
    }

    openEditModal() {
            
        const inputDoctor = document.getElementById('doctorTherapist');
        const inputPurpose = document.getElementById('purposeTherapist');
        const inputDescription = document.getElementById('descriptionTherapist');
        const inputPriority = document.getElementById('priorityTherapist');
        const inputName = document.getElementById('nameTherapist');
        const inputAge = document.getElementById('ageTherapist');
        
       
        inputDoctor.value = this.doctor;
        inputPurpose.value = this.purpose;
        inputDescription.value = this.description;
        inputPriority.value = this.priority;       
        inputName.value = this.name;
        inputAge.value = this.age;

        const form = document.getElementById('editFormTherapist');
        form.addEventListener('submit', (ev) => {
            // ev.preventDefault();
            this.saveCardChanges();
            let modal = document.getElementById('edit-visit-therapist');
            let modalInstance = bootstrap.Modal.getInstance(modal); // Отримати екземпляр модального окна
            modalInstance.hide();
            editForm.reset(); 
        });
    }

    async saveCardChanges() {
        try {
            
            const inputDoctor = document.getElementById('doctorTherapist');
            const inputPurpose = document.getElementById('purposeTherapist');
            const inputDescription = document.getElementById('descriptionTherapist');
            const inputPriority = document.getElementById('priorityTherapist');
            const inputName = document.getElementById('nameTherapist');
            const inputAge = document.getElementById('ageTherapist');
                  
            const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: this.id,
                    doctor: inputDoctor.value,
                    purpose: inputPurpose.value,
                    description: inputDescription.value,
                    priority: inputPriority.value,
                    name: inputName.value,
                    age: inputAge.value
                })
            });

        } catch (error) {
            console.error('Error:', error);
        }        
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
                <button type="button" class="btn-close card-button" aria-label="Delete"></button>
                <button type="button" class="btn btn-secondary show-more-button">Show More</button>
                <div class="more-data mt-3" style="display: none;">
                    <p>Purpose of visit: ${this.purpose}</p>
                    <p>Description of visit: ${this.description}</p>
                    <p>Priority: ${this.priority}</p>
                    <p>Age: ${this.age}</p>
                    <p>ID: ${this.id}</p>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-visit-therapist">Edit</button>
                </div>
			`;
		const deleteBtn = cardElement.querySelector('.card-button');
		deleteBtn.addEventListener('click', () => {
			this.deleteCard();
        });
        
        const editBtn = cardElement.querySelector('.btn.btn-warning');
        editBtn.addEventListener('click', () => {
            this.openEditModal(); 
        });

        const showMoreBtn = cardElement.querySelector('.show-more-button');
        const moreData = cardElement.querySelector('.more-data');

        showMoreBtn.addEventListener('click', () => {
            if (moreData.style.display === 'none') {
                moreData.style.display = 'block';
                showMoreBtn.textContent = 'Show Less';
            } else {
                moreData.style.display = 'none';
                showMoreBtn.textContent = 'Show More';
            }
        })

		return cardElement;
    }
}