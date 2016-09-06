(function () {
var schemeButton = document.querySelector('button#scheme'),
    colorButton = document.querySelector('button#color'),
    nameField = document.getElementById('scheme-name'),
    colorSquare = document.getElementById('color-square');

var iterator = (function() {
  var counter = 1,
      colorArray;
  return {
    getNextColor: function() {
      if(counter <= colorArray.length - 1) {
        return colorArray[counter++];
      }
      else return;
    },
    setColors: function(colors) {
      colorArray = colors;
    },
    reset: function() {
      counter = 1;
    }
  };
})();

function changeColor() {
  var color = iterator.getNextColor();
  if(color) {
    changeView(color);
  }
}

function getColorScheme() {
  clearNameField();
  $.getJSON('http://www.colr.org/json/scheme/random',
    function(colorScheme) {
      schemeHandler(colorScheme);
  });
}

function schemeHandler(colorScheme) {
  var properties = getSchemeProperties(colorScheme);
  changeView(properties.colors[0], properties.name, properties.number);
  iterator.reset();
  iterator.setColors(properties.colors);
}

function getSchemeProperties(colorScheme) {
  var colors = colorScheme.schemes[0].colors;
  var number = colors.length;
  var name = colorScheme.schemes[0].tags[0].name;
  return { 'name': name, 'colors': colors, 'number': number };
}
 
function clearNameField() {
  nameField.innerHTML = '&nbsp';
}

function changeView(color, name, number) {
  colorSquare.style.backgroundColor = '#' + color;
  if(name) {
    nameField.innerHTML = name + ' (spalvų skaičius: ' + number + ')';
  }
}

schemeButton.addEventListener('click', getColorScheme);
colorButton.addEventListener('click', changeColor);

})();
