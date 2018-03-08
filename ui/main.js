
var button = document.getElementById('counter');
//var counter = 0;
button.onclick = function(){
  //counter = counter + 1;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
  if (request.readyState === XMLHttpRequest.DONE){
      if (request.status == 200){
          var counter = request.responseText;
          var span = document.getElementById('count');
          span.innerHTML = counter.toString();        
      }
  }
  
};

request.open('GET','http://balaji740.imad.hasura-app.io/counter',true);
request.send(null);
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
};
//var nameInput = document.getElementById('name');
//var name = nameInput.value;
//var button = document.getElementById('btn_id');
//button.onclick = function(){
//    var request = new XMLHttpRequest();
//    request.onreadystatechange = function(){
//    if (request.readyState === XMLHttpRequest.DONE){
//        if (request.status == 200) {
//            var list = " ";
  //          var names = ['name1','name2'];
//            var names = request.responseText;
//            names = JSON.parse(names);
//            for(var i=0; i<names.length;i++){
//             list += '<li>' + names[i] + '</li>';
//           }
//     var ui = document.getElementById('namelist');
//     ui.innerHTML = list;            
//    }
//  }

button.onClick = function(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
      if (request.readyState === XMLHttpRequest.DONE){
          if (request.status == 200) {
              alert(logged in successfully);
          } else if (request.status == 403){
              alert('username/password is incorrect');
              
          } else if (request.status ==500){
              alert('server error');
          }
              
          }
};
//var nameInput = document.getElementById('name');
//var name = nameInput.value;
//request.open('GET', 'http://balaji740.imad.hasura-app.io/submit-name?name=' + name,true);
//  request.send(null);
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://balaji740.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username:username,password:password}));
}; 
    
