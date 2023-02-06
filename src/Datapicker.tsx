import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import Calendar from './Calendar'
import Input from './input'
import PropTypes from 'prop-types'
// import './stylesheets/datapicker.css'

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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='datapicker'>
      <div className='datapicker-input' onClick={() => setIsOpen(true)}>
        <Input
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dataFormat={dataFormat}
        />
        {isOpen && <Calendar
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          customHeader={customHeader}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dataFormat={dataFormat}
        />}
      </div>
    </div>
  )
}

export default Datapicker

Datapicker.prototype = {
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  customHeader: PropTypes.func,
  dataFormat: PropTypes.string,
}
