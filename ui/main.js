
alert('hi its javascript');
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick=function(){
  //console.log('Loaded-test');    
  //img.style.marginLeft='100px';  
  var interval = setInterval(moveRight,50);
};