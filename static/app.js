class Chatbox{
    constructor(){
        this.args={
            openButton: document.querySelector('.chatbox__button'),
            Chatbox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state=false;
        this.messages=[]
    }

    display(){
        const {openButton,Chatbox,sendButton}=this.args;

        openButton.addEventListener('click',()=> this.toggleState(Chatbox))
        openButton.addEventListener('click',()=> this.onSendButton(Chatbox))

        const node=Chatbox.querySelector('input');
        node.addEventListener("keyup",({key})=>{
            if(key=="Enter"){
                this.onSendButton(Chatbox)
            }
        })
    }
    toggleState(chatbox){
        this.state=!this.state;
        if(this.state){
            chatbox.classList.add('chatbox--active')
        }
        else{
            chatbox.classList.remove('chatbox--active')
        }
    }
    onSendButton(chatbox) {
        // Select the input field
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
    
        // Prevent sending if the input is empty
        if (text1 === "") {
            return;
        }
    
        // Add the user's message to the message list
        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
    
        // Update the chat UI with the user's message
        this.updateChatText(chatbox);
    
        // Send the message to the server
        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),  // Correct syntax for JSON body
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'  // Ensure cross-origin requests are allowed
        })
        .then(r => r.json())  // Parse the response as JSON
        .then(r => {
            // Process the server's response
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            
            // Update the chat UI with the bot's response
            this.updateChatText(chatbox);
    
            // Clear the input field
            textField.value = '';
        })
        .catch((error) => {
            // Log any errors and clear the input field
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }
    updateChatText(chatbox) {
        var html = '';
    
        // Iterate through the reversed messages
        this.messages.slice().reverse().forEach(function(item, index) {
    
            // Check if the message is from "Sam"
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                // If not from "Sam", it's from the operator (chatbot)
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
    
        });
    
        // Find the chatbox element where the messages will be displayed
        const chatmessage = chatbox.querySelector('.chatbox__messages');
    
        // Update the inner HTML of the chatbox with the messages
        chatmessage.innerHTML = html;
    }

    
    

}
const chatbox= new Chatbox;
chatbox.display();