
const employeesUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture,dob&nat=us';
const employeeList = document.getElementById('employee-wrap');
var employeeArray = [];



// fetch data from URL


async function createEmployeesList(url) {
    const employeesList = await fetch(url);
    const employeesJSON = await employeesList.json(); 
    
        employeesTry = employeesJSON.results.map( async (employee) => {
        const name = employee.name;
        const location = employee.location;
        const email = employee.email;
        const phone = employee.phone;
        const picture = employee.picture;
        const dob = employee.dob;
        return {name, location,email,phone,picture,dob};
    });
return Promise.all(employeesTry);
}

// create array of returned resolved promises


function createEmployeesArray(data) {
    data.forEach(employee => {
        let person = {};
        person.name = employee.name.first;
        person.surname = employee.name.last;
        person.image = employee.picture.thumbnail;
        person.email = employee.email;
        person.city = employee.location.city;
        person.phone = employee.phone;
        person.address = employee.location.street.number + ' ' + employee.location.street.name;
        person.postcode = employee.location.postcode;
        // console.log(person);
        employeeArray.push(person);
    });
}



// generate HTML function

function generateHTML(){
    for (let x = 0; x < employeeArray.length; x++){
        const div = document.createElement('div');
            employeeList.appendChild(div);
            div.innerHTML = `
            <img src=${employeeArray[x].image}>
            <h2>${employeeArray[x].name + ' ' + employeeArray[x].surname}</h2>
            <p>${employeeArray[x].email}</p>
            <p>${employeeArray[x].city}</p>
            `;
    }
}





createEmployeesList(employeesUrl)
    // .then( data => console.log(data))
    .then(createEmployeesArray)
    .then(generateHTML)
    .catch( err => console.log(err))


