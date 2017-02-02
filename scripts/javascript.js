// @codekit-prepend "modernizr.js"
// @codekit-prepend "jquery-1.10.2.min.js"



var app = app || {

	init: function(){

		app.share_page();
		app.share_plate();
		app.shuffle_plates();
		app.change_to(app.all_plates[app.plates_index]);
		app.new_plate();
	},
	
	plates_index: 0,
	counter: 0,
	
	new_plate: function(){
		$(".lp-plate__arrow").on("click", function(){

			//Determine which direction in the array of plates we are going
			if ($(this).hasClass("lp-plate__arrow--left")){
				app.plates_index--;
			} else {
				app.plates_index++;
			}

			//Loop the end of the array to beginning and vice versa
			if (app.plates_index === app.all_plates.length){
				app.plates_index = 0;
			}
			if (app.plates_index === -1){
				app.plates_index = (app.all_plates.length - 1)
			}

			//Display plate at new index
			app.counter = 0;
			app.change_to(app.all_plates[app.plates_index]);

			//Update Omniture
			updateOmniture();
		});
	},
	
	change_to: function(chars){
		
		//Settings
		var char_cycles = 15; //how many nonsense letters it cycles through
		var char_cycle_length = 30; //length of each cycle in milliseconds
		
		//Hide/show characters to present proper number
		$(".lp-plate__letter").removeClass("is-hidden");
		for (var z = chars.length; z < 7; z++){
			$(".lp-plate__letter").eq(z).addClass("is-hidden");
		}
		
		//Cycle through the appropriate number of letters,
		//according to the settings above
		if (app.counter < char_cycles){
			setTimeout(function(){
					app.counter++;
					for (var x = 0; x < chars.length; x++){
						$(".lp-plate__letter").eq(x).text(app.all_characters[Math.floor((Math.random()*36))]);
					}
					app.change_to(chars);
			}, char_cycle_length);
		}
		
		//After cycling, assign the chosen characters
		else {
			chars = chars.toUpperCase();
			for (var y = 0; y < chars.length; y++){
				$(".lp-plate__letter").eq(y).text(chars.substring(y,y+1));
			}
		}
			
	},

	shuffle_plates: function(){

		app.all_plates = app.shuffle(app.all_plates);

	},

	shuffle: function(array){

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;

		}

		return array;

	},
	
	all_plates: ["C0CA1N3", "W1NO", "TOKE", "SLEEZY", "SAFESEX", "MRDOPE", "ISIS", "ACDC", "ALLAH", "ARYAN", "BAILME", "BEDWETR", "BLOOD", "CHUMP", "CIA", "CIA2U", "COCAINE", "COP", "CRIME", "DAAAMN", "DEALER", "DEPUTY", "DOWNLO", "DRUGS", "DUMMY", "EMS", "EXCON", "FBI", "FBICAR", "FEDCOP", "FIT", "FLAKE", "GOON", "GOVT", "HELL", "HEROIN", "IRS", "KILLBIL", "KILLER", "LIBIDO", "MAFIA", "MAYOR", "MURDER1", "NAACP", "OLDFART", "POL1C3", "RATATAT", "REEFER", "RIPOFF", "SCUM", "SENATE", "SEX", "STATE", "STONED", "STUD", "TASTY", "TAXI", "TEMP", "TOILET", "USGOVT", "USMAIL", "1812", "1DIOT"],
	all_characters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'],

	share_page: function(){

		$(".tophat-share-tools .icon-twitter").on("click", function(){

			var tweet = "The MVA has banned thousands of phrases for vanity plates. Check some out: "; //Tweet text
			var url = "http://data.baltimoresun.com/banned-license-plates/"; //Interactive URL

			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

		$(".tophat-share-tools .icon-facebook").on("click", function(){

			var picture = "http://data.baltimoresun.com/banned-license-plates/images/social.jpg"; //Picture URL
			var title = "Banned license plates"; //Post title
			var description = "The MVA has banned thousands of phrases for vanity plates."; //Post description
			var url = "http://data.baltimoresun.com/banned-license-plates/"; //Interactive URL

	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

	},

	share_plate: function(){

		$(".lp-social-tool--twitter").on("click", function(){

			var tweet = "%22"+app.all_plates[app.plates_index]+"%22 and other license plates are banned by the MVA. See more: "; //Tweet text
			var url = "http://data.baltimoresun.com/banned-license-plates/"; //Interactive URL

			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

		$(".lp-social-tool--facebook").on("click", function(){

			var picture = "http://data.baltimoresun.com/banned-license-plates/images/social.jpg"; //Picture URL
			var title = "Banned license plates"; //Post title
			var description = "\""+app.all_plates[app.plates_index]+"\" is among thousands of license plates banned by the MVA."; //Post description
			var url = "http://data.baltimoresun.com/banned-license-plates/"; //Interactive URL

	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

	}
	
}


$(document).ready(function(){

	app.init();

});
