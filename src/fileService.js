import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/files"

class FileService {


    async uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(BASE_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async readFile(fileName) {
        try {
            const response = await axios.get(BASE_URL + `/${fileName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async getAllFiles() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async deleteFile(fileName) {
        try {
            const response = await axios.delete(BASE_URL + `/${fileName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default FileService;