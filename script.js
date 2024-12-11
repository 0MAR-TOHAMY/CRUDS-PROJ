const total = document.querySelector(`#total`);
const search = document.querySelector(`#search`);
const searchBy = document.querySelector(`#searchBy`);
const addBtn = document.querySelector(`#add-btn`);
const remBtn = document.querySelector(`#rem-btn`);
const tBody = document.querySelector(`#case`);
const warning = document.querySelector(`.warning-modal`);
const success = document.querySelector(`.success-modal`);
const errorM = document.querySelector(`.error-modal`);
const warningConfirm = document.querySelector(`#confirm-warning`);
const successConfirm = document.querySelector(`#confirm-success`);
const warningClose = document.querySelector(`#cancel-warning`);
const errorConfirm = document.querySelector(`#confirm-error`);
const errorClose = document.querySelector(`#cancel-error`);
const cover = document.querySelector(`.cover`);
const input = document.querySelector(`.input-modal`);
const submit = document.querySelector(`#submit-btn`);
const update = document.querySelector(`.update-modal`);
const updateBtn = document.querySelector(`#update-btn`);

const pName = document.querySelector(`.input-modal #name`);
const pPrice = document.querySelector(`.input-modal #price`);
const pTaxes = document.querySelector(`.input-modal #taxes`);
const pAds = document.querySelector(`.input-modal #ads`);
const pDiscount = document.querySelector(`.input-modal #discount`);
const pCategory = document.querySelector(`.input-modal #category`);
const pCount = document.querySelector(`.input-modal #count`);

const uName = document.querySelector(`.update-modal #name`);
const uPrice = document.querySelector(`.update-modal #price`);
const uTaxes = document.querySelector(`.update-modal #taxes`);
const uAds = document.querySelector(`.update-modal #ads`);
const uDiscount = document.querySelector(`.update-modal #discount`);
const uCategory = document.querySelector(`.update-modal #category`);
const uCount = document.querySelector(`.update-modal #count`);

let tempID;


let products = [];
const data = localStorage.getItem('products');
if(data) {products = JSON.parse(data);}

function renderTable(renderdProducts) {
    tBody.innerHTML = '';
    renderdProducts.forEach((product, idx) => {
        tBody.innerHTML += `
            <tr>
                <td>${idx+1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td class="action">
                    <button onclick="updateProduct(${idx})" class="edit-btn"><i class="fas fa-pencil-alt"></i>update</button>
                    <button onclick="remProduct(${idx})" class="delete-btn"><i class="fas fa-trash"></i>delete</button>
                </td>
            </tr>
        `;
    });
    localStorage.setItem('products', JSON.stringify(products));
    total.innerHTML = `${products.length}`;
};
function remProduct(idx){
    products.splice(idx, 1);
    filterAndSearch('', '');
}
submit.addEventListener('click', () => {
    try {
        const name = pName.value;
        const price = parseInt(pPrice.value);
        const taxes = parseInt(pTaxes.value);
        const ads = parseInt(pAds.value);
        const discount = parseInt(pDiscount.value);
        const category = pCategory.value;
        const total = price + (price * taxes / 100) + (price * ads / 100) - (price * discount / 100);
        const count = parseInt(pCount.value);
        if (isNaN(price) || isNaN(taxes) || isNaN(ads) || isNaN(discount) || isNaN(count) || name === "" || category === "") {
            errorM.style.display = "flex";
        }else{
            for (let i = 0; i < count; i++) {
                products.push({
                    name,
                    price,
                    taxes,
                    ads,
                    discount,
                    total,
                    category
                });
            }
            pName.value = '';
            pPrice.value = '';
            pTaxes.value = '';
            pAds.value = '';
            pDiscount.value = '';
            pCategory.value = '';
            pCount.value = '';
            renderTable(products);
            input.style.display = 'none';
            success.style.display = 'flex';
        }
    } catch (error) {
        errorM.style.display = "flex";
    }
});
function filterAndSearch(query, type) {
    if (type === '' || query === ''){
        renderTable(products);
    }else{
        const filteredProducts = products.filter(product => {
            return product[type].toLowerCase().includes(query.toLowerCase());
        });
        renderTable(filteredProducts);
    }
}
search.addEventListener('input', () => {
    const query = search.value;
    const type = searchBy.value;
    filterAndSearch(query, type);
});
searchBy.addEventListener('change', () => {
    const query = search.value;
    const type = searchBy.value;
    filterAndSearch(query, type);
});
remBtn.onclick = () => {
    warning.style.display = 'flex';
    cover.style.display = 'flex';
};
warningClose.onclick = () => {
    warning.style.display = 'none';
    cover.style.display = 'none';
};
warningConfirm.onclick = () => {
    products = [];
    filterAndSearch('', '');
    warning.style.display = 'none';
    cover.style.display = 'none';
};
addBtn.onclick = () => {
    input.style.display = 'flex';
    cover.style.display = 'flex';
};
successConfirm.onclick = () => {
    success.style.display = 'none';
    cover.style.display = 'none';
};
errorClose.onclick = () => {
    errorM.style.display = 'none';
    cover.style.display = 'none';
    input.style.display = 'none';
    pName.value = '';
    pPrice.value = '';
    pTaxes.value = '';
    pAds.value = '';
    pDiscount.value = '';
    pCategory.value = '';
    pCount.value = '';
};
errorConfirm.onclick = () => {
    errorM.style.display = 'none';
};
function updateProduct(idx){
    const product = products[idx];
    uName.value = product.name;
    uPrice.value = product.price;
    uTaxes.value = product.taxes;
    uAds.value = product.ads;
    uDiscount.value = product.discount;
    uCategory.value = product.category;
    update.style.display = 'flex';
    cover.style.display = 'flex';
    tempID = idx;
}
updateBtn.onclick = () => {
    const updatedProduct = {
        name: uName.value,
        price: parseInt(uPrice.value),
        taxes: parseInt(uTaxes.value),
        ads: parseInt(uAds.value),
        discount: parseInt(uDiscount.value),
        category: uCategory.value,
        total: parseInt(uPrice.value) + (parseInt(uPrice.value) * parseInt(uTaxes.value) / 100) + (parseInt(uPrice.value) * parseInt(uAds.value) / 100) - (parseInt(uPrice.value) * parseInt(uDiscount.value) / 100)
    };
    products[tempID] = updatedProduct;
    filterAndSearch('', '');
    update.style.display = 'none';
    success.style.display = "flex";
    uName.value = '';
    uPrice.value = '';
    uTaxes.value = '';
    uAds.value = '';
    uDiscount.value = '';
};

filterAndSearch('', '');