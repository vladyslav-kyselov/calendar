document.addEventListener('DOMContentLoaded', startMonth);
document.addEventListener('DOMContentLoaded', switchMonth);
let date = new Date();
let dayOfMonth, dayOfTheWeek, qualityDayInMonth, today = new Date(), day;

function startMonth() {
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    document.querySelector('.month').innerHTML = months[date.getMonth()]; //преобразовать номер месяца словом и вывести его
    document.querySelector('.year').innerHTML = date.getFullYear(); //вывод года
    dayOfTheWeek = date.getDay();

    let i = 1;
    while (i < dayOfTheWeek && i < 7 || dayOfTheWeek == 0 && i < 7) { //добавляем пустые div-ы
        dayOfMonth = document.createElement("DIV");
        dayOfMonth.className = 'date';
        document.getElementById("dayInMonth").appendChild(dayOfMonth);
        i++;
    }

    qualityDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //узнать сколько дней в текущем месяце
    for (let i = 1; i <= qualityDayInMonth; i++) {
        //заполнение месяца
        dayOfMonth = document.createElement("DIV");
        dayOfMonth.innerHTML = i;
        dayOfMonth.className = 'date';
        document.getElementById("dayInMonth").appendChild(dayOfMonth);
        day = today.getDate();
        if (i == day) { //отметить сегоднешний день цветом
            dayOfMonth.className = 'today';
        }
    }
}

function switchMonth() {   //переключатель месяцов
    this.addEventListener('click', function (e) {
        let switchMonths = e.target.getAttribute("data-index");
        if (switchMonths == 'right') { //если месяц назад
            date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        } else if (switchMonths == 'left') { //если месяц вперёд
            date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        }
        if (e.target.classList.contains('arrow')) { //если нажатие было на стрелку, то вызываем функцию
            changeMonth();
        }
    })
}

function changeMonth() {
    let removeMonth = document.querySelectorAll('.date');
    removeMonth.forEach(
        function (day) {
            day.remove()
        }); //удаляем предыдущий месяц
    let removeToday = document.querySelectorAll('.today');
    removeToday.forEach(
        function (today) {
            today.remove()
        }
    ); //удаляем выделение текущего дня

    document.querySelector('.month').innerHTML = months[date.getMonth()];
    document.querySelector('.year').innerHTML = date.getFullYear();

    dayOfTheWeek = date.getDay();
    let i = 1;
    while (i < dayOfTheWeek && i < 7 || dayOfTheWeek == 0 && i < 7) {
        dayOfMonth = document.createElement("DIV");
        dayOfMonth.className = 'date';
        document.getElementById("dayInMonth").appendChild(dayOfMonth);
        i++;
    }

    qualityDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= qualityDayInMonth; i++) {
        dayOfMonth = document.createElement("DIV");
        dayOfMonth.innerHTML = i;
        dayOfMonth.className = 'date';
        document.getElementById("dayInMonth").appendChild(dayOfMonth);
    }
}

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// console.log(x);
// console.log(x.getDate()); //день
// console.log(x.getDay());    //день в тижні
// console.log(x.getMonth());  //місяць
// console.log(month[x.getMonth()]);  //місяць
// console.log(x.getFullYear());  //рік
//сгенерировать 7 div, первой недели с числами.
// let prororor = new Date(2019,12,0).getDate();
// console.log("TEST= "+prororor);
