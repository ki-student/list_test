import './App.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoX6ck80hMlk8eOm6OIx84yIahiECB240",
  authDomain: "todolist-85b4c.firebaseapp.com",
  projectId: "todolist-85b4c",
  storageBucket: "todolist-85b4c.appspot.com",
  messagingSenderId: "215780273316",
  appId: "1:215780273316:web:1bc8c9024dcf0fd35f8a31",
  measurementId: "G-ZE094H4P1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  const onSubmit = () => {
        props.onSubmit(input);
        setInput("");
      };
    
  return (<div>
    <TextField
      id="todo-item-input"
      label="Todo Item"
      variant="outlined"
      onChange={(e) => setInput(e.target.value)} value={input}
    />
    <Button variant="outlined" onClick={onSubmit}>Add</Button>
  </div>);
  };

  const TodoItem = (props) => {
    const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};
      return (<li>
        <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>{props.todoItem.todoItemContent}</span>
        <Button variant="outlined" onClick={() => props.onRemoveClick(props.todoItem)}>Delete</Button>
      </li>);
    };    
  
  const TodoItemList = (props) => {
    const todoList = props.todoItemList.map((todoItem, index) => {
      return <TodoItem
      key={index}
      todoItem={todoItem}
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
    />;

        });
      
      return (<div>
        <ul>{todoList}</ul>
      </div>);
    };
    

function App() {
  const [todoItemList, setTodoItemList] = useState([]);
  const onSubmit = (newTodoItem) => {
        setTodoItemList([...todoItemList, {
          id: todoItemId++,
          todoItemContent: newTodoItem,
          isFinished: false,
        }]);
      };
      const onTodoItemClick = (clickedTodoItem) => {
            setTodoItemList(todoItemList.map((todoItem) => {
              if (clickedTodoItem.id === todoItem.id) {
                return {
                  id: clickedTodoItem.id,
                  todoItemContent: clickedTodoItem.todoItemContent,
                  isFinished: !clickedTodoItem.isFinished,
                };
              } else {
                return todoItem;
              }
            }));
          };
          const onRemoveClick = (removedTodoItem) => {
                setTodoItemList(todoItemList.filter((todoItem) => {
                  return todoItem.id !== removedTodoItem.id;
                }));
              };
            
    
  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}

      />

    </div>
  );
}

export default App;
