const addBtn = document.querySelector('#addBtn');
const subBtn = document.querySelector("#submit");
const closeBtn = document.querySelector('#close');
addBtn.addEventListener('click',()=>document.getElementById('popup').style.display='block');
subBtn.addEventListener('click',addBook);
closeBtn.addEventListener('click',()=>{
    document.getElementById('popup').style.display='none'
});
let library = [];
let idx = 0;

function Book(title,author,pages,read,id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBook(){
    event.preventDefault();
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    read = document.getElementById('read').checked;

    if(title.length==0 || author.length==0 || pages.length==0)
    {
        alert("try again");
    }
    else 
    {
        addnewBook(title,author,pages,read);
    }
}

function addnewBook(title,author,pages,read){
    let self = document.querySelector('.bookself');
    let temp = new Book(title,author,pages,read,idx);
    library.push(temp);
    let newbook = document.createElement('div');
    newbook.innerHTML = "Title:"+title+"<br>"+"By:"+author+"<br>"+"Pages:"+pages+"<br>";
    newbook.classList.add('book');
    newbook.id = idx++;

    let delbtn = document.createElement('button');
    let readBtn = document.createElement('button');
    
    delbtn.textContent = "Remove";
    readBtn.textContent="Not read"
    if(read)
    {
        newbook.classList.toggle('read');
        readBtn.textContent="read";
    }

    delbtn.classList.add('btns');
    readBtn.classList.add('btns');

    readBtn.addEventListener('click',function(){
        if(this.textContent=="Not read")
            this.textContent = "read";
        else 
            this.textContent = "Not read";
        newbook.classList.toggle('read');
        let ind  = getind(+ this.parentElement.id);
        library[ind].read = !library[ind].read;
        setData();
    });

    delbtn.addEventListener('click',function(){
        let gotid = + this.parentElement.id;
        this.parentElement.remove();
        let ind = getind(gotid);
        library.splice(ind,1);
        setData();
    });

    setData();
    newbook.append(readBtn);
    newbook.append(delbtn);

    self.appendChild(newbook);
    document.getElementById('popup').style.display='none';
}


function getind(gid){
    return library.indexOf(library.find((elment)=> elment.id == '0'));
}

//for storing the data

function setData() {
    localStorage.setItem(`Library`,JSON.stringify(library));
}

function restore() {
    if(!localStorage.Library) {
        return;
    }else {
        let obj = localStorage.getItem('Library') // gets information from local storage to use in below loop to create DOM/display
        obj = JSON.parse(obj);
        for(let i=0;i<obj.length;++i)
        {
            addnewBook(obj[i].title,obj[i].author,obj[i].pages,obj[i].read);
        }
        
    }
}

restore();