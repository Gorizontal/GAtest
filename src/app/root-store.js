import { makeAutoObservable, toJS } from "mobx";
import { api } from "../api/api";



export class RootStore {

    _tokenInstance = '';
    _idInstance = '';
    loader = false;
    error = false;
    userData = null;
    _isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
        this.api = api
    }

    confirmAuth = async () => {
            this.loader = true;
            this.userData = await this.api.getAccountSettings( this.idInstance, this.tokenInstance)
            if(this.userData !== undefined){
                this.updateAuth(true)
            } else {
                this.error = true;
                this.updateAuth(false)
            }

           this.loader = false;
    }

    updateTokenInstance = (tokenInstance) => {
        this._tokenInstance = tokenInstance;
        console.log(this._tokenInstance)
    }

    updateIdInstance = (idInstance) => {
        this._idInstance = idInstance;
        console.log(this._idInstance)
    }

    updateAuth = (auth) => {
        this._isAuthenticated = auth;
        console.log(this._isAuthenticated)
    }

    get tokenInstance () {
        return this._tokenInstance;
    }
 
    get idInstance () {
        return this._idInstance;
    }

    get isAuthenticated () {
        return this._isAuthenticated
    }
}