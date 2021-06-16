import Axios from "axios";

const api = Axios.create({
    baseURL:"https://www.googleapis.com/books/v1/"
})

export default api



