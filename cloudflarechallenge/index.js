addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const data = { username: 'example' };

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	return fetch('https://cfw-takehome.developers.workers.dev/api/variants',{
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	  }
	}).then(function (response) {
		return response.json();
	}).then(function (json) {

		var arr = json.variants;
		// 50/50 split 
		var url = Math.random() < 0.5 ? arr[1] : arr[0] 

		return fetch(url)
			.then(response => response.text())
			.then(function (html) {
				if (url == "https://cfw-takehome.developers.workers.dev/variants/1") {
					html = html.replace('Variant 1', "This is a new title")
					html = html.replace('Variant 1', "Coding challenge completed.")
					html = html.replace("This is variant one of the take home project!","Hacked Variation 1")
					html = html.replace('href="https://cloudflare.com"', 'href="https://linkedin.com/in/dev204"')
					html = html.replace('Return to cloudflare.com', "Open my Linkedin Profile!")
					return new Response(html, {headers: { 'content-type': 'text/html' }});;
				}
				else {
					html = html.replace(new RegExp('Variant 2'), "This is a new title")
					html = html.replace('Variant 2', "Coding challenge completed.")
					html = html.replace("This is variant two of the take home project!","Hacked Variation 2")
					html = html.replace('href="https://cloudflare.com"', 'href="https://linkedin.com/in/dev204"')
					html = html.replace('Return to cloudflare.com', "Open my Linkedin Profile!")
					return new Response(html, {headers: { 'content-type': 'text/html' }});;
				}
			});
	});

}

