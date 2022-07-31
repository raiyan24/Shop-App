// get elements
const add_product = document.getElementById('add_product');
const msg = document.querySelector('.msg');
const product_table = document.getElementById('product-table');
const product_list = document.getElementById('product_list');
const single_product = document.querySelector('.single-product');
const product_update_form = document.querySelector('#product-update-form');

add_product.onsubmit = (e) => {
    e.preventDefault();
   
    let form_data = new FormData(e.target);
    let data = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());

    if( !name || !price || !quantity || !photo){
        msg.innerHTML = setAlert('All fields are required');
    }else{
        
        createLSData('product', data);
        getAllLSData();
        e.target.reset();
    }
}

/**
 * Read all data from Local storage
 */
const getAllLSData = (key) => {
    
    let data = readLSData('product');
    
    //If data not exist in LS
    if( !data ){
        product_list.innerHTML = `
            <tr>
                <td colspan="7"> No Product Found </td>
            </tr>
        `
    }
    
    // If data esists in LS
    if(data){
        //init values
        let list = '';
        let final_amount = 0;
        data.map( (item, index) =>{
        final_amount += ( item.price * item.quantity );
        list+= `
        <tr>
            <td>${ index + 1 }</td>
            <td><img style="width: 65px; height: auto; object-fit: cover;" src="${ item.photo }" alt=""></td>
            <td> ${item.name} </td>
            <td> ${item.price} </td>
            <td> ${item.quantity} </td>
            <td> ${item.price * item.quantity} </td>
            <td>
                <a class="btn btn-info btn-sm product-view" product_index = '${index}' href="#single_product_view" data-bs-toggle="modal"><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm product-edit" product_index = '${index}' href="#product-update" data-bs-toggle="modal"><i class="fas fa-eye"></i></a>
                <a class="btn btn-danger btn-sm product-delete" product_index = '${index}' href=""><i class="fas fa-eye"></i></a>
            </td>
        </tr>
            `
        });

        list+= `
            <tr>
                <td class="text-end" colspan="6">Total Amount = ${final_amount} BDT </td>
                <td></td>
            </tr>
        `
        product_list.innerHTML = list;
    }

}
getAllLSData();

/**
 * Single Product View
 */

 product_list.onclick = (e) => {
    e.preventDefault();
 
    //View data
    if(e.target.classList.contains('product-view')){

        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');
        let {name, price, quantity, photo} = data[index];
        

        single_product.innerHTML = `
            <img src=" ${photo} " alt="">
            <h2>${name}</h2>
            <p>Price: ${price} BDT</p>
            `
        }
    
    //View Data for product update
    if(e.target.classList.contains('product-edit')){
        
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');
        let{name, price, quantity, photo} = data[index];

        product_update_form.innerHTML = `
            <div class="my-3">
                <label for="">Name</label>
                <input name="name" class="form-control" value="${name}" type="text">
            </div>
            <div class="my-3">
                <label for="">Price</label>
                <input name="price" class="form-control" value="${price}" type="text">
            </div>
            <div class="my-3">
                <label for="">Quantity</label>
                <input name="quantity" class="form-control" value="${quantity}" type="text">
            </div>
            <div class="my-3">
                <img class="w-100" src="${photo}" alt="">
            </div>
            <div class="my-3">
                <label for="">Photo</label>
                <input name="photo" class="form-control" value="${photo}" type="text">
            </div>
            <div class="my-3">
                <input name="index" class="form-control" value="${index}" type="hidden">
            </div>
            <div class="my-3">
                <input name="photo" class="btn btn-dark w-100" value="Update Now" type="submit">
            </div>
        `
    }    
    if(e.target.classList.contains('product-delete')){
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');
        data.splice(index, 1);
        updateLSdata('product', data);
        getAllLSData();
    }
 }

 /**
  * Update product form submit
  */
  product_update_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let data = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    let all_data = readLSData('product');
    all_data[index] = {name, price, quantity, photo};

    updateLSdata('product', all_data);
    getAllLSData();
  }