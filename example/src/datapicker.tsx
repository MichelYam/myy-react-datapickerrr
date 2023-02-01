import React, { useState } from 'react'
import { Datapicker } from 'my-react-datapickerzadzadaz'
// import { Datapicker } from 'my-react-datapicker'
const DatapickerContainer = () => {
    const [test, setTest] = useState('')
    return (
        <Datapicker dataFormat='DD/MM/YYYY' selectedDate={test} setSelectedDate={setTest} />
    )
}

export default DatapickerContainer