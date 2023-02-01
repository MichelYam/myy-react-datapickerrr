import React, { useState } from 'react'
import { Datapicker } from 'my-react-datapickerzadzadaz'
import 'my-react-datapickerzadzadaz/dist/stylesheets/datapicker.css'
export default function App() {
  const [startDate, setStartDate] = useState('')

  const getYear = (date: Date) => {
    return date.getFullYear()
  }

  const range = (start: number, end: number) => {
    const year = []
    for (let i = start; i <= end; i++) {
      year.push(i)
    }
    return year
  }
  const years = range(1990, getYear(new Date()) + 10)
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ]
  const mystyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <div style={mystyle}>
      <Datapicker
        customHeader={({ currentMonth, currentYear, changeMonth, changeYear, prev, next }: any) => (
          <div>
            <button onClick={prev}>{'<'}</button>
            <select
              value={months[currentMonth as unknown as number]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select value={currentYear} onChange={({ target: { value } }: any) => changeYear(value)}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={next}>{'>'}</button>
          </div>
        )}
        dataFormat='DD/MM/YYYY'
        selectedDate={startDate}
        setSelectedDate={setStartDate}
      />
    </div>
  )
}
