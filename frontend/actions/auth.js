import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';
import Router from 'next/router'


export const handleResponse= response =>{
    if(response.status===401){
    signout(()=>{
        Router.push({
            pathname: '/signin',
            query:{
                message:'Your session is experied,Please signin'
            }
        });
    })
}
else{
    return;
}
}


export const preSignup = user => {
    return fetch(`${API}/pre-register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signup = token => {
    return fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const signin = user => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
            return response.json();
    })
    .catch(err => console.log(err));
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success');
        })
        .catch(err => console.log(err));
};

//set cookie

export const setCookie=(key,value)=>{
    if(process.browser){
        cookie.set(key,value,{
            expires: 1
        });
    }
};

export const removeCookie=(key,value)=>{
    if(process.browser){
        cookie.remove(key,value,{
            expires: 1
        });
    }
};
//get cookie
export const getCookie= key => {
    if(process.browser){
       return cookie.get(key);
};
}

//local storage

export const setLocalStorage =(key,value) =>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value));
    }
}

export const removeLocalStorage =(key) =>{
    if(process.browser){
        localStorage.removeItem(key);
    }
}

//authentication
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const forgotPassword=email=>{
    return fetch(`${API}/forgotPassword`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
    .then(response => {
            return response.json();
    })
    .catch(err => console.log(err));

}

export const resetPassword = resetInfo => {
    return fetch(`${API}/resetPassword`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};