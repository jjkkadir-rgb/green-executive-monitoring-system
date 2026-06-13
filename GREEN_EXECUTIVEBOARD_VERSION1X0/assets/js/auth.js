function login(){

let username=

document.getElementById(
"username"
).value;


let password=

document.getElementById(
"password"
).value;


if(

username==="superadmin"

&&

password==="Super@123"

){

localStorage.setItem(

"role",

"superadmin"

);

window.location=

"modules/dashboard.html";

}


else if(

username==="admin"

&&

password==="Admin@123"

){

localStorage.setItem(

"role",

"admin"

);

window.location=

"modules/dashboard.html";

}


else if(

username==="viewer"

&&

password==="Viewer@123"

){

localStorage.setItem(

"role",

"viewer"

);

window.location=

"modules/dashboard.html";

}


else{

alert(

"Invalid username or password"

);

}

}
