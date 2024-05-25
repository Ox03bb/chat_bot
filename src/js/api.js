
const url= "http://localhost:11434/api/chat"
const data = {
    model: "phi3",
    messages: [
        {
            role: "user",
            content: "how are you ??",
        },
    ],
    stream: true,
};


async function postData(url = "", data = {}) {
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
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

async function postDataMul(url = "", data = {}) {
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
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getResponse(response, callback) {
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
        const parsedResponse = JSON.parse(line);
        callback(parsedResponse); // Process each response word
      }
    }

}


async function postDataMul(url = "", data = {}) {
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

// getResponse(postDataMul(url, data), (response) => {
//     console.log(response);
// });
var chat = document.getElementById("chat_b");


postDataMul(url,data).then(response => {
    getResponse(response, (response) => {
        
        process.stdout.write(response.message.content);
       
    });
});

