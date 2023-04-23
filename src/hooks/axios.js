import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test.ahmedali-dev.repl.co',
    // method: 'post'
});

export default instance;