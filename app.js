(function() {
    'use strict';

    angular
        .module('agi', [
            'commons',
            'ui.router',
            'ui.keypress',
            //'google-maps',

            //app modules
            'app.nodos'
        ])
        .constant('API', 'http://localhost/percep/public/api')
        .config(config)
        .run(run);

    function config($urlRouterProvider, $stateProvider){

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '/nodos');
        //$urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app', {
                abstract : true,
                url: '',
                templateUrl: 'layout/layout.html',
                controller: 'indexController as vm'
            });
    }

    function run($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (!to.data || !to.data.noRequiresLogin) {
                if (to.data && to.data.onlyAccess) {
                    if (!(!to.data.onlyAccess || to.data.onlyAccess == 'all')) {
                        e.preventDefault();
                        $state.go('app.nodo_nuevo');
                    }
                }
            }
        });
    }
})();
