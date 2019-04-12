'use strict';
/* Classes and Variables */
var Articles = [];
var didFetchArticlesFromDatabase = false;

/* Database Functions */
function addToDatabase(article) {
    return new Promise(function (resolve, reject) {
        Database.retrieve('Articles', 'guid', article.guid).then(function (articles) {
            if (articles.length === 1) return resolve(article);
            Database.add('Articles', article).then(function () {
                resolve(article);
            });
        });
    });
}
function clearDatabase() {
    function removeArticle(guid) {
        Database.remove('Articles', false, 'guid', guid);
    }
    Database.retrieve('Articles', 'pubDate').then(function (articlesFromDatabase) {
        Articles = sortedArticles(articlesFromDatabase);
        var guidsOfArticlesToDelete = [];
        for (var i = 10; i < Articles.length; i++) {
            guidsOfArticlesToDelete.push(Articles[i].guid);
        }
        return Promise.resolve(guidsOfArticlesToDelete);
    }).then(function (guids) {
        guids.map(function (guid) {
            return removeArticle(guid);
        });
    });
}

/* Getting Articles, Updating in Background, etc */
function checkForNewArticles() {
	function isNewArticle(article) {
        Articles.find(function (oldArticle) {
            if (oldArticle.title === article.title) return false;
            return true;
        });
    }
    var newArticles = [];
    return new Promise(function (resolve, reject) {
        fetchArticles(true).then(function (articles) {
            console.log(articles);
            articles.forEach(function (article) {
                if (isNewArticle(article)) newArticles.push(article);
            });
            resolve(newArticles);
        }).catch(function (err) {
            return reject(err);
        });
    });
}
function updateArticlesInBackground() {
    //console.log("updateArticlesInBackground");
    checkForNewArticles().then(function (newArticles) {
        console.log(newArticles);
        Articles.unshift(newArticles);
        clearDatabase();
    });
}
function displayArticles(articles) {
    var html = MyApp.templates.excerpt({ items: articles });
    document.getElementById('excerpts').innerHTML = html;
}

/* Start */
if ('serviceWorker' in navigator) {
	Database.retrieve('Articles').then(function (articlesFromDatabase) {
        if (articlesFromDatabase.length == 0) return fetchArticles(true);
        didFetchArticlesFromDatabase = true;
        return Promise.resolve(articlesFromDatabase);
    }).then(function (articles) {
        Articles = sortedArticles(articles);
        displayArticles(Articles);
        return Promise.resolve();
    }).then(function () {
        if (didFetchArticlesFromDatabase) updateArticlesInBackground();
    });
} else {

    fetchArticles(false).then(function (articles) {
        Articles = sortedArticles(articles);
        displayArticles(Articles);
        return Promise.resolve();
    }).then(function () {
        var bookmarkButtons = Array.from(document.querySelectorAll('.btn-bookmark'));
        bookmarkButtons.map(function (button) {
            button.disabled = true;
        });
    });
}

function greet(){
	alert("greetings");
	var thehours = new Date().getHours();
	var themessage;
	var morning = ('Good morning &#x1F601 &#x270B');
	var afternoon = ('Good afternoon &#x1F601 &#x270B');
	var evening = ('Good evening &#x1F601 &#x270B');
	
	if (thehours >= 0 && thehours < 12) {
				themessage = morning; 
	} else if (thehours >= 12 && thehours < 17) {
		themessage = afternoon;
	} else if (thehours >= 17 && thehours < 24) {
		themessage = evening;
	}
	
	var responseContainer = document.createElement('DIV');
	responseContainer.className="greeting";
	responseContainer.innerHTML =themessage;
	$("#excerpts").append(responseContainer);
	setTimeout(function() {
		var responseContainer = document.createElement('DIV');
		responseContainer.className="greeting line-two";
		responseContainer.innerHTML="Here’s your daily dose of good news from India";
		$("#excerpts").append(responseContainer);
	}, 1000);
	return false;
}

function goodbye(){
	var responseContainer = document.createElement('DIV');
	responseContainer.className="reply no-new-news";
	responseContainer.innerHTML ="In other news";
	$("#excerpts").append(responseContainer);
	setTimeout(function() {
		var responseContainer = document.createElement('DIV');
		responseContainer.className="greeting caughtup";
		responseContainer.innerHTML="You're all caught up! Check back later. &#x1F44B";
		$("#excerpts").append(responseContainer);
		var target = document.body.scrollHeight;
		$('html,body').animate({scrollTop:target}, 1000);
	}, 1000);
}

var curr=1;
$(window).on('load', function(){
	setTimeout(function() {
		$(".vertically").hide();
		$("#excerpt-"+curr).show();
		$("#excerpt-"+curr+" .excerpt__header").show();
		$(".options").show();
	}, 1000);
	$.each($('.excerpt'), function(ind) {
		$(this).attr('id', 'excerpt-' + parseInt(ind + 1));
	});
	console.log("Hi Onload");
	dataFromStorage();
});

$("#readmore").click(function(){
	setTimeout(function() {
			$("#excerpt-"+curr+" .spinner__content").fadeIn(100).delay(800).fadeOut(100);
	}, 1000);
	setTimeout(function() { 
		$("#excerpt-"+curr+" .excerpt__content").show();
		var target = document.body.scrollHeight;
		$('html,body').animate({scrollTop:target}, 1000);
	}, 2000);
	$("#excerpt-"+curr+" .reply.read-more").show();
	$("#readmore").hide();
	var target = document.body.scrollHeight;
	$('html,body').animate({scrollTop:target}, 1000);
	getJson();
	return false;
});


function getJson(){
	var someData = [];
	$('#excerpts .excerpt').each(function () {
		var hasstyle = $(this).attr('style');
		if(hasstyle){
			someData.push({"id":$(this).attr("id"), "content":$(this).html()});
		}
	});
	console.log('-------------------------------------------', someData);
	localStorage.setItem('jsonData', JSON.stringify(someData));
}

function dataFromStorage(){
	if (typeof (Storage) !== "undefined") {
		var sdata = localStorage.getItem('jsonData').replace(/(\r\n|\n|\r)/gm, "");
		var obj = JSON.parse(sdata);
		console.log(sdata); 
		var i, j, x = "";
		for (i in obj) {
			x += "<article class='excerpt' style='display: inline-block;'>" + obj[i].content + "</article>";
		}
		document.getElementById("excerptsStorage").innerHTML = x;
	}
}

$("#nextnews").click(function(){
	curr++;
	if($("#excerpt-"+curr).length == 0) {
		setTimeout(function() {
			$(".options").hide();
		}, 1000);
		goodbye();
	}
	else {
		setTimeout(function() {
			$("#excerpt-"+curr+" .spinner__header").fadeIn(100).delay(800).fadeOut(100);
		}, 1000);
		setTimeout(function() { 
			$("#excerpt-"+curr+" .excerpt__header").show();
			var target = document.body.scrollHeight;
			$('html,body').animate({scrollTop:target}, 1000);
		}, 2000);
		$("#excerpt-"+curr+" .reply.new-news").show();
		$("#excerpt-"+curr).show();
		$("#readmore").show();
		var target = document.body.scrollHeight;
		$('html,body').animate({scrollTop:target}, 1000);
	}
	return false;
});