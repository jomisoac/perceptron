/**
 * Created by tav0 on 13/02/16.
 */
(function() {
    'use strict';

    angular
        .module('commons')
        .directive('uploaderModel', ['$parse', function ($parse) {
            return{
                restrict: 'A', link:function (scope, iElement, iAttrs) {
                    iElement.on('change', function (e)
                    {
                        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                    });
                }
            };

        }]);
})();