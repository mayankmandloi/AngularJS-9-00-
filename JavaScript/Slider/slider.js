var slider = document.getElementById("slider");
var slides = slider.getElementsByClassName("slide");
var index=0;
function moveSlide() {
if(index<slides.length)
{
  slides[index].style.left="0%";
  slides[index].style.backgroundColor="darkorange";
  slides[index].style.transform="rotate(90deg)";

  index++;
}
else {
  for(i=0;i<slides.length;i++)
  {
    slides[i].style.left="100%";
    slides[i].style.backgroundColor="";
    slides[i].style.transform="rotate(0deg)";
  }
   index=0;
}

};
setInterval(function () {
  moveSlide();
},3000)
