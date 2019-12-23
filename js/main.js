
const employeesUrl = 'https://randomuser.me/api/?results=12&inc=name,location,email,login,cell,picture,dob&nat=us';
const employeeList = document.getElementById('employee-wrap');
var employeeArray = [];
var $search = $('.search-box');
var cache = [];
const $wrap =  $('#employee-wrap');
var i;

// fetch data from URL


async function createEmployeesList(url) {
    const employeesList = await fetch(url);
    const employeesJSON = await employeesList.json(); 
    
        employeesTry = employeesJSON.results.map( async (employee) => {
        const name = employee.name;
        const location = employee.location;
        const login = employee.login;
        const email = employee.email;
        const phone = employee.cell;
        const picture = employee.picture;
        const dob = employee.dob;
        return {name, location,login,email,phone,picture,dob};
    });
return Promise.all(employeesTry);
}

// create array of returned resolved promises


function createEmployeesArray(data) {
    data.forEach(employee => {
        let person = {}; 
        person.name = employee.name.first + ' ' + employee.name.last;
        person.login = employee.login.username;
        person.image = employee.picture.large;
        person.email = employee.email;
        person.city = employee.location.city;
        person.phone = employee.phone;
        person.address = employee.location.street.number + ' ' + employee.location.street.name + ' , ' + employee.location.state ;
        person.postcode = employee.location.postcode;
        let b = String(employee.dob.date);
        person.bd = b.substring(0,10);
        // console.log(person);
        employeeArray.push(person);
    });
}



// generate HTML function

function generateHTML(){
    for (let x = 0; x < employeeArray.length; x++){
        const div = document.createElement('div');
            div.classList.add('employee-box');
            employeeList.appendChild(div);
            div.innerHTML = `
            <img src=${employeeArray[x].image}>
            <h2>${employeeArray[x].name }</h2>     
            <p>${employeeArray[x].email}</p>
            <p>${employeeArray[x].city}</p>
            `;
    }
}


createEmployeesList(employeesUrl)
    .then(createEmployeesArray)
    .then(generateHTML)
    .catch( err => console.log(err))



// filter functions



function filter(){
    var query = this.value.trim().toLowerCase();
    for ( let j = 0; j < employeeArray.length; j++){
        let name = employeeArray[j].name.toLowerCase();
        let login = employeeArray[j].login.toLowerCase();
        if ( name.indexOf(query) > -1 || login.indexOf(query) > -1){
            $('#employee-wrap').children().eq(j).show();
        } else {
            $('#employee-wrap').children().eq(j).hide();
        }
    }
};


  if ('oninput' in $search[0]) {
    $search.on('input', filter);
  } else {
    $search.on('keyup', filter);
  }

//CREATE MODAL FUNCTION

  function createModal(ind){
    $wrap.append('<div class="modal"> <div class="arrow-container"><span class="scroll-left">&lt </span><div class="box-employee-modal"></div><span class="scroll-right"> &gt</span></div></div>');
    $('.box-employee-modal').append("<p class='modal-close'><strong>X</strong></p>");
    $('.box-employee-modal').append("<img src='"+ employeeArray[ind].image + "' class='img-modal'></img>");
    $('.box-employee-modal').append("<h2 class='name-modal'>"+ employeeArray[ind].name +"</h2>");
    $('.box-employee-modal').append("<p class='email-modal'>"+ employeeArray[ind].email +"</p>");
    $('.box-employee-modal').append("<p class='city-modal'>"+ employeeArray[ind].city +"</p>");
    $('.box-employee-modal').append("<div class='border-modal'></div>");
    $('.box-employee-modal').append("<p class='phone-modal'>"+ employeeArray[ind].phone +"</p>");
    $('.box-employee-modal').append("<p class='adress-modal'>"+ employeeArray[ind].address +' '+ employeeArray[ind].postcode  +"</p>");
    $('.box-employee-modal').append("<p class='bd-modal'>"+"Birthday: "+ employeeArray[ind].bd +"</p>");
    if (ind <= 0){
        $('.scroll-left').hide();
    } else if (ind >= 11){
        $('.scroll-right').hide();
    }
  }

  // Create modal 
  
  $(document).ready(function(){
   $wrap.on("click", ".employee-box", function(){
      i = $(this).index();
      createModal(i);
    $wrap.on('click', '.modal-close', function(){
        $('.modal').delay(1000).remove();
        });
    
     
    }); 
  });


// LEFT AND RIGHT ARROW FUNCTIONS


$(document).ready(function(){
        $wrap.on('click', '.scroll-left',function(){
            $('.modal').delay(1000).remove();
            i--;
            createModal(i);
            if (i <= 0){
                $('.scroll-left').hide();
            }; 
           
         });

         $wrap.on('click', '.scroll-right',function(){
            $('.modal').delay(1000).remove();
            i++;
            createModal(i);
            if (i >= 11){
                $('.scroll-right').hide();
            }; 
           
         });
});