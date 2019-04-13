

var key = 'name';


document.getElementById("addLocalStorage").addEventListener("click", function(){

    localStorage.setItem(key, 'moyo imja');
});


document.getElementById('remLocalStorage').addEventListener("click", function () {
    localStorage.removeItem(key);
})


document.getElementById("addSessionStorage").addEventListener("click", function(){

    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        sessionStorage.setItem(key, "moyo imja");
        // Retrieve

    } else {
       console.log("Sorry, your browser does not support Web Storage...");
    }
});

document.getElementById('remSeissionLocalStorage').addEventListener("click", function () {
    sessionStorage.removeItem(key);
})

document.getElementById('showLocalStorage').addEventListener("click", function () {
  var ls =  localStorage.getItem(key);
  console.log(ls);
})

document.getElementById('showSessionStorage').addEventListener("click", function () {
   var ss = sessionStorage.getItem(key);
    console.log(ss);
})