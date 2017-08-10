var counter = 0;
var button = document.getElementById('counter');
button.onclick = function(){
  counter = counter + 1;     
  var span = document.getElementById('count');
  span.innerHtml = counter.toString();
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