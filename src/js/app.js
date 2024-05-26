// include api.js
// const app = requierd('./api.js'); 

const url= "http://localhost:11434/api/chat"

var msg ;

function sent_f(who,msg=""){
    if(document.getElementById("chat_b").lastElementChild.id){
        var ID = document.getElementById("chat_b").lastElementChild.id; //name or ID =0
    }
    else{
        var ID = 0;
    }
    ID = Number(ID) + 1;
   
    if (document.getElementById("message").value || msg){
        if(!msg){
            msg = document.getElementById("message").value;
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
        req(msg,ID);
    }
   
}

function req(ms,id){
    var div = document.getElementById(id);
    const data = {
        model: "phi3",
        messages: [
            {
                role: "user",
                content: "hi",
            },
        ],
        stream: false,
    };

  
    
}