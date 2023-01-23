
var incidents;

function addIncident(incident, popup) {

  var opacity;

  switch (incident.year) {
    case "2023":
      opacity = 1.0;
      break;
    case "2022":
      opacity = 0.7;
      break;
    case "2021":
      opacity = 0.5;
      break;
    default:
      opacity = 0.4;
  }

  var marker = L.marker([incident.lat, incident.long]).addTo(map);
  marker.bindPopup("<b>" + incident.name + "</b><br>" + incident.date + "<br>" + incident.link).setOpacity(opacity);
  if (popup)
    marker.openPopup();
}

fetch("../assets/incidents.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    incidents = data.incidents;
    for (let i = 0; i < incidents.length; i++) {
      var popup = i == (incidents.length - 1);
      addIncident(incidents[i], popup);
    }
  });

