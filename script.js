var todosArr = [];
$( document ).ready(function() {

    $.get('https://jsonplaceholder.typicode.com/todos',function(data){init(data)});


    function init(todos){
        let html = '';
        todosArr = todos;
        todosArr.forEach((todo)=>{
            html += createTodoHTML(todo);
        });
        $('#todos').html(html);
    }

});

function createTodoHTML(todo){
    return `<div class="todo row card" data-id="${todo.id}">
                    <div class="user-id col-sm-12">User: ${todo.userId}</div>
                    <div class="title col-sm-12">Title: ${todo.title}</div>
                    <div class="completed col-sm-12">Completed:
                        <input type="checkbox" class="" ${todo.completed?'checked':''} disabled>
                    </div>
                        <button type="button" class="btn btn-primary" onclick="change(this.parentElement)">Update</button>
                </div>`;
}

function createUpdateHTML(todo){
    return `<div class="todo row card" data-id="${todo.id}">
                    <div class="user-id col-sm-12">User: <input type="text" name="user-id" value="${todo.userId}"></div>
                    <div class="title col-sm-12">Title: <input type="text" name="title" value="${todo.title}"></div>
                    <div class="completed col-sm-12">Completed:
                        <input type="checkbox" class="" ${todo.completed?'checked':''}>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="update(this.parentElement)">OK</button>
                </div>`;
}

function change(itemHTML){
    let id = $(itemHTML).data('id');
    let todo = todosArr.find((item)=>item.id == id);
    let newHTML = createUpdateHTML(todo);
    $(itemHTML).replaceWith(newHTML);
}

function update(itemHTML){
    let id = $(itemHTML).data('id');
    const userId = $(itemHTML).find('.user-id input').val();
    const title = $(itemHTML).find('.title input').val();
    const completed = $(itemHTML).find('.completed input').is(':checked');
    const todo = {userId,id,title,completed};

    let index = todosArr.findIndex((item)=>item.id == id);
    todosArr.splice(index,1,todo);

    let newHTML = createTodoHTML(todo);
    $(itemHTML).replaceWith(newHTML);
}
