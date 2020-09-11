app.controller("TodoController", ["$scope","$http","TodoService", function ($scope, $http, TodoService) {
  
  $scope.title = "";  
  $scope.todoList = [];
  $scope.categories = ["Frontend","Backend","Testing","UX/UI"];
  
  $scope.editId = "";
  $scope.editTitle = "";
  $scope.editCompleted = "";
  $scope.editDueDate = "";
  $scope.editCategories = [];
  
  // CRUD
  $scope.add = function () {    
    
    $scope.title = $scope.title.trim();
    
    if($scope.title.length > 2) {
      
      var newTodo = {
        title: $scope.title,
        completed: false      
      }

      TodoService.add(newTodo)
        .then(function (r) {
          $scope.title = "";
          $scope.getList();
        }, function (err) {
          console.log(err);       
        });
    }
    
  }
  
  $scope.getList = function() {
    
    TodoService.get()
      .then(function (r) {
        
        r.data.sort(function (a,b) {            
          if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }); 
      
        $scope.todoList = r.data;    
      
      }, function (err) {
        console.log(err);       
      });    
  }
  
  $scope.update = function (item) {
    
    var updateTodo = {
      title: item.title,
      completed: item.completed,
      categories: item.categories,
      dueDate: item.duedate
    }
    
    TodoService.update(item._id, updateTodo)
      .then(function (r) {        
        $scope.getList();
      }, function (err) {
        console.log(err);       
      });
    
  }
  
  $scope.delete = function(id) {
    
    //console.log(id);
    
    TodoService.delete(id)
      .then(function (r) {
        $scope.getList();        
      }, function (err) {
        console.log(err);       
      });
    
  };
  
  // Others
  $scope.showItem = function(item) {    
    $scope.editId = item._id;
    $scope.editTitle = item.title;    
    $scope.editCompleted = item.completed; 
    $scope.editCategories = item.categories;    
    $scope.editDueDate = item.dueDate;    
  }
  
  $scope.editTodo = function() {
      
    var categories = [];
    
    document.querySelectorAll("#dvCategories input:checked").forEach(function(item){
      categories.push(item.value);
    });
    
    var duedate = $scope.editDueDate;    
    var selectedDate = $scope.getDate($scope.dueDate);
    
    if(selectedDate != "") {
      duedate = selectedDate;
    }
    
    var todoForEdit = {
      _id: $scope.editId,
      title: $scope.editTitle,      
      completed: $scope.editCompleted,
      categories,
      duedate
    }
    
    $scope.update(todoForEdit);
    
    $scope.editId = "";
    $scope.editTitle = "";    
    $scope.editCompleted = false; 
    $scope.editCategories = [];
    $scope.editDueDate = "";
    $scope.dueDate = "";
    
  }  
  
  // Helpers 
  $scope.getDate = function (constDate) {
    
    var result = "";    
    var dueDate = new Date();    
    
    if(constDate == "today") {
      dueDate.setDate(dueDate.getDate());
      result = $scope.getDateFormat(dueDate);
    }
    
    if(constDate == "tomorrow") {
      dueDate.setDate(dueDate.getDate() + 1);
      result = $scope.getDateFormat(dueDate);
    }
    
    if(constDate == "dat") {
      dueDate.setDate(dueDate.getDate() + 2);
      result = $scope.getDateFormat(dueDate);
    }
    
    if(constDate == "other") {
      dueDate = new Date($scope.otherDate);
      dueDate.setDate(dueDate.getDate());
      result = $scope.getDateFormat(dueDate);
    }
    
    return result;
    
  }
  
  $scope.getDateFormat = function (date) {    
    var month = date.toDateString().split(" ")[1];
    var day = date.toDateString().split(" ")[2];    
    return month + " " + day;    
  }
  
  // Init
  $scope.init = function () {    
    $scope.otherDate = new Date();
    $scope.getList();
  }
  
}]);