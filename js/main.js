
const employeesUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture&nat=us'

// const employeesList2 = $.ajax({
//     url: 'https://randomuser.me/api/?results=12&inc=name,location,email,phone,picture&nat=us',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });

    
// const employeesList = $.ajax({
//     url: 'http://api.open-notify.org/astros.json',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });



async function createEmployeesList(url) {
    const employeesList = await fetch(url);
    const employeesJSON = await employeesList.json();
    // const employeesParsed = await JSON.parse(employeesJSON);
    alert(employeesJSON);

}


createEmployeesList(employeesUrl);

