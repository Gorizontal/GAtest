import { makeAutoObservable, runInAction, toJS } from "mobx";
import { api } from "../api/api";



export class RootStore {

    _tokenInstance = '';
    _idInstance = '';
    _wid = '';
    loader = false;
    error = false;
    userData = null;
    _isAuthenticated = false;
    checked = false;
    userIMG = '';
    validNumber = null;
    usersDatas = [];
    label = ''
    imgInterlocutor = ''
    numberInterlocutor = ''
    messages = []
    _activeChatUser = {}
    errorInput = false
    loaderAddNumber = false
    userInformation = {}

    getMessages = []

    constructor() {
        makeAutoObservable(this);
        this.api = api;
        this.init();
    }

    init = async() => {
       this.loader = true; 
       const localSt = JSON.parse(localStorage.getItem('greenapi'));
       if(localSt){
        runInAction(()=>{
            this._idInstance = localSt.id;
            this._wid = localSt.wid;
            this._tokenInstance = localSt.token;
            this._isAuthenticated = true;
            this.userData = localSt;
            this.usersDatas = this.userData.usersDatas
        })
        try {
            const data = await api.getDataContact(localSt.id, localSt.token, localSt.wid.slice(0,11))
            runInAction(()=>{
                this.userIMG = data.avatar 
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.loader = false
        }

       } 
       this.loader = false
    }

    confirmAuth = async () => {
            this.loader = true;
            const req = await this.api.getAccountSettings( this.idInstance, this.tokenInstance);
            this.userData = req;
            
            if(this.userData !== undefined){
                if(this.checked){
                    localStorage.setItem('greenapi', JSON.stringify({
                        wid: req.wid,
                        id: this.idInstance,
                        token: this.tokenInstance,
                        usersDatas: []
                    }))
                };
                this._wid = req.wid
                const data = await api.getDataContact(this.idInstance, this.tokenInstance, this._wid.slice(0,11))
                runInAction(()=>{
                    this.userIMG = data.avatar 
                    this.error = false;
                })

                this.updateAuth(true);
            } else {
                this.error = true;
                this.updateAuth(false);
            }
           this.loader = false;
    }

    getDataOnNumber = async (numberPhone) => {
            this.loaderAddNumber = true;
            const res = await api.getDataContact(this.idInstance, this.tokenInstance, numberPhone)
            
            if(res){
                this.validNumber = true;
                const localSt = JSON.parse(localStorage.getItem('greenapi'));
                if(localSt){
                   localSt.usersDatas.push({...res, messages: []})
                   localStorage.setItem('greenapi', JSON.stringify(localSt))
                }
                this.usersDatas.push({...res, messages: []})
            } else {
                this.validNumber = false;
            }

            this.loaderAddNumber = false;
            console.log(res, this.validNumber, toJS(this.usersDatas));
       
    }
    
    updateActiveChatUser = (index) =>{
        this._activeChatUser = this.usersDatas[index];
        this.errorInput = false;
        console.log(toJS(this.userData))
    }

    updateLabel = (label)=>{
        this.label = label
        console.log('label', label)
    }

    updateTokenInstance = (tokenInstance) => {
        this._tokenInstance = tokenInstance;
    }

    updateIdInstance = (idInstance) => {
        this._idInstance = idInstance;
    }

    updateAuth = (auth) => {
        this._isAuthenticated = auth;
    }

    updateChecked = (checked)=>{
        this.checked = checked;
    }

    updateIMGinterlocutor=(urlImg)=>{
        this.imgInterlocutor = urlImg;
    }

    updateNUmberinterlocutor=(number)=>{
        console.log(number)
        this.numberInterlocutor = number;
    }

    sendMessage =async (message)=>{
        if(this._activeChatUser.chatId){
            this._activeChatUser.messages.push({message: message, send: true})
            this.errorInput = false
            const localSt = JSON.parse(localStorage.getItem('greenapi'));
            if(localSt){
                localStorage.setItem('greenapi', JSON.stringify({
                    wid: this._wid,
                    id: this.idInstance,
                    token: this.tokenInstance,
                    usersDatas: [...this.usersDatas]
                }))
            }
            await api.sendMessage(this.idInstance, this.tokenInstance, this._activeChatUser.chatId, message)
            return
        }
        this.errorInput = true      
    }

    getNoties = ()=>{
                
      setInterval( ()=>{
        api.getMessage(this.idInstance, this.tokenInstance)
            .then((data)=>{
                if(data && data.body.typeWebhook === 'incomingMessageReceived'){
                        this.usersDatas.map((user)=>{
                            if( user.chatId === data.body.senderData.chatId){
                                user.messages.push({
                                    message: data.body.messageData.textMessageData.textMessage,
                                    send: false
                                })
                            }

                            return user
                        })
                        console.log(toJS(this.usersDatas))
                        const localSt = JSON.parse(localStorage.getItem('greenapi'));
                        if(localSt){
                            localStorage.setItem('greenapi', JSON.stringify({
                                wid: this._wid,
                                id: this.idInstance,
                                token: this.tokenInstance,
                                usersDatas: [...this.usersDatas]
                            }))
                        }      
                }
                if(data){
                    api.deleteMessage(this.idInstance, this.tokenInstance, data.receiptId)
                }

               return data
            })

        },5000)
    }

    get tokenInstance () {
        return this._tokenInstance;
    }
 
    get idInstance () {
        return this._idInstance;
    }

    get isAuthenticated () {
        return this._isAuthenticated;
    }

    get wid () {
        return this._wid;
    }

    get activeChatUser () {
        return this._activeChatUser;
    }


}