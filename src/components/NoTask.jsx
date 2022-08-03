import React, { useState } from 'react'
import "../styles/NoTask.scss"

const NoTask = ({ name, setName, isList, setIsList }) => {

    function handleChange(e) {
        const name = e.target.value;
        setName(name)
    }

    function createList() {
        console.log(isList);
        return name ? setIsList(!isList) : null;
    }
    return (
        <section className='no-list'>
            <div className='no-list-wrapper'>
                <div className='greeting-box'>
                    <h2 className='main-heading'>It seems that you don't have any list.</h2>
                    <h3 className='create-heading'>Lets create one for you !!</h3>
                </div>
                <div className='input-wrapper'>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        className='input-box'
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                    />
                    <button className='go-btn' onClick={createList}>G0!!!</button>
                </div>
            </div>
        </section>
    )
}

export default NoTask;