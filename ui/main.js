
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function(){
  counter = counter + 1;     
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
};
//alert('hi its javascript');
//var img = document.getElementById('madi');
//var marginleft = 0;
//function moveRight() {
//    marginleft = marginleft + 1;
//    img.style.marginLeft = marginleft + 'px';
//}
//img.onclick=function(){
  //console.log('Loaded-test');    
  //img.style.marginLeft='100px';  
//  var interval = setInterval(moveRight,50);
//};