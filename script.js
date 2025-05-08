const FORM_DATA = document.querySelector(".contact-form");
const ERROR_MESSAGE = "Ошибка!";
const SUCCESS_MESSAGE = "Заявка отправлена. С вами скоро свяжутся!";

FORM_DATA.addEventListener("submit", formSend);

async function formSend(event) {
  event.preventDefault();

  const TOKEN = "7982663094:AAFiT5xx6PhgwbvW2B1cCiiO068LfaJqZgc"; // TODO use token telegram bot
  const CHAT_ID = "-4649835652"; // TODO use chat_Id to telegram
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  let message = `
    <b>Госзакупки</b>
    <i>Имя</i>: <b>${this.name.value}</b>
    <i>Тел.</i>: <b>${this.tel.value}</b>
    <i>E-mail</i>: <b>${this.email.value}</b>
    <i>Вопрос</i>: <b>${this.question.value}</b>
    `;

  const response = await fetch(URI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "html",
    }),
  });

  const result = await response.json();

  if (result.ok) {
    showMessage(true);
    FORM_DATA.reset();
  } else {
    showMessage(false);
    console.log(result);
  }
}

function showMessage(isSuccess) {
  let alertMessage = document.querySelector(".alert-message");
  let text = document.querySelector(".alert-message p");
  let closeBtn = document.querySelector(".alert-message .close-btn");
  
  // Удаляем предыдущие классы
  alertMessage.classList.remove("alert-success", "alert-danger", "hide");
  
  // Добавляем нужные классы
  if (isSuccess) {
    alertMessage.classList.add("alert-success");
    text.textContent = SUCCESS_MESSAGE;
  } else {
    alertMessage.classList.add("alert-danger");
    text.textContent = ERROR_MESSAGE;
  }
  
  // Показываем сообщение
  alertMessage.classList.add("show");
  
  // Автоматически скрываем через 5 секунд
  setTimeout(() => {
    hideMessage();
  }, 5000);
  
  // Обработчик для кнопки закрытия
  closeBtn.addEventListener("click", hideMessage);
  
  function hideMessage() {
    alertMessage.classList.remove("show");
    alertMessage.classList.add("hide");
    
    // Удаляем обработчик события после использования
    closeBtn.removeEventListener("click", hideMessage);
  }
}