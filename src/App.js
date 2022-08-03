import React, { useState } from 'react'
import Home from "./components/Home"
import NoTask from "./components/NoTask"

const App = () => {
  const [isList, setIsList] = useState(false);
  const [name, setName] = useState(
    () => JSON.parse(localStorage.getItem("name")) || ""
  )

  React.useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);
  return (
    <>
      {
        isList ?
          <Home
            name={name}
          />
          :
          <NoTask
            name={name}
            setName={setName}
            isList={isList}
            setIsList={setIsList}
          />
      }
    </>
  )
}

export default App