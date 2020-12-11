let form = document.forms.reservationForm;

let btnRequestSending = form.elements.requestSending;

btnRequestSending.addEventListener('click', funcRequestSending);

function funcRequestSending(evt) {

    evt.preventDefault();

    let checkTel = /^\d[\d\(\)\ -]{4,14}\d$/;
    let checkMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let checkName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;

    let formData = new FormData();

    let roomCategorySelect = form.elements.roomCategory;
    let foodTypeSelect = form.elements.foodType;
    let arrivalDateValue = form.elements.arrivalDate.value;
    let departureDateValue = form.elements.departureDate.value;
    let userSurnameValue = form.elements.userSurname.value;
    let userNameValue = form.elements.userName.value;
    let mobileNumberValue = form.elements.mobileNumber.value;
    let eMailValue = form.elements.eMail.value;
    let adultsNumberValue = form.elements.adultsNumber.value;
    let childrenNumberValue = form.elements.childrenNumber.value;

    if (arrivalDateValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не указали дату заезда!',
            'error'
        )
        console.log('Дата заезда не введена');
    } else if (Date.parse(arrivalDateValue) < Date.now() || Date.parse(departureDateValue) < Date.now()) {
        Swal.fire(
            'Ошибка!',
            'Недопустимая дата!',
            'error'
        )
        console.log('Дата введена неверно');
    } else if (departureDateValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не указали дату выезда!',
            'error'
        )
        console.log('Дата выезда не введена');
    } else if (Date.parse(departureDateValue) <= Date.parse(arrivalDateValue)) {
        Swal.fire(
            'Ошибка!',
            'Недопустимая дата выезда!',
            'error'
        )
        console.log('Дата выезда меньше или равна дате заезда');
    } else if (userSurnameValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не ввели фамилию!',
            'error'
        )
        console.log('Фамилия не введена');
    } else if (!checkName.test(userSurnameValue)) {
        Swal.fire(
            'Ошибка!',
            'Неверный формат фамилии!',
            'error'
        )
        console.log('Фамилия введена неверно');
    } else if (userNameValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не ввели имя!',
            'error'
        )
        console.log('Имя не введено');
    } else if (!checkName.test(userNameValue)) {
        Swal.fire(
            'Ошибка!',
            'Неверный формат имени!',
            'error'
        )
        console.log('Имя введено неверно');
    } else if (mobileNumberValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не ввели номер телефона!',
            'error'
        )
        console.log('Телефон не введен');
    } else if (!checkTel.test(mobileNumberValue)) {
        Swal.fire(
            'Ошибка!',
            'Неверный формат номера телефона!',
            'error'
        )
        console.log('Телефон введен неверно');
    } else if (eMailValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не ввели e-mail!',
            'error'
        )
        console.log('e-mail не введен');
    } else if (!checkMail.test(eMailValue)) {
        Swal.fire(
            'Ошибка!',
            'Неверный формат e-mail!',
            'error'
        )
        console.log('e-mail введен неверно');
    } else if (adultsNumberValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не указали количество взрослых!',
            'error'
        )
        console.log('Количество взрослых не указано');
    } else if (childrenNumberValue == "") {
        Swal.fire(
            'Ошибка!',
            'Вы не указали количество детей!',
            'error'
        )
        console.log('Количество детей не указано');
    } else if (adultsNumberValue <= 0 || childrenNumberValue < 0 || (+adultsNumberValue + +childrenNumberValue) > 6 || (adultsNumberValue <= 0 && childrenNumberValue > 0)) {
        Swal.fire(
            'Ошибка!',
            'Недопустимое количество гостей!',
            'error'
        )
        console.log('Количество гостей указано неверно');
    } else {
        Swal.fire({
            title: 'Все данные верны?',
            html: "Дата заезда: " + arrivalDateValue +
                "<br>Дата выезда: " + departureDateValue +
                "<br>Фамилия: " + userSurnameValue +
                "<br>Имя: " + userNameValue +
                "<br>Телефон: " + mobileNumberValue +
                "<br>E-mail: " + eMailValue +
                "<br>Число взрослых: " + adultsNumberValue +
                "<br>Число детей: " + childrenNumberValue +
                "<br>Категория номера: " + (roomCategorySelect.options[roomCategorySelect.selectedIndex]).text +
                "<br>Питание: " + (foodTypeSelect.options[foodTypeSelect.selectedIndex]).text,
            showCancelButton: true,
            confirmButtonColor: '#0873B9',
            cancelButtonColor: '#8B1414',
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет'
        }).then((result) => {
            if (result.isConfirmed) {
                formData.append('arrivalDate', arrivalDateValue);
                formData.append('departureDate', departureDateValue);
                formData.append('userSurname', userSurnameValue);
                formData.append('userName', userNameValue);
                formData.append('mobileNumber', mobileNumberValue);
                formData.append('eMail', eMailValue);
                formData.append('adultsNumber', adultsNumberValue);
                formData.append('childrenNumber', childrenNumberValue);
                formData.append('roomCategory', (roomCategorySelect.options[roomCategorySelect.selectedIndex]).text);
                formData.append('foodType', (foodTypeSelect.options[foodTypeSelect.selectedIndex]).text);
                Swal.fire({
                    icon: 'success',
                    title: 'Ваши данные отправлены на обработку',
                    html: "Дата заезда: " + formData.get('departureDate') +
                        "<br>Дата выезда: " + formData.get('userSurname') +
                        "<br>Фамилия: " + formData.get('userName') +
                        "<br>Имя: " + formData.get('mobileNumber') +
                        "<br>Телефон: " + formData.get('eMail') +
                        "<br>E-mail: " + formData.get('arrivalDate') +
                        "<br>Число взрослых: " + formData.get('adultsNumber') +
                        "<br>Число детей: " + formData.get('childrenNumber') +
                        "<br>Категория номера: " + formData.get('roomCategory') +
                        "<br>Питание: " + formData.get('foodType'),
                    showConfirmButton: false,
                    timer: 4000
                })
                console.log('Данные: ' + '\nДата заезда: ' + formData.get('departureDate') +
                    '\nДата выезда: ' + formData.get('userSurname') +
                    '\nФамилия: ' + formData.get('userName') +
                    '\nИмя: ' + formData.get('mobileNumber') +
                    '\nТелефон: ' + formData.get('eMail') +
                    '\nE-mail: ' + formData.get('arrivalDate') +
                    '\nЧисло взрослых: ' + formData.get('adultsNumber') +
                    '\nЧисло детей: ' + formData.get('childrenNumber') +
                    '\nКатегория номера: ' + formData.get('roomCategory') +
                    '\nПитание: ' + formData.get('foodType') + '\nбыли отправлены.');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ваши данные не отправлены на обработку',
                    text: 'Вы не подтвердили данные!',
                    showConfirmButton: false,
                    timer: 4000
                })
                console.log('Данные не были отправлены');
            }
        })
    }
}