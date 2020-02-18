checkForChecked(getAllInputs());

function findLableForControl(el) {
    var idVal = el.id;
    labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == idVal)
            return labels[i];
    }
}

function getAllInputs() {
    let inputs = document.querySelectorAll('.radio');
    return inputs;

}
function checkForChecked(inputs) {
    inputs.forEach(function (input) {
        if (input.checked) {
            // console.log(findLableForControl(input).childNodes[1]);
            findLableForControl(input).childNodes[1].classList.add('circle--checked');

            // getElementsByTagName('svg').
        } else {
            findLableForControl(input).childNodes[1].classList.remove('circle--checked');
        }
    });

}



getAllInputs().forEach(function (input) {
    input.addEventListener('click', function () {

        checkForChecked(getAllInputs());
    });
});