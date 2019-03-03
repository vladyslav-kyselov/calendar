document.addEventListener('DOMContentLoaded', switchMonths);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function switchMonths() {   //переключатель месяцов
    let date = new Date();
    changeMonth(date); //первый месяц который появится при обновлении страницы
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    initChangeMonths(date);
}

function initChangeMonths(date) {
    this.addEventListener('click', function (e) {
        switchMonth(date, e);
        if (e.target.classList.contains('arrow')) { //если нажатие было на стрелку, то вызываем функцию
            removeMonth();
            changeMonth(date);
        }
    });
}

function switchMonth(date, e) {
    let direction = e.target.getAttribute("data-index");
    if (direction == 'next') { //если месяц вперёд
        date.setMonth(date.getMonth() + 1);
    } else if (direction == 'prev') { //если месяц назад
        date.setMonth(date.getMonth() - 1);
    }
}

function removeMonth() {
    let monthToRemove = document.querySelector('.flex');
    monthToRemove.innerHTML = '';
}

function changeMonth(date) {
    let dayOfTheWeek, qualityDayInMonth, today = new Date();

    date = new Date(date.getFullYear(), date.getMonth(), 1);
    document.querySelector('.month').innerHTML = months[date.getMonth()];
    document.querySelector('.year').innerHTML = date.getFullYear();

    dayOfTheWeek = date.getDay(); //какой день недели 1 число месяца
    let i = 1;
    do {     // добавляем дни с предыдущего месяца
        if (dayOfTheWeek == 0) {
            dayOfTheWeek = 7;
            date.setDate(date.getDate() - dayOfTheWeek + i);
        } else if (dayOfTheWeek > 1) {
            date.setDate(date.getDate() - dayOfTheWeek + i);
        } else if (dayOfTheWeek == 1) {
            dayOfTheWeek = 8;
            date.setDate(date.getDate() - dayOfTheWeek + i);
        }
        addAndFillPrevMonth(date, {
            dayOfMonth: date.getDay(),
        });
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        i++;
    } while (i < dayOfTheWeek && i <= 7 || dayOfTheWeek == 0 && i <= 6);

    qualityDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //узнать сколько дней в текущем месяце
    for (let i = 1; i <= qualityDayInMonth; i++) {
        //заполнение месяца
        addAndFillCurrentMonth({
            dayOfMonth: date.getDay(),
            index: i,
            day: today.getDate(),
        });

    }

    let dayFromNextMonth = 43 - qualityDayInMonth - dayOfTheWeek;
    for (let i = 1; i <= dayFromNextMonth; i++) {  //добавить дни с следующего месяца в пустые места
        addAndFillNextMonth({
            dayOfMonth: date.getDay(),
            index: i,
        });
    }
}

function addAndFillPrevMonth(date, options) { // добавляем и заполняем предыдущий месяц
    options.dayOfMonth = document.createElement("DIV");
    options.dayOfMonth.innerHTML = date.getDate();
    options.dayOfMonth.className = 'no-active';
    document.getElementById("dayInMonth").appendChild(options.dayOfMonth);
}

function addAndFillCurrentMonth(options) { // добавляем и заполняем текущий месяц
    options.dayOfMonth = document.createElement("DIV");
    options.dayOfMonth.innerHTML = options.index;
    options.dayOfMonth.className = 'date';
    document.getElementById("dayInMonth").appendChild(options.dayOfMonth);
    if (options.index == options.day) { //отметить сегоднешний день цветом
        options.dayOfMonth.className = 'today';
    }
}

function addAndFillNextMonth(options) { //добавляем и заполняем следующий месяц
    options.dayOfMonth = document.createElement("DIV");
    options.dayOfMonth.innerHTML = options.index;
    options.dayOfMonth.className = 'no-active';
    document.getElementById("dayInMonth").appendChild(options.dayOfMonth);
}
