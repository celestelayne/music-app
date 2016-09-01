$( document ).ready(function() {

console.log("Sanity Check: JS is working!");

// Structure
// ----------------------------------------------
	var searchForm = document.querySelector('form');
	var button = document.querySelector('button');
	var input = document.querySelector('input');
	var musicList = document.getElementById('music-list');

	// Event Handlers
	// ----------------------------------------------
	button.addEventListener('click', getMusicData);
	searchForm.addEventListener('submit', getMusicData);

	// Functions
	// ----------------------------------------------
	function getMusicData(event){
		event.preventDefault();
		var inputValue = input.value;
		var spotifySearchEndpoint = 'https://api.spotify.com/v1/search?q=';
		var url = spotifySearchEndpoint + inputValue + '&type=artist,track' + '&limit=10';
		// Make ajax request
		$.ajax({
			method: 'GET',
			url: url,
			dataType: 'json',
			success: cleanMusicData,
			error: function(){
	      console.log('sad face');
	    }
	    // addPanels(artist);
		});

		// clear the input field
		input.value = "";
		// clear the results
		musicList.innerHTML = "";
	};

	function cleanMusicData(data){
		console.log(data);

		data.artists.items.forEach(function(artist){
			var artist_name = artist.name;
			var followers = artist.followers.total;
			});

		data.tracks.items.forEach(function(track){
				var track_name = track.name;
				var album_name = track.album.name;
				var artist_name = track.artists[0].name;
				// console.log(track_name);
				var preview = track.preview_url;
				var track_length = track.duration_ms;
				var image = track.album.images[0]['url'];
		});
		data.artists.items.forEach(createMusicItem);
		data.tracks.items.forEach(createMusicItem);
	};

	function createMusicItem(music){
		console.log(music);
	// 	var div = document.createElement('div');
	// 	var artist = document.createElement("p");

	// 	div.classList.add('panel');

	// 	artist.textContent = artist.name;

	// 	musicList.appendChild(div);
	// 	div.appendChild(artist);
	}

});

// Note: Kept getting a 'bad error' because i was trying to fetch
// information for a non-existent track; so put in dummy input value to start