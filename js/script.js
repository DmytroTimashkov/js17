let itemId = localStorage.itemId ? +localStorage.getItem('itemId') : 1;
const form = document.getElementById('todoForm');
let toDoContainer = document.getElementById('todoItems')
let storeId ='toDoItems'


function findElement(elements,id){
            return    elements.find(function (element){
        if (element.id === id)return element;
    })
}
form.addEventListener('submit',function (e){
   e.preventDefault()
    const heading = e.target.querySelector('input[name=title]');
    const content = e.target.querySelector('textarea[name=description]');

    if (!heading.value || !content.value){
        return alert('Заполните все поля')
    };

    let temple = createTemples(heading.value , content.value,itemId);

    useStorage(heading.value,content.value)

    e.target.reset();


})

document.addEventListener('DOMContentLoaded', function (){
    if (!localStorage[storeId]) return;

    let data = JSON.parse(localStorage[storeId])

    data.forEach(function (item){
        const template = createTemples(item.heading,item.content,item.id,item.status)
    })
})

toDoContainer.addEventListener('change',function (e){
    let toDoItem = findWrapper(e.target)
    let toDoItemId = +toDoItem.getAttribute('data-id')
    let toDoItems = JSON.parse(localStorage[storeId])
    let status = e.target.checked;



    let currentToDoItem = findElement(toDoItems,toDoItemId)


    currentToDoItem.status = status;

    localStorage.setItem(storeId,JSON.stringify(toDoItems))


})


toDoContainer.addEventListener('click',function (e){
    if (!e.target.classList.contains('deleteOne'))return;

    let toDoItem = findWrapper(e.target)
    let toDoItemId = +toDoItem.getAttribute('data-id')
    let toDoItems = JSON.parse(localStorage.getItem(storeId))

    let storeData = toDoItems.filter(function (item){
        if (item.id !== toDoItemId)return item;

    })
    localStorage.setItem(storeId,JSON.stringify(storeData))

    toDoItem.parentElement.remove()


})


function findWrapper(elem){
    if (elem.hasAttribute('data-id'))return elem

    return findWrapper(elem.parentElement)
}


function useStorage(heading,content,status=false){
    let toDoItem = {
        id :itemId,
        heading,
        content,
        status
    };
    ++itemId;
    localStorage.setItem('itemId',itemId);
    if (localStorage[storeId]){

    const storeData = JSON.parse(localStorage.getItem(storeId))

    storeData.push(toDoItem)

    localStorage.setItem(storeId,JSON.stringify(storeData))

    return toDoItem


    }

    let arr = JSON.stringify([toDoItem])
    localStorage.setItem(storeId,arr)
    return toDoItem

}


function createTemples(heading,content,id,status=false){
    let mainWrp = document.createElement('div')
        mainWrp.className = 'col-4 mainWrp'

    let taskWrp = document.createElement('div')
        taskWrp.className = 'taskWrapper'
        taskWrp.setAttribute('data-id',id)

    let headline = document.createElement('div')
        headline.className = 'taskHeading'
        headline.innerHTML = heading

    let description = document.createElement('div')
        description.className = 'taskDescription'
        description.innerHTML = content

    let label = document.createElement('label')
        label.className = 'd-flex justify-content-between align-items-center'

    let completed = document.createElement('div')
        completed.innerHTML = 'completed'

    let checkbox = document.createElement("input")
        checkbox.type = 'checkbox'
        checkbox.name = 'completed'

        if (status){
            checkbox.checked = true;
            checkbox.setAttribute('checked','checked')
        }

    let deleteOne = document.createElement('button')
        deleteOne.className = 'btn btn-primary w-100 deleteOne'
        deleteOne.innerHTML = 'remove'

    toDoContainer.prepend(mainWrp)
    mainWrp.append(taskWrp)
    taskWrp.append(headline)
    taskWrp.append(description)
    taskWrp.append(label)
    label.append(completed)
    label.append(checkbox)
    taskWrp.append(deleteOne)



}

let deleteAll = document.createElement('button')
deleteAll.className = 'btn btn-warning w-100'
deleteAll.innerHTML = 'remove all'

form.after(deleteAll)
const mainWrapper = document.getElementsByClassName('mainWrp')
deleteAll.addEventListener('click',function (){
    for (let i = mainWrapper.length - 1;i >= 0 ;i--){
        mainWrapper[i].remove();
    }
    localStorage.clear()



})