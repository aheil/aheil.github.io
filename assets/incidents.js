fetch("../assets/incidents.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));