
const employeesUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture,dob&nat=us';
const employeeList = document.getElementById('employee-wrap');
var employeeArray = [];

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




function createEmployeesArray(data) {
    data.forEach(employee => {
        let person = {};
        person.name = employee.name.first + ' ' + employee.name.last;
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

// function generateHTML(data) {
//     data.map( employee => {
//         const section = document.createElement('section');
//     employeeList.appendChild(section);
//     section.innerHTML = `
//       <img src=${employee.picture.thumbnail}>
//       <h2>${employee.name.first}</h2>
//       <p>${employee.email}</p>
//       <p>${employee.location.city}</p>
//     `;
//     })
//  }


createEmployeesList(employeesUrl)
    // .then( data => console.log(data))
    // .then(generateHTML)
    .then(createEmployeesArray)
    .catch( err => console.log(err))


