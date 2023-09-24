
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);
  // Wait until DOM is loaded before executing
  $(function () {
    // Get the current hour of the day using dayjs
    const currentHour = dayjs().format('H');
  // This function will apply the correct color for "past, present, or future" based on current time
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // The function below will save the user's input in a textarea to localStorage only when the save button corresponding to the block is clicked.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      })
      }
    // This function will refresh the color of the block each time depending on the past(grey), present(red), or future(green).
      function refreshColor() {
        $('.time-block').each(function() {
          const blockHour = parseInt(this.id);
          if (blockHour == currentHour) {
            $(this).removeClass('past future').addClass('present');
          } else if (blockHour < currentHour) {
            $(this).removeClass('future present').addClass('past');
          } else {
            $(this).removeClass('past present').addClass('future');
          }
        });
      }
    // This function will get the input from localStorage and update the block with textarea values
      $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
      });

      // This refreshed the time every second and can be shown at the header of the page.
      function updateTime() {
        const dateElement = $('#date');
        const timeElement = $('#time');
        const currentDate = dayjs().format('dddd, MMMM D, YYYY');
        const currentTime = dayjs().format('hh:mm:ss A');
        dateElement.text(currentDate);
        timeElement.text(currentTime);
      }

      // Call the three main functions to set up the page.
      hourlyColor();
      textEntry();
      refreshColor();
      // This will update the time once per second using setInterval()
      setInterval(updateTime, 1000);
  });