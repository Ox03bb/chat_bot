// include api.js
const app = requierd('./api.js'); 


function sent_f(who,msg=""){
   
    if (document.getElementById("message").value || msg){
        if(!msg){
            var msg = document.getElementById("message").value;
        }
        
        var chat = document.getElementById("chat_b");
        console.log(msg);
        chat.innerHTML +=` 
            <div class="msg" id="${who}">
                <div class="msg_c">    
                    <p>${msg}</p>
                </div>
            </div>
        `
    }
   
}