import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import CalendarHeader from './CalendarHeader'
import { IParamsCalendarHeader } from './Datapicker'
import Week from './Week'
import PropTypes from 'prop-types'
// import './stylesheets/datapicker.css'

type props = {
  dataFormat: string
  customHeader?(params: IParamsCalendarHeader): ReactNode
  setSelectedDate: Dispatch<SetStateAction<string>>
  selectedDate: string
  setIsOpen: (value: boolean) => void
  isOpen: boolean
}
type DayProps = {
  value: string | number
  otherMonth: boolean | string
  selected?: boolean
}[]

export type test = {
  day: string | number
  month: string | number
  year: string | number
  otherMonth: string | number
}

const Index = ({ customHeader, setSelectedDate, selectedDate, dataFormat, setIsOpen }: props) => {
  const [currentDateCalendar, setCurrentDateCalendar] = useState<DayProps>([])
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [daySelected, setDaySelected] = useState<test>({
    day: '',
    month: '',
    year: '',
    otherMonth: '',
  })

  const listOfDay = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

  useEffect(() => {
    createCalendar(currentMonth, currentYear)
  }, [daySelected, currentMonth, currentYear])

  useEffect(() => {
    if (daySelected.day !== '') checkDaySelected(daySelected)
  }, [daySelected])

  useEffect(() => {
    handleValueInput(selectedDate)
    createCalendar(currentMonth, currentYear)
  }, [selectedDate])

  useEffect(() => {
    document.addEventListener("click", handleWindowMouseDown);
  }, [])

  /**
   * handle the closing of the calendar
   * @param event detect the mouse click 
   * 
   */
  const handleWindowMouseDown = (event: MouseEvent): void => {
    const calendar = document.querySelector(".calendar")
    const datepicker = document.querySelector(".datapicker-input")

    if (!(calendar && datepicker)) {
      return;
    }

    const eventIsOutside = !calendar.contains(event.target as Node) && calendar !== event.target;
    const eventIsOnPopoverAnchor = datepicker.contains(event.target as Node) || datepicker === event.target;


    if (eventIsOutside && !eventIsOnPopoverAnchor) {
      setIsOpen(false);
    }
  }
  /**
   * create a calender with current month and year
   * @param month current Month
   * @param year  currenn Year
   */
  const createCalendar = (month: number, year: number) => {
    const firstWeekDay = new Date(year, month, 1).getUTCDay()
    const lastDay = new Date(year, month + 1, 0).getDate()
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate()
    let nextDay = 1
    let currentDate = 1
    const newArr = []
    for (let i = 0; i < 6 * 7; i++) {
      if (i < new Date(year, month, 1).getUTCDay()) {
        newArr.push({
          value: lastDayOfPrevMonth - firstWeekDay + i + 1,
          selected: false,
          otherMonth: 'previous-month',
          month: currentMonth === 0 ? 11 : currentMonth - 1,
          year: currentMonth === 0 ? currentYear - 1 : currentYear,
        })
      } else if (currentDate > lastDay) {
        newArr.push({
          value: nextDay,
          selected: false,
          otherMonth: 'next-month',
          month: currentMonth === 11 ? 0 : currentMonth + 1,
          year: currentMonth === 11 ? currentYear + 1 : currentYear,
        })

        nextDay++
      } else {
        newArr.push({
          value: currentDate,
          selected: isSameDay(daySelected, currentDate),
          otherMonth: false,
          month: currentMonth,
          year: currentYear,
        })
        currentDate++
      }
    }
    setCurrentDateCalendar(newArr)
  }

  /**
   * Change the month or year when other months
   * @param daySelected object
   */
  const checkDaySelected = (daySelected: test) => {
    let newMonth = currentMonth
    let newYear = currentYear

    if (daySelected.otherMonth === 'previous-month') {
      if (currentMonth === 0) {
        newYear -= 1
        newMonth = 11
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        newMonth -= 1
        setCurrentMonth(currentMonth - 1)
      }

      setCurrentMonth(newMonth)
    } else if (daySelected.otherMonth === 'next-month') {
      if (currentMonth === 11) {
        newYear += 1
        newMonth = 0
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        newMonth += 1
        setCurrentMonth(currentMonth + 1)
      }
    }

    const month = newMonth + 1 < 10 ? '0' + (newMonth + 1) : newMonth + 1
    const year = newYear

    dataFormat === 'MM/DD/YYYY'
      ? setSelectedDate(`${month}/${daySelected.day}/${year}`)
      : setSelectedDate(`${daySelected.day}/${month}/${year}`)
    setIsOpen(false)
  }

  /**
   *
   * @param date object : information on the selected date
   * @param currentDate : calendar day
   * @returns true if the date is selected
   */
  const isSameDay = (date: test, currentDate: number | string) => {
    const todayDate = new Date()
    const day = todayDate.getDate()
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear()
    const dateInput = selectedDate.split('/').map(Number)
    // console.log(dateInput);
    if (!date.day && !selectedDate && day === currentDate && month === currentMonth && year === currentYear) {
      return true
    } else if (date && date.day == currentDate && date.month === currentMonth && date.year === currentYear) {
      return true
    } else if (
      selectedDate &&
      dateInput[0] === currentDate &&
      dateInput[1] - 1 === currentMonth &&
      dateInput[2] === currentYear
    ) {
      return true
    } else {
      return false
    }
  }
  /**
   * Handle date written by user
   * @param selectedDate the date of user
   */
  const handleValueInput = (selectedDate: string) => {
    if (dateRegex.test(selectedDate)) {
      const date = selectedDate.split('/').map(Number)
      setCurrentMonth(date[1] - 1)
      setCurrentYear(date[2])
    }
  }
  /**
   *  set the current month
   */
  const next = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }
  /**
   * set the current month
   */
  const prev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  return (
    <div className="datapicker-calendar">
      <div className='calendar'>
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          next={next}
          prev={prev}
          customHeader={customHeader}
          changeYear={setCurrentYear}
          changeMonth={setCurrentMonth}
        />
        <div className='calendar-body'>
          <div className='calendar-day'>
            {listOfDay.map((day, index) => (
              <span className='day-week' key={index}>
                {day}
              </span>
            ))}
          </div>
          <div id='calendar-container' className='calendar-container'>
            {[...Array(6)].map((_value, index) => (
              <Week key={index} calendarData={currentDateCalendar} indexWeek={index} setDaySelected={setDaySelected} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

Index.prototype = {
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  customHeader: PropTypes.func,
  dataFormat: PropTypes.string,
}
