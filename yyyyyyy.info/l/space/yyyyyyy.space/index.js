const mist = new Howl({
  src: ['mist.mp3'],
  autoplay: true,
  loop: true
}).play();

const swish = new Howl({
  src: ['sound1.mp3']
});

const fadeTime = 1100;

const getImage = async () => {
  let response = await fetch('/getimage');
  
  try {
    return response.json();
  } catch (e) {
    console.error(e);
  }
}

const createImage = (data) => {
  let leftPos = Math.floor(Math.random() * ((window.innerWidth - 200) + 1)) + 'px';
  let topPos = Math.floor(Math.random() * ((window.innerHeight - 200) + 1)) + 'px';
  let newDiv = document.createElement("div");

  newDiv.setAttribute("class", "image")
  newDiv.style.top = topPos;
  newDiv.style.left = leftPos;
  newDiv.innerHTML = `<img src="https://files.yyyyyyy.info/images/${data.file}"  width="${data.width}" height="${data.height}">`;
  document.body.appendChild(newDiv);

  setTimeout(() => {
    newDiv.classList.add('visible');
    swish.play();
  }, 50);

  return newDiv;
}


const removeImage = () => {
  let oldDiv = document.getElementsByClassName("image")[0];

  oldDiv.classList.remove('visible');
  setTimeout(() => {
    oldDiv.parentNode.removeChild(oldDiv);
  }, fadeTime);
}


const cycleImage = async () => {
  let image = await getImage();  
  createImage(image.image[0]);
  swish.play();
} 


cycleImage();

setInterval(() => {
  setTimeout(() => {
    removeImage();
  }, 100);
  cycleImage();
}, 6000);