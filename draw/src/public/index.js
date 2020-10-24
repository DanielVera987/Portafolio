function init() {

  let mouse = {
    click: false,
    move: false,
    pos: {x: 0, y: 0},
    prev_pos: false
  };

  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  io();

  canvas.addEventListener('mousedown', (e) => {
    mouse.click = true;
  });

  canvas.addEventListener('mouseup', (e) => {
    mouse.click = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
  });

  function mainLoop(){
    if(mouse.click && mouse.move && mouse.prev_pos){

    }
    setTimeout(mainLoop, 25);
  }
  mainLoop();
}

document.addEventListener('DOMContentLoaded', init);