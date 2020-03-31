import axios from "axios";
// import qs from "qs";
import router from "@/router";
import store from "@/store";
// import { Message } from "element-ui";

//http request 拦截器

//http response 拦截器


const get = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const post = function(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
};

export {axios,get,post};

