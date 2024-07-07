import axios from 'axios';

export const api=axios.create({
    baseURL:'https://api.themoviedb.org/3',
})

export const apikey="427f5197c0647c2e402deba8de9b1b0f"
