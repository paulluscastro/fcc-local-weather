var unit = 'metric';
var lang = 'pt';
var current = '(atual)';
var min = '(mín.)';
var max = '(máx.)';

function changeLanguage(lang) {
  switch (lang.substring(0, 2)) {
    case 'pt':
      lang = 'pt';
      current = '(atual)';
      min = '(mín.)';
      max = '(máx.)';
      break;
    default:
      lang = 'en';
      current = '(current)';
      min = '(min.)';
      max = '(max.)';
      break;
  }
}

function translateIcon(iconCode){
  switch(iconCode){
    case '01d': return '<i class="wi wi-day-sunny"></i>';
    case '01n': return '<i class="wi wi-night-clear"></i>';
    case '02d': return '<i class="wi wi-day-sunny-overcast"></i>';
    case '02n': return '<i class="wi wi-night-alt-partly-cloudy"></i>';
    case '03d': return '<i class="wi wi-day-cloudy-windy"></i>';
    case '03n': return '<i class="wi wi-night-alt-cloudy-windy"></i>';
    case '04d': return '<i class="wi wi-day-cloudy"></i>';
    case '04n': return '<i class="wi wi-night-alt-cloudy"></i>';
    case '09d': return '<i class="wi wi-day-showers"></i>';
    case '09n': return '<i class="wi wi-night-alt-showers"></i>';
    case '10d': return '<i class="wi wi-day-rain"></i>';
    case '10n': return '<i class="wi wi-night-alt-rain"></i>';
    case '11d': return '<i class="wi wi-day-thunderstorm"></i>';
    case '11n': return '<i class="wi wi-night-alt-thunderstorm"></i>';
    case '13d': return '<i class="wi wi-day-snow"></i>';
    case '13n': return '<i class="wi wi-night-alt-snow"></i>';
    case '50d': return '<i class="wi wi-day-fog"></i>';
    case '50n': return '<i class="wi wi-night-fog"></i>';
  }
}

function getWeather(){
  changeLanguage(navigator.language);

  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var baseAddress = 'http://api.openweathermap.org/data/2.5/weather';

    var address = baseAddress;
    address += '?lat=' + latitude;
    address += '&lon=' + longitude;
    address += '&units=' + unit;
    address += '&lang=' + lang;
    address += '&APPID=67d137edc371ece5ec7ee0180b6a4d9c';

    $.getJSON(address, function(data){
      $('#city').html(data.name);

      var details = '<span class="mute"><small>' + current + '</small></span> <strong>';
      // Temperatura
      details += data.main.temp;
      details += unit == 'metric' ? '° C ' : '° F ';
      details += ' <i class="wi wi-thermometer wi-spacer"></i> </strong><br />';
      // Umidade relativa
      details += data.main.humidity;
      details += ' % ';
      details += ' <i class="wi wi-humidity wi-spacer"></i> <br /><br /><br />';
      // Temperatura mínima
      details += '<span class="mute"><small>' + min + '</small></span> ' + data.main.temp_min;
      details += unit == 'metric' ? '° C ' : '° F ';
      details += ' <i class="wi wi-direction-down wi-spacer"></i> <br />';
      // Temperatura máxima
      details += '<span class="mute"><small>' + max + '</small></span> ' + data.main.temp_max;
      details += unit == 'metric' ? '° C ' : '° F ';
      details += ' <i class="wi wi-direction-up wi-spacer"></i> <br /><br /><br />';

      $('#details').html(details);

      $('#icon').html(translateIcon(data.weather[0].icon));

      var descricao = '';
      for (var i = 0; i < data.weather.length; i++){
        descricao += descricao == '' ? data.weather[i].description : ', ' + data.weather[i].description;
      }

      $('#description').html(descricao);
    });
  });
}

$(document).ready(function(){

  getWeather();

  $('#format').on('click', function(){
    if (unit == 'metric') {
      unit='imperial';
      $('#current-format').removeClass('wi-celsius');
      $('#current-format').addClass('wi-fahrenheit');
    } else {
      unit='metric';
      $('#current-format').removeClass('wi-fahrenheit');
      $('#current-format').addClass('wi-celsius');
    }

    getWeather();
  });
});
