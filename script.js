const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// set the typed text as a utterance for speech synthesis
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
	// get voices from the object and add it to our voices array
	voices = this.getVoices();
	// map the array and add voices as options
	voicesDropdown.innerHTML = voices
		.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})`)
		.join('');	
}

function setVoice() {
	// find the voice whose name matches the options value
	msg.voice = voices.find(voice => voice.name === this.value);
}

function toggle(startOver = true) {
	// stop speaking
	speechSynthesis.cancel();
	// toggle speaking
	if (startOver) {
		speechSynthesis.speak(msg);
	}
}

function setOption() {
	// assign input value to appropriate input via its name attribute
	msg[this.name] = this.value;
}

// voicechanged is the event we're looking for
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
// or ('click', toggle.bind(null, false))

