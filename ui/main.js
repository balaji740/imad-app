
alert('hi its javascript');
var img = document.getElementById('madi');
var marginleft = 0;
function moveRight() {
    marginleft = marginleft + 10;
    img.style.marginLeft = marginleft + 'px';
}
img.onclick=function(){
  //console.log('Loaded-test');    
  //img.style.marginLeft='100px';  
  var interval = (moveRight,100);
};