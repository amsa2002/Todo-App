import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoApp() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNewToDo = () => {
    if (!newTodoTitle.trim() || !newDescription.trim()) {
      return;
    }

    if (editIndex !== null) {
      // Edit existing todo
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[editIndex] = {
        title: newTodoTitle,
        description: newDescription,
      };

      setAllTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

      setNewDescription('');
      setNewTodoTitle('');
      setEditIndex(null);
    } else {
      // Add new todo
      let newToDoObj = {
        title: newTodoTitle,
        description: newDescription,
      };
      let updatedTodoArr = [...allTodos, newToDoObj];
      setAllTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

      setNewDescription('');
      setNewTodoTitle('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewTodoTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  const handleDelete = (index) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setAllTodos(updatedTodoArr);
    setEditIndex(null);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

    handleDelete(index);
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  return (
    <>
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" type="button" onClick={handleAddNewToDo}>
              {editIndex !== null ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleDelete(index)}
                  />
                  <AiOutlineEdit title="Edit?" className="icon" onClick={() => handleEdit(index)} />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}
          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TodoApp;
