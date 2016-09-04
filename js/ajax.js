var schemeButton = document.querySelector('button#scheme');
var colorButton = document.querySelector('button#color');
var nameField = document.getElementById('scheme-name');
var colorSquare = document.getElementById('color-square');

schemeButton.addEventListener('click', function() {
  nameField.innerHTML = '&nbsp';
  $.getJSON('http://www.colr.org/json/scheme/random',
    function (colorScheme) {
      var colors = colorScheme.schemes[0].colors;
      var name = colorScheme.schemes[0].tags[0].name;
      nameField.innerHTML = name + ' (spalvų skaičius: ' + colors.length + ')';
      colorSquare.style.backgroundColor = '#' + colors[0];
      var getNextFromScheme = getNext(colors);
      listenColorButton(getNextFromScheme);
    }
  );
});

function getNext(array) {
  var index = 1;
  var max = array.length - 1;
  return function() {
    if(index <= max) {
      return array[index++];
    }
    else{ return array[index]; }
  };
}

function listenColorButton(getNextFromScheme) {
  colorButton.addEventListener('click', function() {
    colorSquare.style.backgroundColor = '#' + getNextFromScheme();
  });
}
