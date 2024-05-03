import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";




const Calendar = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    const generateCalendar = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const daysArray = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            daysArray.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push({
                day,
                date: new Date(year, month, day)
            });
        }

        setCalendarDays(daysArray);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 0) {
                setCurrentYear(year => year - 1);
                return 11;
            } else {
                return prevMonth - 1;
            }
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 11) {
                setCurrentYear(year => year + 1);
                return 0;
            } else {
                return prevMonth + 1;
            }
        });
    };

    const handleDayClick = (day) => {
        setSelectedDate(day.date);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Box className="bg-gray-100 flex items-center justify-center">
           <Box className=" mx-auto p-4">
                <Box className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <Box className="flex items-center justify-between px-6 py-3 bg-gray-700">
                        <button id="prevMonth" className="text-white" onClick={handlePrevMonth}>Previous</button>&emsp;
                        <h2 id="currentMonth" className="text-white">{`${months[currentMonth]} ${currentYear}`}</h2>&emsp;
                        <button id="nextMonth" className="text-white" onClick={handleNextMonth}>Next</button>
                    </Box>
                    <Box className="grid grid-cols-7 gap-2 p-4" id="calendar">
                        {calendarDays.map((day, index) => (
                            <Box key={index} className="text-center py-2 border cursor-pointer" onClick={() => handleDayClick(day)}>
                                {day ? day.day : ''}
                            </Box>
                        ))}
                    </Box>

                    <Box id="myModal" className={`modal ${showModal ? '' : 'hidden'} fixed inset-0 flex items-center justify-center z-50`}>
                        <Box className="modal-overlay absolute inset-0 bg-black opacity-50"></Box>
                        
                        <Box className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <Box className="modal-content py-4 text-left px-6">
                                <Box className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold">Selected Date</p>
                                    <button id="closeModal" className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring" onClick={closeModal}>✕</button>
                                </Box>
                                <Box id="modalDate" className="text-xl font-semibold">{selectedDate ? selectedDate.toLocaleDateString() : ''}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
