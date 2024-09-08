export default function textToSpeech(text) {
  const speech = new SpeechSynthesisUtterance()
  speech.text = text
  speech.volume = 1
  speech.rate = 0.8
  speech.pitch = 1

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      speech.voice = voices[2] // Chọn giọng nói mong muốn
      window.speechSynthesis.speak(speech)
    }
  }

  // chờ tải xong danh sách giọng nói
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', setVoice)
  } else {
    setVoice()
  }
}