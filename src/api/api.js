class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    getAccountSettings = async (idInstance, apiTokenInstance) => {
        try {
           const res = await fetch(`${this._baseUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`, {
                method: "GET",
                headers: this.headers
            });
            const data = await res.json();
            return data
        } catch (error) {
            console.log(error);
            return undefined;
        }
        
      }

    getDataContact = async (idInstance, apiTokenInstance, chatId) => {
        const res = await fetch(`${this._baseUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ chatId: `${chatId}@c.us` })
        });
        const data = await res.json();
        return data;
    }

    sendMessage = async(idInstance, apiTokenInstance, chatId, message) => {
        const res = await fetch(`${this._baseUrl}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                chatId: chatId,
                message: message
            })
        });
        const data = await res.json();
        return data;
    }

     getMessage = async (idInstance, apiTokenInstance) => {
        const res = await fetch(`${this._baseUrl}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`, {
            method: "GET",
            headers: this.headers
        });
        const data = await res.json();
        return data;
    }

    deleteMessage = async (idInstance, apiTokenInstance, receiptId) => {
        const res = await fetch(`${this._baseUrl}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await res.json();
        return data;
    }
}

export const api = new Api({
    baseUrl: 'https://api.green-api.com',
    headers: { "content-type": "application/json" }
})

