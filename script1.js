let url = "https://crudcrud.com/api/7106c54083784f568e1581d08c25c98f";

const obj = {
  product: '',
  Price: '',
  type: ''
};

const newdata = async () => {
  try {
    const res = await axios.get(url + "/products");
    const list_items = document.getElementById("item-list1");

    for (let i = 0; i < res.data.length; i++) {
      let li = document.createElement('li');
      let deletebtn = document.createElement('button');

      li.className = "items";
      deletebtn.className = 'danger-btn Delete';

      li.innerHTML = `${res.data[i].product} - ${res.data[i].type} - ${res.data[i].Price} `;
      deletebtn.innerHTML = 'remove-p';

      li.appendChild(deletebtn);
      list_items.appendChild(li);
    }
  } catch (error) {
    console.log("error=>", error);
  }
};

const addItem = async () => {
  try {
    obj.product = document.getElementById('product').value;
    obj.Price = document.getElementById('price').value;
    obj.type = document.getElementById('type').value;

    await axios.post(url + "/products", obj);

    document.getElementById('type').value = '';
    document.getElementById('price').value = '';
    document.getElementById('product').value = '';
  } catch (error) {
    console.log("error=>", error);
  }
};

const deleteItem = async (li, innerText) => {
  try {
    const res = await axios.get(url + '/products');

    for (let j = 0; j < res.data.length; j++) {
      if (res.data[j].product === innerText[0]) {
        await axios.delete(url + '/products/' + res.data[j]._id);
      }
    }

    list_items.removeChild(li);
  } catch (error) {
    console.log("error=>", error);
  }
};

const list_items = document.getElementById("item-list1");
const addButton = document.getElementById("add-product");

newdata();

addButton.addEventListener('click', addItem);

list_items.addEventListener('click', (e) => {
  if (e.target.classList.contains('Delete')) {
    const li = e.target.parentElement;
    const text = li.innerHTML;
    const innerText = text.split(" - ");
    deleteItem(li, innerText);
  }
});
