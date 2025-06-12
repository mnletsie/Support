function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = cookie.substring(name.length + 1);
                    break;
                }
            }
        }
        return cookieValue;
    }
const csrftoken = getCookie('csrftoken');

document.getElementById("chat-icon").addEventListener("click", function () {
    document.getElementById("chat-input-container").classList.toggle("hidden");
});

document.getElementById("send-btn").addEventListener("click", function () {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    fetch(askUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            'X-CSRFToken': csrftoken },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<p><strong>Assistant:</strong> ${data.response}</p>`;
    })
    .catch(error => console.error("Error:", error));

    document.getElementById("user-input").value = "";
});