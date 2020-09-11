app.service("TodoService", function ($http) {
  
  var urlBase = "URL_BASE";
  
  var config = {   
   headers : { "Accept" : "application/json"}
  };
  
  this.get = function () {    
    return $http.get(urlBase);    
  }
  
  this.add = function (newTodo) {
    return $http.post(urlBase, JSON.stringify(newTodo), config);    
  }
  
  this.update = function (id, updateTodo) {
    var url = urlBase + "/" + id;    
    return $http.put(url, JSON.stringify(updateTodo), config);
  }
  
  this.delete = function(id) {
    var url = urlBase + "/" + id;
    return $http.delete(url);
  }
  
});