
function getPosts() {
  let req = new XMLHttpRequest();
  req.open("GET", "https://jsonplaceholder.typicode.com/posts/s");
  req.send();
  req.responseType = "json";

  req.onload = () => {
    if (req.status >= 200 && req.status < 300) {

      let response = req.response;
      for(let itm of  response)
        console.log(itm.title);
      
      console.log("%c%s" , "color:green" ,"Getting Done! Successfuly");

    } 
    else {
      console.log("%c%s", "color:red", "Huge Troubles");
    }
  }
}

function createPost() {
  let req = new XMLHttpRequest();
  req.open("POST", "https://jsonplaceholder.typicode.com/posts/ss");
  // req.responseType = "json";
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-type", "application/json");
  req.send(`{
    "title" : "distinct tiitle",
    "body": "unique",
    "userId": "2"
  }`);

  if (req.readyState == 4) {
    if (req.status == 201) {

      req.onload = () => {
          let response = req.response;
          console.log(response);
          console.log(typeof response);
      }

    }
  }
  else {
    console.log("ji");
  }

}


function updatePost() {
  let req = new XMLHttpRequest();
  req.open("PUT", "https://jsonplaceholder.typicode.com/posts/1");
  req.responseType = "json";
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-type", "application/json");
  req.send(`{
    "id": 1,
    "title": "new title",
    "body": "new body",
    "userId": 1
  }`);
  req.onload = () => {
    if (req.readyState == 4 && req.status == 200) { // complete && Ok 
      let response = req.response;
      console.log(response);
    }
    else {
      console.log("Cann't update info");
    }
  }
}

function deletePost() {
  let req = new XMLHttpRequest();
  req.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
  req.responseType = "json";
  req.send();
  req.onload = () => {
    if (req.readyState == 4 && req.status == 200) { // complete && Ok
      let response = req.response;
      console.log(response);
    }
    else {
      console.log("Cannot Delete This Post");;
    }
  }
}

function getSpecificPosts() {
  let req = new XMLHttpRequest();
  req.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=2");
  req.responseType = "json";
  req.send();
  req.onload = () => {
    if (req.readyState == 4 && req.status == 200) {
      let response = req.response;
      console.log(response);
    }
    else {
      console.log("Cannot Get Posts");
    }
  }
}

// getPosts();
// createPost();
// updatePost();
// deletePost();
getSpecificPosts();

