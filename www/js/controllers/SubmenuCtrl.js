app.controller('SubmenuCtrl', function ($scope, $stateParams, newsConfig, $location) {
            $scope.newsId = $stateParams["newsId"];
            $scope.newsElement = retrieveArrayItemFromId(newsConfig.newsList, $scope.newsId);
            
            //check if there is any submenu else redirect to article list
            if($scope.newsElement.subList.length < 2)
            {
                $location.path('app/article_list/'+$scope.newsId+'/0');
            }

});