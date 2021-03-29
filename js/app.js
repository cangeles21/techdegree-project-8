//global variables
const randomUser = 'https://randomuser.me/api/?results=12';
const employeeContainer = document.getElementById('employeeProfiles');
const profileDivs = document.getElementsByClassName('employeeInfo');
const closeBtn = document.getElementById('modalClose');
// const backBtn = document.getElementById('modalBack');
// const nextBtn = document.getElementById('modalNext');
const overlay = document.getElementById('overlay');
let employees = [];

// fetch data
function fetchRandomUser(url) {
	fetch(url)
		.then(response => response.json())
		.then(userJSON => userJSON.results)
		.then(generateEmployeeProfile)
		.catch(e => console.log(e))
};

// generate employee profiles
function generateEmployeeProfile(json) {
	employees = json;

	employees.forEach((employee, index) => {
		let thumbnail = employee.picture.thumbnail								
		let employeeName = employee.name.first + ' ' + employee.name.last
		let email = employee.email
		let city = employee.location.city
		const profile = document.createElement('div');
		employeeContainer.appendChild(profile);
		profile.className = 'employeeInfo';
		profile.innerHTML = 
			`
			<img src=${thumbnail}>
			<h3 class="employeeName">${employeeName}</h3>
			<p class="email">${email}</p>
			<p class="city">${city}</p>
			`;
		profile.addEventListener('click', () => {
			overlay.classList.remove('hidden');
			let profileImg = document.getElementById('employeePic');
			let name = document.getElementById('employeeName');
			let employeeEmail = document.getElementById('employeeEmail');
			let employeeCity = document.getElementById('employeeCity');
			let cellPhone = document.getElementById('employeePhone');
			let address = document.getElementById('employeeAddress');
			let dob = document.getElementById('employeeBirthday');
			let birthday = new Date(employees[index].dob.date);

			profileImg.src = employee.picture.large
			name.innerHTML = employee.name.first + ' ' + employee.name.last;
			employeeCity.innerHTML = employee.location.city
			address.innerHTML = employee.location.street.number + ' ' + employee.location.street.name + ' ' + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode;
			employeeEmail.innerHTML = employee.email
			dob.innerHTML = birthday.getMonth() + '/' + birthday.getDate() + '/' + birthday.getFullYear()
			cellPhone.innerHTML = employee.cell
			});
		});
	};

	closeBtn.addEventListener('click', () => {
		overlay.classList.add('hidden');
	});

fetchRandomUser(randomUser);



