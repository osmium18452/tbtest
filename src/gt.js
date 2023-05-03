import axios from 'axios';
import { message } from 'antd';

// export const HOST = 'http://10.177.46.192:8000/server/';
export const HOST = 'http://ys.nuclearsilo.me:8080/';

export function fetch(option = {}) {
    const { url, ...rest } = option;
    return axios({
        url: `${HOST}${url}`,
        withCredentials: true,
        ...rest,
    }).then((res) => {
        const { status, data } = res;
        if (status !== 200) {
            message.error('服务器错误，请重试');
            return Promise.reject(new Error('服务器错误，请重试'));
        } else {
            return data;
        }
    });
}

export function get(url) {
    return fetch({
        url,
        method: 'get',
    });
}

export function post(url, data) {
    return fetch({
        url,
        data,
        method: 'post',
    });
}
