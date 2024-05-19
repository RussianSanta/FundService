class Fund {
    constructor(name, description, minAmount) {
        this.name = name;
        this.description = description;
        this.minAmount = parseFloat(minAmount);
        this.totalAmount = 0; // Новое поле суммы
    }
}

const funds = [];

function showForm(formId) {
    // Скрыть все формы
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.add('hidden');
    });
    // Показать выбранную форму
    document.getElementById(formId).classList.remove('hidden');

    // Обновить третью форму при открытии
    if (formId === 'myFundsForm') {
        updateMyFundsForm();
    }
}

function changeButtonColor(button) {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    button.style.backgroundColor = randomColor;
}

function createFund() {
    const nameInput = document.querySelector('#createFundForm input[type="text"]');
    const descriptionTextarea = document.querySelector('#createFundForm textarea');
    const minAmountInput = document.querySelector('#createFundForm input[type="number"]');
    
    const name = nameInput.value;
    const description = descriptionTextarea.value;
    const minAmount = minAmountInput.value;
    
    if (!name || !description || !minAmount) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }
    
    const newFund = new Fund(name, description, minAmount);
    funds.push(newFund);

    updateFundSelect();
    updateMyFundsForm(); // Обновляем третью форму

    // Очищаем поля ввода
    nameInput.value = '';
    descriptionTextarea.value = '';
    minAmountInput.value = '';

    // Выводим сообщение об успешном создании сбора
    alert('Сбор успешно создан!');
}


function updateFundSelect() {
    const fundSelect = document.getElementById('fundSelect');
    fundSelect.innerHTML = '<option value="" disabled selected>Выберите сбор</option>';

    funds.forEach((fund, index) => {
        const option = document.createElement('option');
        option.value = `fund${index + 1}`;
        option.textContent = fund.name;
        fundSelect.appendChild(option);
    });
}

function showFundInfoButton() {
    document.getElementById('fundInfoContainer').classList.remove('hidden');
    updateFundInfo();
}


function toggleFundInfo() {
    const fundInfoButton = document.getElementById('fundInfoButton');
    const fundInfo = document.getElementById('fundInfo');

    if (fundInfo.classList.contains('hidden')) {
        fundInfo.classList.remove('hidden');
        fundInfoButton.textContent = 'Скрыть';

        // Заполнение информации о сборе на основе выбранного значения
        updateFundInfo();
    } else {
        fundInfo.classList.add('hidden');
        fundInfoButton.textContent = 'Информация о сборе';
    }
}

function updateFundInfo() {
    const selectedFundIndex = document.getElementById('fundSelect').selectedIndex - 1;
    const selectedFund = funds[selectedFundIndex];

    if (selectedFund) {
        document.getElementById('fundName').textContent = selectedFund.name;
        document.getElementById('fundDescription').textContent = selectedFund.description;
        document.getElementById('fundMinAmount').textContent = selectedFund.minAmount;
    }
}

function updateMyFundsForm() {
    const fundsList = document.getElementById('fundsList');
    fundsList.innerHTML = ''; // Очищаем текущий список

    funds.forEach((fund, index) => {
        const fundBlock = document.createElement('div');
        fundBlock.className = 'fund-block';

        const fundInfo = `
            <p><strong>Название сбора:</strong> ${fund.name}</p>
            <p><strong>Описание сбора:</strong> ${fund.description}</p>
            <p><strong>Минимальная сумма перевода:</strong> ${fund.minAmount}</p>
            <p><strong>Текущая сумма:</strong> ${fund.totalAmount}</p>
        `;
        fundBlock.innerHTML = fundInfo;

        const requestPaymentButton = document.createElement('button');
        requestPaymentButton.textContent = 'Запросить выплату';
        requestPaymentButton.onclick = () => requestPayment(index);

        const closeFundButton = document.createElement('button');
        closeFundButton.textContent = 'Закрыть сбор';
        closeFundButton.onclick = () => closeFund(index);

        fundBlock.appendChild(requestPaymentButton);
        fundBlock.appendChild(closeFundButton);

        fundsList.appendChild(fundBlock);
    });
}



function requestPayment(index) {
    funds[index].totalAmount = 0;
    alert('Запрошен вывод денег');
    updateMyFundsForm();
}

function closeFund(index) {
    requestPayment(index); // Запрашиваем вывод денег
    funds.splice(index, 1); // Удаляем сбор из массива
    updateFundSelect(); // Обновляем выпадающий список в первой форме
    updateMyFundsForm(); // Обновляем третью форму
}


// Обновим третью форму при каждом добавлении нового сбора
function createFund() {
    const nameInput = document.querySelector('#createFundForm input[type="text"]');
    const descriptionTextarea = document.querySelector('#createFundForm textarea');
    const minAmountInput = document.querySelector('#createFundForm input[type="number"]');
    
    const name = nameInput.value;
    const description = descriptionTextarea.value;
    const minAmount = minAmountInput.value;
    
    if (!name || !description || !minAmount) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }
    
    const newFund = new Fund(name, description, minAmount);
    funds.push(newFund);

    updateFundSelect();
    updateMyFundsForm(); // Обновляем третью форму

    // Очищаем поля ввода
    nameInput.value = '';
    descriptionTextarea.value = '';
    minAmountInput.value = '';

    // Выводим сообщение об успешном создании сбора
    alert('Сбор успешно создан!');
}

function handlePayment() {
    const fundSelect = document.getElementById('fundSelect');
    const amountInput = document.querySelector('#paymentForm input[type="text"]');
    const selectedFundIndex = fundSelect.selectedIndex - 1;
    let balance = -1;
    
    if (window.ethereum==undefined) {
        alert('Please install MetaMask!');
        return;
    }
	ethereum
	    .request({method: 'eth_accounts'})
	        .then((address) => {
                console.log("Мой счет: "+ address[0]);		    
                let myaddress =[];
                    myaddress[0] = address[0];
                //-- Получаем информацию о балансе текущего счета пользователя 
                ethereum
                    .request({
                        method: 'eth_getBalance',
                        params: myaddress	
                        })
                        .then((result) => {
                            balance = parseInt(result, 16)/1e18
                            console.log("Баланс: " + balance);			
                        })
                        .catch((error) => {
                            console.log(error);					
                        });			
                })
	        .catch((error) => {
	            console.log(error);
	       });

    if (selectedFundIndex < 0) {
        alert('Пожалуйста, выберите сбор.');
        return;
    }

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Пожалуйста, введите корректную сумму больше нуля.');
        return;
    }

    const selectedFund = funds[selectedFundIndex];
    if (amount < selectedFund.minAmount) {
        alert('Сумма перевода должна быть больше или равна минимальной сумме перевода.');
        return;
    }

    if (amount > balance) {
        alert('Не хватает денежных средств на счету для перевода');
        return;
    }

    selectedFund.totalAmount += amount;
    amountInput.value = '';
    alert('Перевод успешно выполнен!');
}

