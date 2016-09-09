app.controller('ArticleViewCtrl', function ($scope, $stateParams, newsConfig, htmlService) {
            
            var url = $stateParams["url"];
            
           //retrieving  article content
           var articleContent = parseExpressPage(url);
           $scope.content = articleContent.content;
           $scope.title = articleContent.title;
           
           console.log($scope.content);

});