// include api.js
// const api = requierd('./api.js'); 

const url= "http://localhost:11434/api/chat"
var data = {
    model: "phi3",
    messages: [
        {
            role: "user",
            content: "hi",
        },
    ],
    stream: true,
};

var global_id = Number(0);
var msg ;


function sent_f(who,msg=""){
    console.log("app.js/sent_f");
    if(global_id>0){
        var ID = document.getElementById("chat_b").lastElementChild.id; //name or ID =0
    }
    else{
        var ID = 0;
    }
    ID = Number(ID) + 1;
    global_id = ID;
   
    if (document.getElementById("message").value || msg){
        if(!msg){
            msg = document.getElementById("message").value;
        }
        
        var chat = document.getElementById("chat_b");
        console.log(msg);
        chat.innerHTML +=` 
            <div class="msg ${who}" id="${ID}">
                <div class="msg_c">    
                    <p id="p_${ID}">${msg}</p>
                </div>
            </div>
        `
        ID = Number(ID) + 1;
        global_id = ID;
        chat.innerHTML +=` 
            <div class="msg bot" id="${ID}">
                <div class="msg_c">    
                    <p id="p_${ID}"></p>
                </div>
            </div>
        `
        data.messages.content = msg;
        console.log(data);
        render_msg(data,ID);
        console.log(ID);
    }
   
}

function insrttml(id,word){
    console.log("app.js/insrttml");
    var chat = document.getElementById("p_"+id);
    chat.textContent += word;

}

async function postDataMul(url = "", data = {}) {
    console.log("app.js/postDataMul");
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response; // Return the response object itself
    } catch (error) {
        console.error(error);
    }
}

async function getResponse(response, callback) {
    console.log("app.js/getResponse");

    const reader = response.body.getReader();
    

    let partialLine = '';

    while (true) {
      const { done, value } = await reader.read();
   

      if (done) {
        break;
      }
      // Decode the received value and split by lines
      const textChunk = new TextDecoder().decode(value);
    
      const lines = (partialLine + textChunk).split('\n');

      
      partialLine = lines.pop(); // The last line might be incomplete

      for (const line of lines) {
        console.log(line);
        if (line.trim() === '') continue;
        const parsedResponse = JSON.parse(line); // convert json txt to objects
        //! console.log(parsedResponse.message.content)
        callback(parsedResponse); // Process each response word
      }
    }
}

async function render_msg(data,ID){
    
    postDataMul(url,data).then(response => {
        getResponse(response, (response) => {

            // console.log(response.message.content);
            insrttml(ID,response.message.content);
            // process.stdout.write(response.message.content);
        
        });
    });
}