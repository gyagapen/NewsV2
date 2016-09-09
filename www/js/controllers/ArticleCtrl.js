
app.controller('ArticleCtrl', function ($scope, $stateParams, newsConfig, htmlService, $q) {
    $scope.newsId = $stateParams["newsId"];
    $scope.submenuId = $stateParams["submenuId"];
    $scope.newsItem = retrieveArrayItemFromId(newsConfig.newsList, $scope.newsId);
    $scope.articleListItem = retrieveArrayItemFromId($scope.newsItem.subList, $scope.submenuId);

    htmlService.parseLexpressRssFeed($scope.articleListItem.url).then(function (articles) {
        $scope.articleList = articles;

        //populate images
        for (var i = 0; i < $scope.articleList.length; i++)
        {
            var curArticleLink = $scope.articleList[i].link;
            var newsCode = $scope.newsItem.code;

            htmlService.getImageLink(curArticleLink, newsCode, i).then(function (response) {
                $scope.articleList[response.position].img = response.imgLink;
            });
        }


    });


});

