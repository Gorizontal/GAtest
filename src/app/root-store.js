import { makeAutoObservable, runInAction, toJS } from "mobx";
import { api } from "../api/api";



export class RootStore {

    _tokenInstance = '42c712e798e74c66b78aadb945359ca96734e4c7969e4e80af';
    _idInstance = '1101823652';
    _wid = '';
    loader = false;
    error = false;
    userData = null;
    _isAuthenticated = false;
    checked = false;
    userIMG = '';
    validNumber = null;

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
                        user: []
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
            const res = await api.getDataContact(this.idInstance, this.tokenInstance, numberPhone)
            
            if(res){
                this.validNumber = true;
                const localSt = JSON.parse(localStorage.getItem('greenapi'));
                if(localSt){
                    localSt.user.push({...res, messages: []})
                    localStorage.setItem('greenapi', JSON.stringify(localSt))
                }
            } else {
                this.validNumber = false;
            }
            
            console.log(res, this.validNumber);
       
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

}