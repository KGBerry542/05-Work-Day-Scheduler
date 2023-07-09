$(document).ready(function () {
  let currentDate = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentDate);

  $(".saveBtn").on("click", function () {
    let hour = $(this).parent().attr("id");
    let description = $(this).siblings(".description").val();
    localStorage.setItem(hour, description);
  });

  $(".time-block").each(function () {
    let hour = $(this).attr("id");
    let savedDescription = localStorage.getItem(hour);
    if (savedDescription !== null) {
      $(this).find(".description").val(savedDescription);
    }
  });

  function updateTimeBlocks() {
    let currentHour = moment().hour();
    $(".time-block").each(function () {
      let blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past future");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past present");
      }
    });
  }

  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);
});
