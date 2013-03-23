var fakeElement = {};
fakeElement.constanants = 'b c d f g k l m n p q r s t v x z'.split(' ');
fakeElement.vowels = 'a e i o u y'.split(' ');
fakeElement.categories = 'accounting programs promotion'.split(' ');
fakeElement.suffices = 'on ium ogen'.split(' ');
fakeElement.titles = 'Aliquam tempor, Fermentum commodo, Ante Elementum, Turpis mauris dapibus, Fermentum vel urna, Nulla porttitor faucibus'.split(',');

fakeElement.texts1 = 'Quisque nisi urna, scelerisque non hendrerit in, sollicitudin ac lacus. Duis gravidat scelerisque justo ac auctor ut et mauris egs quis elit lobortis tristique. Fusce eget vehicula, nibh sed pulvinar dictum, lectus eros consectetur elit, vitae porttitor. ..Urna massa quis nunc. In blandit libero pharetra mauris ullamcorper sed ornares massa rhoncus. Morbi lacus dolor emcorpet vel cursus ut, pulvinar eget nibh titur ultricies consectetur felis id auctor. Praesent sit amet feugiat magna. Maecenas facilisis, elit et consectetur lobortis, augue sem ullamcorper. ..Duis ut scelerisque etmetus Nam facilisis mattis elit, ut commodo ante eleifend in. Ut sit amet congue urna nullam egestaseit bibendum varius tellus pulvinar blandit. Ut fermentum facilisis libero, non molestie diam interdum non. Pellentesque elit quamets, elementum eu posuere non, faucibus id urna sendisse potenti. In blandit libero pharetra mauris ullamcorper sed ornare massa rhoncus. Morbi lacus dolor emcorpet.'.split('..');
fakeElement.texts2 = 'Cursus sodales mattis.. Morbi eros augue, viverra nec blandit eget lore vitae vestibul.. Hendrerit eget nisi. Lorem ipsum!'.split('..');

fakeElement.images = 'portfolio1 portfolio2 portfolio3 portfolio4 portfolio5 portfolio6 portfolio7 portfolio8 portfolio9 portfolio10 portfolio11 portfolio12'.split(' ');
fakeElement.type = 'post_type_video post_type_image'.split(' ');
fakeElement.getRandom = function(property) {
	var values = fakeElement[property];
	return values[ Math.floor(Math.random() * values.length)];
};
fakeElement.create = function(count) {
	var category = fakeElement.getRandom('categories');
	image = fakeElement.getRandom('images');
	title = fakeElement.getRandom('titles');
	text1 = fakeElement.getRandom('texts1');
	text2 = fakeElement.getRandom('texts2');
	posttype = fakeElement.getRandom('type');
	
	category = fakeElement.getRandom('categories');
	className = 'element ' + category;
	
	if (count == '1') {
		return '<div data-category="' + category + '" class="' + category + ' element row"><div class="filter_img"><a href="portfolio_post1.html" class="ico_link"><img src="img/portfolio/'+ image +'.jpg" alt="" width="460" height="297"></a></div><div class="span1-2 portfolio_dscr"><h5>'+ title +'</h5><p>'+ text1 +' <a href="portfolio_post.html">Read more...</a></p></div></div>';
	} else {
		return '<div data-category="' + category + '" class="' + category + ' element row"><div class="filter_img"><a href="portfolio_post1.html" class="ico_link"><img src="img/portfolio/'+ image +'.jpg" alt=""></a><div class="portfolio_dscr"><span class="post_type '+ posttype +'"></span>'+text2+'</div></div></div>';
	}	
};
fakeElement.getGroup = function(count) {
	var i = Math.ceil(count), newEls = '';
	while (i--) {
		newEls += fakeElement.create(count);
	}
	return newEls;
};

