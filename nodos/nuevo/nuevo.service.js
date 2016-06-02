
(function() {
    'use strict';

    angular
        .module('app.nodos.nuevo')
        .service('nodosService', nodosService);

    function nodosService($http, API) {
        this.getAll = function () {
            return $http.get(API+'/nodos');
        }

        this.get = function (id) {
            return $http.get(API+'/nodos/' + id);
        }

        this.post = function (object) {
            return $http.post(API+'/nodos', object);
        }

        this.put = function (object, id) {
            return $http.put(API+'/nodos/' + id, object);
        }

        this.delete = function (id) {
            return $http.delete(API+'/nodos/' + id);
        }

        this.postRuta = function (object) {
            return $http.post(API+'/rutas', object);
        }
    }
})();