 //получаем данные из options.json в формате json , а за тем переводим в формат js
 
 let inputRub = document.querySelector('.rub'),
     inputUsd = document.querySelector('.usd');                                       //данные, которые нужно получить из JSON-файла

  inputRub.addEventListener('input', () =>{

    let request = new XMLHttpRequest(); // созданет нового запроса

        request.open('GET', 'options.json');                                          // метод open - обязателен
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');  // метод setRequestHeader
        request.send();                                                               // метод send в пост запросе ничего не передаем

        request.addEventListener('readystatechange', function(){                      // событие readystatechange
                                                                      
          if (request.readyState === 4 && request.status === 200) {                   // проверка статуса и readyState
            let data = JSON.parse(request.response);                                  // request.response - данные из options.json
                                                                                      // JSON.parse() - перевод в формат JS
            inputUsd.value = inputRub.value / data.usd;
          } else {
            inputUsd.value = 'Что-то пошло не так !!!';
          }
        });

  });
