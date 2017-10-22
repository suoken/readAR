/* Returns a string 'gggggr' representing the colours of the first several words in target
   speech: String
   target: String
*/

//const lrs = require('./public/speech_to_text')

function find_word_colors(speech, target) {
	a1 = speech.toLowerCase().split(' ')
    a2 = target.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
    console.log(a1,a2)

    // If nothing matches we assume there was some extra 
	//. noise at the start of the audio file
	while (a1.length > 0 && !(a1[0] === a2[0])) a1.shift()

	L = a1.length, i = 0
	while(i<L && a1[i] === a2[i]) i++

	///if (i==L) return 'g'.repeat(i)
	///return 'g'.repeat(i) + 'r';
    return i
}

console.log("Is this thing on???")

function add2page(content) {
	//content = hackity_hack()
	console.log("CONTENT?"+ content)
	if (content != "" && content != null) {
		console.log('Got a response from the SERV-R')
		console.log(content)

		target = document.getElementById('target-text').innerHTML
		console.log(target)
		i = find_word_colors(content,target)
		document.getElementById('tgreen').innerHTML = content.split(' ').slice(0,i).join(' ')
		document.getElementById('tred').innerHTML = content.split(' ').slice(i).join(' ')
	}

	setTimeout(add2page,5000)
}

function hackity_hack() {
	url = 'http://localhost:3000/text'
	fetch(url).then(function(response) {
		if (response.status !== 200) {
			console.log("fuck you have error "); 
			return
		}; 
		
		response.json().then(function(data){ 
			console.log(data.transcription); 
			add2page(data.transcription)
			setTimeout(hackity_hack,5000)
		}); 
	}).catch(function(err){
		console.log(err); 
	}); 

}

hackity_hack()


