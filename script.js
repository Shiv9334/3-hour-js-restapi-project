

let url = "https://crudcrud.com/api/a8bfc16c663046cc84817268f653320a"
obj = {
  product: '',
  Price: '',
  type: ''
}
showdata();

function showdata() {
  axios.get(url + "/products")
    await(res => {
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
    })
    .catch(e => console.log("error=>", e));
};

list_items = document.getElementById("item-list1");

document.getElementById("add-product").addEventListener('click', e => {
  obj.product = document.getElementById('product').value;
  obj.Price = document.getElementById('price').value;
  obj.type = document.getElementById('type').value;

  axios.post(url + "/products", obj)
    .catch(e => console.log("error=>", e))
  document.getElementById('type').value = '';
  document.getElementById('price').value = '';
  document.getElementById('product').value = '';
})

list_items.addEventListener('click', e => {
  if (e.target.classList.contains('Delete')) {
    let li = e.target.parentElement;
    let text = li.innerHTML;
    let innerText = text.split(" - ");
    axios.get(url + '/products')
      await(res => {
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[j].product === innerText[0]) {
            axios.delete(url + '/products/' + res.data[j]._id)
              .then(e => { console.log(e) })
          };
        };
      })
      .catch(e => console.log("error=>", e));
    list_items.removeChild(li);
  };
});