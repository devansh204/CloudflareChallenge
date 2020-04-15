addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	return fetch('https://cfw-takehome.developers.workers.dev/api/variants')
	.then(function (response) {
		return response.json();
	}).then(function (json) {

		var arr = json.variants;
		console.log(arr[1]);

		//add logic to select random values

		return fetch(arr[1])
			.then(response => response.text())
			.then(function (html) {
				return new Response(html, {headers: { 'content-type': 'text/html' }})
			});
	});

}