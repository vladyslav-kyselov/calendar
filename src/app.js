document.addEventListener('DOMContentLoaded', switchMonth);

function switchMonth() {   //переключатель месяцов
    let date = new Date();
    changeMonth(date); //первый месяц который появится при обновлении страницы
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    this.addEventListener('click', function (e) {
        let switchMonths = e.target.getAttribute("data-index");
        if (switchMonths == 'next') { //если месяц вперёд
            date.setMonth(date.getMonth() + 1);

        } else if (switchMonths == 'prev') { //если месяц назад
            date.setMonth(date.getMonth() - 1);
        }
        console.log('after ', date);
        if (e.target.classList.contains('arrow')) { //если нажатие было на стрелку, то вызываем функцию
            removeMonth();
            changeMonth(date);
        }
    })
}

function removeMonth() {
    let monthToRemove = document.querySelector('.flex');
    monthToRemove.innerHTML = '';
}

function changeMonth(date) {
    let dayOfMonth, dayOfTheWeek, qualityDayInMonth, day, today = new Date();

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
        addAndFillPrevMonth(date,dayOfMonth);
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        i++;
    } while (i < dayOfTheWeek && i <= 7 || dayOfTheWeek == 0 && i <= 6);

    qualityDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //узнать сколько дней в текущем месяце
    for (let i = 1; i <= qualityDayInMonth; i++) {
        //заполнение месяца
       addAndFillCurrentMonth(day,dayOfMonth,i,today);

    }
    let dayFromNextMonth = 43 - qualityDayInMonth - dayOfTheWeek;
    for (let i = 1; i <= dayFromNextMonth; i++) {  //добавить дни с следующего месяца в пустые места
        addAndFillNextMonth(dayOfMonth,i);
    }
}

function addAndFillPrevMonth(date,dayOfMonth) { // добавляем и заполняем предыдущий месяц
    dayOfMonth = document.createElement("DIV");
    dayOfMonth.innerHTML = date.getDate();
    dayOfMonth.className = 'no-active';
    document.getElementById("dayInMonth").appendChild(dayOfMonth);
}

function addAndFillCurrentMonth(day,dayOfMonth,i,today) { // добавляем и заполняем текущий месяц
    dayOfMonth = document.createElement("DIV");
    dayOfMonth.innerHTML = i;
    dayOfMonth.className = 'date';
    document.getElementById("dayInMonth").appendChild(dayOfMonth);
    day = today.getDate();
    if (i == day) { //отметить сегоднешний день цветом
        dayOfMonth.className = 'today';
    }
}

function addAndFillNextMonth(dayOfMonth,i) { //добавляем и заполняем следующий месяц
    dayOfMonth = document.createElement("DIV");
    dayOfMonth.innerHTML = i;
    dayOfMonth.className = 'no-active';
    document.getElementById("dayInMonth").appendChild(dayOfMonth);
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];