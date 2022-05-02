$("#increaseNum").waypoint(
  function () {
    increment(1, 69);
  },
  { offset: "75%" }
);

function increment(elem, finalVal) {
  var currVal = parseInt(document.getElementById(elem).innerHTML, 10);
  if (currVal < finalVal) {
    currVal++;
    document.getElementById(elem).innerHTML = currVal + "%";

    setTimeout(function () {
      increment(elem, finalVal);
    }, 40);
  }
}
