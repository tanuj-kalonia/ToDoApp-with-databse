import React from 'react'
import { FaTrash } from "react-icons/fa";

import "../styles/App.scss"
import "../styles/Home.scss"

function Home({ name }) {

    const [inputText, setInputText] = React.useState('');
    const [items, setItems] = React.useState(
        () => JSON.parse(localStorage.getItem("items")) || []
    );

    function handelChange(e) {
        const task = e.target.value
        setInputText(task);
    }

    function addItems() {
        console.log("function call");

        if (!inputText) {
            return;
        }
        setItems(prevValue => {
            return [...prevValue, inputText];

        })
        setInputText("");
    }
    function deleteItem(id) {
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index != id;
            })
        })
    }
    React.useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    let taskLength = items.length;
    return (
        <section className='main'>
            <div className="App" id='home'>
                <h1 className='main-heading'>What's up, {name}</h1>
                <h3 className='create-to-heading'>Create a TODO list</h3>
                <p className='to-do-para'>What's on your todo list ? </p>
                <input
                    className='input-box'
                    type="text"
                    value={inputText}
                    onChange={handelChange}
                    placeholder="e.g. Get some milk"
                />
                <button className='add-btn' onClick={addItems}>
                    <span>Add TODO Task</span>
                </button>

                <div className='list-container'>
                    {
                        taskLength ?
                            <div className="list-wrapper">
                                <h3 className='task-list'>Your Task</h3>
                                <ul className='list'>
                                    {items.map((item, index) => {
                                        return (
                                            <div className='list-item'>
                                                <li key={index} id={index}>{item} </li>
                                                <button className='del-btn' onClick={() => deleteItem(index)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )
                                    })}
                                </ul>


                            </div>
                            :
                            <div className='no-task'>
                                <h3 className='warning'>No task in the list</h3>
                            </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Home;
