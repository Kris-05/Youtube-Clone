// require('dotenv').config();

// export const API_KEY = process.env.API_KEY;
export const API_KEY = 'AIzaSyAaNZrPY_58eVRvvhPSv3jNjHHBqwQunNg'
export const valueConverter = (value) => {
    if(value >= 1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value >= 1000){
        return Math.floor(value/1000)+"K";
    }
    else
        return value;
}