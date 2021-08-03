const searchform = document.getElementById("search-form")
const searchformINput = searchform.querySelector("input")



const Srecognition = window.speechReacogniton || window.webkitSpeechRecognition

if (Srecognition) {
    console.log("Your Browser supports speech Recogniton");
    
    searchform.insertAdjacentHTML("beforeend", ' <button type="button"  id="btn1" ><i class="fas fa-microphone"></i></button>')
    const micBtn = searchform.querySelector("button")
    const micIcon = micBtn.querySelector("i")

    const recogniton  = new Srecognition();
 
    micBtn.addEventListener('click',micBtnClick)
    function micBtnClick(){
        if(micIcon.classList.contains("fa-microphone")){
        
          recogniton.start()
        }
        else{
           
            recogniton.stop()


        }
    }

    recogniton.addEventListener("start",startSpeechRecognition)

    function startSpeechRecognition(){
        
         micIcon.classList.remove("fa-microphone")
          micIcon.classList.add("fa-microphone-slash")
          searchformINput.focus()
          console.log("Start Recognition Active"); 
    }
    recogniton.addEventListener("end",endSpeechRecognition)

    function endSpeechRecognition(){ 
        micIcon.classList.remove("fa-microphone-slash")
        micIcon.classList.add("fa-microphone")
        searchformINput.focus()
        console.log("Speech Recognition Disconnect");
    }
    
recogniton.addEventListener("result",resultofSpeechRecognition)
function resultofSpeechRecognition(event){

    const transcript = event.results[0][0].transcript;
    searchformINput.value = transcript
  
  

}

} else {

    console.log("Your Browser does not support speeech Recognition");
}
