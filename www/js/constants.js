var lexpressCode = "LEX";
var ionNewsCode = "ION";
angular.module('news')

        .constant('newsConfig', {
            
            newsList: [
                {id: 0, code: lexpressCode, name: "Lexpress", subList:
                            [{id: 0, name: "Live", isRss: true, url: "http://www.lexpress.mu/rss.xml"},
                                {id: 1, name: "Actualites", isRss: true, url: "http://www.lexpress.mu/rss.xml"}]
                },
                {id: 1, name: "IonNews", code: ionNewsCode, subList:
                            [{id: 0, name: "Ion News", isRss: true, url: "http://ionnews.mu/feed/"}]}
            ],
            newsCode_Lexpress: lexpressCode,
            newsCode_IonNews: ionNewsCode


        })