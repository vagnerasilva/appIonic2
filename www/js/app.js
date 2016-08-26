// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])

.controller('TodoCtrl', function($scope,$ionicPopup,$ionicListDelegate) {// Injection dos itens a serem controlados
    // Criando vetor com os itens da lista iniciais
    $scope.tasks =
      [
        {title: "Primeiro", completed: true},
        {title: "Segundo", completed: false},
        {title: "Terceiro", completed: false},
      ];
    $scope.newTask = function() {
      $ionicPopup.prompt({
        title: "Novo item",
        template: "Nome do item:",
        inputPlaceholder: "digite item novo?",
        okText: 'Criar Novo'
      }).then(function(res) {    // promise 
        if (res) $scope.tasks.push({title: res, completed: false});
      })
    };
    $scope.edit = function(task) { // editor da lista 
      $scope.data = { response: task.title };
      $ionicPopup.prompt({
        title: "Editar",
        scope: $scope
      }).then(function(res) {    // promise 
        if (res !== undefined) task.title = $scope.data.response;
        $ionicListDelegate.CloseOptionButtons() // Fecha o botao de edição 
      })
    };

})
.run(function($ionicPlatform) { // função callback que sobe o servidor do applicativo
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); // plugin que da acesso ao teclado

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
angular.module('starter.services', [])// Chamada dos dados que foram consultados no MongoDB no gulpfile
.factory('bancoDeOcorrencias', ['$http', function($http){
  var bancoDeOcorrencias = {
    buscarTodas: function() {
      var url = 'http://localhost:8100/ocorrencias/listar';
           return $http.get(url);
    },
  };
  return bancoDeOcorrencias;
  }]); //fecha .factory