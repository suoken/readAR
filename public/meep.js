/* Returns a string 'gggggr' representing the colours of the first several words in target
   speech: String
   target: String
*/

//const lrs = require('./public/speech_to_text')

STORY_IND = 0

function find_word_colors(speech, target) {
	a1 = speech.toLowerCase().replace(/^\s+|\s+$/g, '').split(' ')
    a2 = target.replace(/[^a-zA-Z ]/g, "").replace(/^\s+|\s+$/g, '').toLowerCase().split(' ')
    console.log(a1,a2)

    // If nothing matches we assume there was some extra 
	//. noise at the start of the audio file
	//while (a1.length > 0 && !(a1[0] === a2[0])) a1.shift()

	L = a1.length, i = 0
	while(i<L && a1[i] === a2[i]) i++

	///if (i==L) return 'g'.repeat(i)
	///return 'g'.repeat(i) + 'r';
    return i
}

function next_sentence() {
	line = ["He went up to a dragon and said: “Dragon, would you be my friend?”",
	"The dragon replied, “No! I’m going to eat you!”",
	"the lost puppy went along, he came across a fox.",
  "He went up to the fox and said: “Fox, will you be my friend?”",  
  "The fox said angrily: “Friend? You look disgusting and old.”",
  "The puppy hurried along disappointedly. He curled up into a ball and weeped.",
   "Out of nowhere, a soft voice woke up the puppy: “Are you okay?” He looked up, “No, I just wanted a friend who likes me for who I am.” </p>",
  "“Come with me, I will be your friend.” said the Princess.",
  "And they lived happily ever after."][STORY_IND]
  STORY_IND += 1
  return line
}

console.log("Is this thing on???")

function add2page(content) {
	console.log("CONTENT?"+ content)
	if (content != "" && content != null) {
		console.log('Got a response from the SERV-R')
		console.log(content)

		var target = document.getElementById('target-text').innerHTML
		green_text = document.getElementById('tgreen').innerHTML
		if (green_text != "") {
			gw = green_text.split(' ').length
			console.log(gw)
			target = target.split(' ').slice(gw).join(' ')
			console.log(target)}

		i = find_word_colors(content,target)
		// Dedupe
		if ((document.getElementById('tgreen').textContent.toString()).includes(content)) return
		document.getElementById('tgreen').textContent += content.split(' ').slice(0,i+1).join(' ')
		document.getElementById('tred').innerHTML = content.split(' ').slice(i).join(' ')

		if ((document.getElementById('tgreen').innerHTML).split(' ').length >= 
			document.getElementById('target-text').innerHTML.split(' ').length) {
			startup('public/img/dragon.png')
			// Bring in the next line of the story
		    document.getElementById('target-text').innerHTML = next_sentence()
		    document.getElementById('tgreen').textContent = ""
		    document.getElementById('tred').innerHTML = ""}
	}
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

var img = document.createElement("img"); 

function startup(img_src) { 
    img.src = img_src; 
    console.log("loaded image: " + img_src)


    window.onload = function() {
      //document.getElementById('user-input').innerHTML = "answer is:"
      //elem.addEventListener('talk', function (e) { console.log(e.detail.results) }, false);
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      setTimeout(function() {
        video.pause(); 
      }, 100000);

      // var tracker = new tracking.LandmarksTracker();
      var tracker = new tracking.ObjectTracker('face'); 

      tracker.setInitialScale(4.7);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {

        context.clearRect(0,0,canvas.width, canvas.height);

        // if(!event.data) return;

          event.data.forEach(function(rect) {
            // context.strokeStyle = '#a64ceb';
            // context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            // context.font = '11px Helvetica';
            // context.fillStyle = "#fff";
            // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            context.drawImage(img, rect.x, rect.y - 150, rect.width * 1.1, rect.height * 2); 
          });

          // event.data.landmarks.forEach(function(landmarks) {
          //   for(var l in landmarks){
          //     context.beginPath();
          //     context.fillStyle = "#fff"
          //     context.arc(landmarks[l][0],landmarks[l][1],1,0,2*Math.PI);
          //     context.fill();
          //   }
          // });

      });

      // var gui = new dat.GUI();
      // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01).listen();
      // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1).listen();
      // gui.add(tracker, 'stepSize', 1, 5).step(0.1).listen();

    };
}

startup('public/img/dog.png')
hackity_hack()


