$(document).ready(function () {

  var ballCount = 7,
    ballMinSize = 30,
    ballMaxSize = 80,
    container = $('.balls');

  $(function () {
    initBalls();
    balls = window.setInterval(moveBalls, 60); // 24 FPS
    $(window).resize(function () { moveBallsIntoBounds(); });
  });

  // Random number generator. Takes a minimum, maximum, and a boolean for whether the random number should be an integer.
  function rand(min, max, isInt) {
    var min = min || 0,
      max = max || 1,
      isInt = isInt || false,
      num = Math.random() * (max - min) + min;
    return (isInt) ? Math.round(num) : num;
  }

  // Creates the balls, puts them in the container, and gives them a random size, color, opacity, starting location, and direction/speed of movement.
  function initBalls() {
    container.css({ 'position': 'relative' });
   // var bcolors = ['#a5c6e6', '#b7f7be', '#b68fa4', '#e3a9f8', '#eecbef', '#cdf38a', '#8dd286'];
    var bcolors = ['#e67279', '#b7f7be', '#b68fa4', '#78b9e4', '#ffb188', '#cdf38a', '#8dd286'];   // #6c678e
   // #d5c8c1
   
    for (i = 0; i < ballCount; i++) {
      var newBall = $('<b />').appendTo(container),
        size = rand(ballMinSize, ballMaxSize);
      newBall.css({
        'position': 'absolute',
        'width': size + 'px',
        'height': size + 'px',
        'opacity': rand(.7, .8),
        //'background-color': 'rgb('+rand(0,255,true)+','+rand(0,255,true)+','+rand(0,255,true)+')',
        'background-color': bcolors[i],
        'top': rand(0, container.height() - size),
        'left': rand(0, container.width() - size)
      }).attr({
        'data-dX': rand(-10, 10),
        'data-dY': rand(1, 10)
      });
    }
  }

  // Moves the balls based on their direction/speed of movement (saved as a data attribute). If the movement will take them outside of the container, they reverse direction along that axis.
  function moveBalls() {
    var maxX = container.width(),
      maxY = container.height();
    $('b', container).each(function (i, b) {
      var ball = $(b),
        pos = ball.position()
      x = pos.left,
        y = pos.top,
        dX = parseFloat(ball.attr('data-dX')),
        dY = parseFloat(ball.attr('data-dY')),
        size = ball.height();
      if (x + dX + size > maxX || x + dX < 0) ball.attr('data-dX', (dX = -dX));
      if (y + dY + size > maxY || y + dY < 0) ball.attr('data-dY', (dY = -dY));
      ball.css({ 'top': y + dY, 'left': x + dX });
    });
  }

  // Move the balls back within the bounds of the container if the window (ergo, possibly the container) is resized. Because we're positioning from the top/left corners, we only have to worry about the bottom/right sides.
  function moveBallsIntoBounds() {
    var maxX = container.width(),
      maxY = container.height();
    $('b', container).each(function (i, b) {
      var ball = $(b),
        pos = ball.position()
      x = pos.left,
        y = pos.top,
        size = ball.height();
      if (x + size > maxX) ball.css({ left: maxX - size + 'px' });;
      if (y + size > maxY) ball.css({ top: maxY - size + 'px' });;
    });
  }



});




