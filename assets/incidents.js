
function addIncident(incident)
{
    var marker = L.marker([incident.lat, incident.long]).addTo(map);
    marker.bindPopup("<b>" + incident.name +"</b><br>" + incident.date + "<br>" + incident.link);
}

fetch("../assets/incidents.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //     console.log("parsing " + data.length + " incidents")
   // for (let i = 0; i < data.length; i++) {
   //   console.log(data[i]);
   //   addIncident(data[i]);
    }
  );

