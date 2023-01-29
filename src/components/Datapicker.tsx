// import React, { useState } from 'react'

// type Props = {
//   value?: number
// }
// const MyCounter = ({ value = 0 }: Props) => {
//   const [counter, setCounter] = useState(value)

//   const onMinus = () => {
//     setCounter((prev) => prev - 1)
//   }

//   const onPlus = () => {
//     setCounter((prev) => prev + 1)
//   }

//   return (
//     <div>
//       <h1>Counter: {counter}</h1>
//       <button onClick={onMinus}>-</button>
//       <button onClick={onPlus}>+</button>
//     </div>
//   )
// }

// export default MyCounter
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
// import Calendar from './Calendar'
import Input from './Input'
import PropTypes from 'prop-types'

type props = {
  dataFormat: string
  selectedDate: string
  setSelectedDate: Dispatch<SetStateAction<string>>
  customHeader?(params: IParamsCalendarHeader): ReactNode
}
export interface IParamsCalendarHeader {
  prev(): void
  next(): void
  currentYear: string | number
  currentMonth: string | number
  changeMonth: (value: number) => void
  changeYear: (value: number) => void
}
const Datapicker = ({ selectedDate, setSelectedDate, customHeader, dataFormat }: props) => {
  const [focus, setFocus] = useState(false)
  return (
    <div
      className='datapicker'
      onBlur={() => {
        setFocus(false)
      }}
    >
      <Input
        setFocus={setFocus}
        focus={focus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dataFormat={dataFormat}
      />
    </div>
  )
}

export default Datapicker

Datapicker.prototype = {
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  customHeader: PropTypes.func.isRequired,
  dataFormat: PropTypes.string.isRequired,
}
