import flatpickr from 'flatpickr';
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
      window.alert('Please choose a date in the future');
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
  const endDate = new Date(
    document.getElementById('datetime-picker').value
  ).getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerHTML =
      hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerHTML =
      minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML =
      seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
      clearInterval(timer);
      alert('Timer expired!');
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
