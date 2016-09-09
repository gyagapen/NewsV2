app.factory('htmlService', function ($http, newsConfig) {
    var articles = [];
    var currentImgLink = {imgLink: "", position: -1};
    var htmlContentObject = {title: "", content: "", img: ""};

    return {
        parseLexpressRssFeed: function (url) {
            return $http.get(url).then(function (response) {

                $(response.data).find("item").each(function () { // or "item" or whatever suits your feed
                    var el = $(this);
                    articles.push({
                        title: el.find("title").text(),
                        date: el.find("pubDate").text(),
                        desc: el.find("description").text(),
                        link: el.find("guid").text()
                    });


                });


                return articles;
            });
        },
        parseExpressPage: function (url) {
            return $http.get(url).then(function (response) {

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlContent, 'text/html');
                var title = doc.querySelectorAll('h1')[0].innerHTML;
                var htmlContent = doc.querySelectorAll('div.article-content')[0].innerHTML;
                var img = doc.querySelectorAll('div.main-image-wrapper img')[0].attributes.src.value;

                content = {title: title, content: htmlContent, img: img};
                return content;

            });
        },
        getImageLink: function (url, newsCode, position) {
            return $http.get(url).then(function (response) {
                currentImgLink.position = position;

                var parser = new DOMParser();
                if (newsCode === newsConfig.newsCode_Lexpress)
                {
                    var doc = parser.parseFromString(response.data, 'text/html');
                    currentImgLink.imgLink = doc.querySelectorAll('div.main-image-wrapper img')[0].attributes.src.value;
                }
                else if (newsCode === newsConfig.newsCode_IonNews)
                {
                    var doc = parser.parseFromString(response.data, 'text/html');
                    currentImgLink.imgLink = doc.querySelectorAll('div.image-post img')[0].attributes.src.value;
                }


                return currentImgLink;
            });

        }

    }
});



var parser = new DOMParser();

var url = "http://defimedia.info/categorie/actualites";
//getDefiMediaTitle(url);

url = "http://www.lexpress.mu/rss.xml";
//parseLexpressRssFeed(url);

url = "http://www.lexpress.mu/article/288864/cas-suspects-fievre-aphteuse-lacces-interdit-socovia";
//parseExpressPage(url);

function getDefiMediaTitle(url)
{
    var articles = [];

    //fetch the http content
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    if (req.status == 200)
    {
        var htmlContent = req.responseText;


        var doc = parser.parseFromString(htmlContent, 'text/html');
        var articleAnchors = doc.querySelectorAll('article:not([class="entry"])');

        for (i = 0; i < articleAnchors.length; i++)
        {
            var title = articleAnchors[i].querySelectorAll('a')[1].innerHTML;
            var link = articleAnchors[i].querySelectorAll('a')[1].attributes.href.value;
            var img = articleAnchors[i].querySelectorAll('img.img-thumbnail')[1].attributes.src.value;

            articles[i] = {
                title: title,
                date: "",
                desc: "",
                link: link,
                img: img
            };

        }


    }

    return articles;
}

function parseLexpressRssFeed(url)
{

    var articles = [];
    var articleCounter = 0;

    $.get(url, function (data) {
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);

            articles[articleCounter] = {
                title: el.find("title").text(),
                date: el.find("pubDate").text(),
                desc: el.find("description").text(),
                link: el.find("link").text()
            };

            console.log("processed " + articleCounter);
            articleCounter++;


        });
        console.log("counter is " + articleCounter);
        articles["size"] = articleCounter;


    });

    return articles;
}



function parseExpressPage(url)
{
    var title = "";
    var htmlContent = "";
    var img = "";

    //fetch the http content
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    if (req.status == 200)
    {
        var htmlContent = req.responseText;


        var doc = parser.parseFromString(htmlContent, 'text/html');
        title = doc.querySelectorAll('h1')[0].innerHTML;
        htmlContent = doc.querySelectorAll('div.article-content')[0].innerHTML;
        img = doc.querySelectorAll('div.main-image-wrapper img')[0].attributes.src.value;

    }

    var content = {title: title, content: htmlContent, img: img};
    return content;
}



