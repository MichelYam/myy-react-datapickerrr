import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { MyCounter } from 'my-react-typescript-package'
import { Datapicker } from 'my-react-datapickerzadzadaz'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const [test, setTest] = useState('')
root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
      <MyCounter />
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value</h2>
      <MyCounter value={5} />
      <Datapicker dataFormat='DD/MM/YYYY' selectedDate={test} setSelectedDate={setTest} />
    </div>
  </React.StrictMode>,
)
