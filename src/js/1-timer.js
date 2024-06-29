import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, оберіть дату в майбутньому',
      });
      userSelectedDate = null;
      document.getElementById('start-btn').disabled = true;
    } else {
      userSelectedDate = selectedDate;
      document.getElementById('start-btn').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

document.getElementById('start-btn').addEventListener('click', function () {
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, оберіть дату та час',
    });
    return;
  }

  const endDate = userSelectedDate.getTime();
  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = endDate - now;
    if (distance <= 0) {
      clearInterval(timer);
      document.getElementById('days').innerHTML = '00';
      document.getElementById('hours').innerHTML = '00';
      document.getElementById('minutes').innerHTML = '00';
      document.getElementById('seconds').innerHTML = '00';
      iziToast.success({
        title: 'Час закінчився',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(distance);
      document.getElementById('days').innerHTML = addLeadingZero(days);
      document.getElementById('hours').innerHTML = addLeadingZero(hours);
      document.getElementById('minutes').innerHTML = addLeadingZero(minutes);
      document.getElementById('seconds').innerHTML = addLeadingZero(seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
