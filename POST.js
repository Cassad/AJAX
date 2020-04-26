// класс AJAX - запроса методом POST

  class GetForm {

    constructor(form_class, input_class) {
      this.form = document.querySelector(form_class);
      this.input = this.form.querySelectorAll(input_class);
      this.div = document.createElement('div');
      this.request = new XMLHttpRequest();
      this.message = {
        loading: 'Загрузка',
        succsess: 'Ваш запрос обрабатывается',
        fail: 'Что-то пошло не так !!!'
      };
    }
    sendReq() {                                             // метод POST
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();                                 // отмена отправки формы по-кмолчанию
        this.form.appendChild(this.div);

        this.request.open('POST', 'server.php');                                          // метод open() - обязателен
        this.request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let obj = {};                                   // создаем пустой объект для помещения в него данных из формы

        let formData = new FormData(this.form);         // создаем новый экземляр класса FormData и помещаем в него нашу форму


        formData.forEach((key, value) => {              // заполняем пустой объект данными из формы
          obj[key] = value;
        });

        let json = JSON.stringify(obj);                  // методом stringify переводим данные в формат json

        this.request.send(json);                         // методом send() отправляем данные на сервер

        this.request.addEventListener('readystatechange', () => { // проверка статуса и readyState
          if (this.request.readyState < 4) {
            this.div.innerHTML = this.message.loading;
          } else if (this.request.readyState === 4 && this.request.status == 200) {
            this.div.innerHTML = this.message.succsess;
          } else {
            this.div.innerHTML = this.message.fail;
          }
        });
        for (let i = 0; i < this.input.length; i++)                  // очистка input'ов
          this.input[i].value = '';
        }
      });
    }


  }

  let form_2 = new GetForm('#form', 'input');

  form_2.sendReq();

  let form_1 = new GetForm('.main-form', 'input');

  form_1.sendReq();
