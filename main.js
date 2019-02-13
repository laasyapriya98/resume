var request;
var open;
var result;
var tx;
var store;
var indexedDB= window.indexedDB || window.webkitindexedDB || window.msindexedDB ||window.mozindexedDB;
request=indexedDB.open("mydatabase",1);

request.onerror=function(e){
  console.log("error"+e);
}
//onupgradeneeded
request.onupgradeneeded=function(e){
  result=e.target.result;
  store=result.createObjectStore("resume",{keyPath:"name"});
}
//onsuccess
request.onsuccess=function(e){
  result=e.target.result;
function getdata(callback){
  tx=result.transaction("resume",IDBTransaction.READ_ONLY);
  store=tx.objectStore("resume");
  data=[];
  tx.oncomplete=function(e){
    callback(result);
    console.log(result);
  }
    var cursor=store.openCursor();

    cursor.onerror=function(e){
      console.log("error"+e);
    }

    cursor.onsuccess=function(e){
      var m=e.target.result;
      if(m){
        data.push(m.value);
        m.continue();
      }
    }
  }
  var parent=document.querySelector(".parent");
  getdata(function(d){
    console.log(d);
    for(var i in data){
      var child=document.createElement("div");
      child.classList.add("child");
      parent.appendChild(child);

      var img=document.createElement("img");
      img.src="1.jpg";
      img.alt=data[i].name;
      child.appendChild(img);

      var name=document.createElement("h2");
      name.textContent=data[i].name;
      child.appendChild(name);


      var email=document.createElement("h2");
      email.textContent=data[i].email;
      child.appendChild(email);

      var button=document.createElement("a");
      button.textContent="View Profile";
      button.href="resume.html?name="+data[i].name;
      child.appendChild(button);

    }
  });
}
