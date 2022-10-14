import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaTrash, FaStar, FaPen, FaShoppingCart } from "react-icons/fa";

import "../styles/App.scss"
import "../styles/Home.scss"
import "animate.css"


function Home() {
    const navigate = useNavigate();


    const callHomePage = async () => {
        try {
            const res = await fetch("/home", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(`The data is ${data}`);
            console.log(res.status)
            if (!res.status === 200) {
                throw new Error(res.error);
                navigate("/login")
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        callHomePage();
    }, [])

    const [inputText, setInputText] = React.useState({
        task: "",
        category: ""
    });
    const [errorMsg, setErrMsg] = React.useState("");


    const [items, setItems] = React.useState(
        () => JSON.parse(localStorage.getItem("items")) || []
    );

    function handelChange(e) {
        const { name, value } = e.target;

        setInputText((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    function addItems() {
        const { task, category } = inputText;

        if (!task && !category) {
            return setErrMsg("Task and category both are required")
        }
        if (!task) return setErrMsg("Input field can't be empty")
        else if (!category) return setErrMsg("Please select a category")

        if (task && category)
            setItems(prevValue => {
                return [...prevValue, inputText];

            })
        console.log(task, category);
        setInputText(() => {
            return {
                task: "",
                category: ""
            }
        });
        setErrMsg("")
    }
    function deleteItem(id) {
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index !== id;
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
                <h1 className='main-heading'>What's up, Tanuj</h1>
                <h3 className='create-to-heading'>Create a TODO list</h3>
                <p className='to-do-para'>What's on your todo list ? </p>
                <input
                    className='input-box'
                    id='inputTask'
                    type="text"
                    name="task"
                    value={inputText.task}
                    onChange={handelChange}
                    placeholder="e.g. Get some milk"
                    autoComplete="off"
                />

                <fieldset className='fieldset'>
                    <legend className='legend'>Category</legend>
                    <div className='radio-group'>
                        <div className='radio-option-container'>
                            <input
                                type="radio"
                                id='study'
                                name='category'
                                value="study"
                                checked={inputText.category === "study"}
                                onChange={handelChange}
                                className="study"
                            />
                            <label htmlFor="study">Study</label>
                        </div>

                        <div className='radio-option-container'>
                            <input
                                type="radio"
                                id='study'
                                name='category'
                                value="shopping"
                                checked={inputText.category === "shopping"}
                                onChange={handelChange}
                                className="shopping"
                            />
                            <label htmlFor="study">Shopping</label>
                        </div>

                        <div className='radio-option-container'>
                            <input
                                type="radio"
                                id='important'
                                name='category'
                                value="important"
                                checked={inputText.category === "important"}
                                onChange={handelChange}
                                className="important"
                            />
                            <label htmlFor="study">Important</label>
                        </div>

                    </div>

                </fieldset>

                <button className='add-btn' onClick={addItems}>
                    <span>Add TODO Task</span>
                </button>

                <div className='line'></div>

                <div className='list-container'>
                    {
                        taskLength ?
                            <div className="list-wrapper">
                                <h3 className='task-list'>Your Task</h3>
                                <ul className='list'>
                                    {items.map((item, index) => {
                                        return (
                                            <div className="list-item" key={index}>
                                                <li id={index}>{item.task} </li>
                                                <div className='button-group'>
                                                    {
                                                        item.category === "important" ?
                                                            <div className='important'><FaStar /></div>
                                                            : null
                                                    }
                                                    {
                                                        item.category === "study" ?
                                                            <div className='important'><FaPen /></div>
                                                            : null
                                                    }
                                                    {
                                                        item.category === "shopping" ?
                                                            <div className='important'><FaShoppingCart /></div>
                                                            : null
                                                    }
                                                    <button className='del-btn' onClick={() => deleteItem(index)}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </ul>


                            </div>
                            :
                            <div className='no-task'>
                                <h3 className='warning'>You don't have any task in the list</h3>
                            </div>
                    }
                </div>
            </div>
            {
                errorMsg ?
                    <div className="error-wrapper">
                        <h3 className='error-heading'>
                            {errorMsg}
                        </h3>
                    </div>
                    :
                    null
            }
        </section>
    );
}

export default Home;
