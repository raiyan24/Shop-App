/**
 * Alert Message
 */
const setAlert = (msg, type='danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`
}

/**
 * Create Data to Local Storage
 */
const createLSData = (key, value) => {
    //init values
    let data = [];

    //check data exist or not in Local Storage
    if( localStorage.getItem(key) ){
        data = JSON.parse(localStorage.getItem(key));
    }
    
    // push data with existing data
    data.push(value);
    
    // Set data to Local storage
    localStorage.setItem('product', JSON.stringify(data));
}

/**
 * Read Data from Local Storage
 */
const readLSData = (key) => {
    
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}

/**
 * Update LS data
 */
const updateLSdata = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}