import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

type Props = {
  selectedDate: string
  setSelectedDate: (value: string | ((prevVar: string) => string)) => void
  setFocus: (value: boolean) => void
  dataFormat: string
  focus: boolean
}
const Index = ({ selectedDate, setSelectedDate, setFocus, dataFormat, focus }: Props) => {
  return (
    <input
      id='data'
      type='text'
      onFocus={() => setFocus(true)}
      placeholder={dataFormat ? dataFormat : 'DD/MM/AAAA'}
      value={selectedDate}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
    />
  )
}

export default Index

Index.prototype = {
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func,
  handleFocus: PropTypes.func,
}
