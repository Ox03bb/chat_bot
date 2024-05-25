// include api.js
const app = requierd('./api.js'); 



function sent_f(who,msg=""){
    var ID = document.getElementById("chat_b").lastElementChild.id; //name or ID =0
    ID = Number(ID) + 1;
   
    if (document.getElementById("message").value || msg){
        if(!msg){
            var msg = document.getElementById("message").value;
        }
        
        var chat = document.getElementById("chat_b");
        console.log(msg);
        chat.innerHTML +=` 
            <div class="msg ${who}" id="${ID}">
                <div class="msg_c">    
                    <p>${msg}</p>
                </div>
            </div>
        `
        console.log(ID);
        

    }
   
}