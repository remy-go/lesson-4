var button = document.getElementsByTagName('button')[0];
var bubble = document.getElementsByClassName('speech-bubble')[0];

button.addEventListener('click', function() {
  bubble.classList.toggle('display-flex');
});
