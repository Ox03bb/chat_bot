

const url= "http://localhost:11434/api/chat"
const data = {
    model: "phi3",
    messages: [
        {
            role: "user",
            content: "hi",
        },
    ],
    stream: true,
};


async function postDataMul(url = "", data = {}) {
    console.log("api.js/postDataMul");
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
    console.log("api.js/getResponse");

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
        if (line.trim() === '') continue;
        const parsedResponse = JSON.parse(line); // convert json txt to objects
        //! console.log(parsedResponse.message.content)
        callback(parsedResponse); // Process each response word
      }
    }
}

function insrttml(id,word){
    var chat = document.getElementById("1");
    chat.textContent += word;

}

// pass to this function all data



async function rrr(data){
    

    postDataMul(url,data).then(response => {
        getResponse(response, (response) => {

            // console.log(response.message.content);
            insrttml(1,response.message.content);
            // process.stdout.write(response.message.content);
        
        });
    });
}

// its run

