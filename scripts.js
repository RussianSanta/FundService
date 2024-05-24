// Подключаем ethers.js
import { ethers } from "./ethers/dist/ethers.min.js";

if (window.ethereum==undefined) {
	alert('Пожалуйста, установите MetaMask!');
	console.log('Пожалуйста, установите MetaMask!')
}

// Инициализация ethers.js
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contractAddress = "0xf1d77F32ad7e6fAaD0c1FC06966f71CdE1157Aa7";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "closeFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_minAmount",
				"type": "uint256"
			}
		],
		"name": "createFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroyContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "FundClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "FundCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "requestWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "WithdrawalRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "funds",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "minAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundId",
				"type": "uint256"
			}
		],
		"name": "getFundDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFunds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserFunds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var contract = new ethers.Contract(contractAddress, contractABI, signer);;

// Класс для управления фондами
class Fund {
    constructor(name, description, minAmount, totalAmount) {
        this.name = name;
        this.description = description;
        this.minAmount = parseFloat(minAmount);
        this.totalAmount = parseFloat(totalAmount);
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

	// Обновить первую форму при открытии
	if (formId === 'paymentForm') {
		updateFundSelect()
	}
    // Обновить третью форму при открытии
    if (formId === 'myFundsForm') {
        updateMyFundsForm();
    }
}

async function createFund() {
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
    
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    try {
        const tx = await contract.createFund(name, description, minAmount, { from: account });
        await tx.wait();
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
    } catch (error) {
        console.error(error);
        alert('Ошибка при создании сбора.');
    }
}

async function updateFundSelect() {
	try {
		// Получение списка активных сборов
		const fundIds = await contract.getFunds();
		
		funds.length = 0; // Очищаем текущий массив фондов
		// Получение информации о каждом активном сборе
		for (let i = 0; i < fundIds.length; i++) {
			const fundId = fundIds[i];
			const fundInfo = await contract.funds(fundId); // Предполагается, что в контракте есть массив funds
			const fund = new Fund(fundInfo.name, fundInfo.description, fundInfo.minAmount);
			funds.push(fund);
		}

		// Обновление выпадающего списка
		const fundSelect = document.getElementById('fundSelect');
		fundSelect.innerHTML = '<option value="" disabled selected>Выберите сбор</option>';

		funds.forEach((fund, index) => {
			const option = document.createElement('option');
			option.value = `fund${index + 1}`;
			option.textContent = fund.name;
			fundSelect.appendChild(option);
		});
	} catch (error) {
		console.error('Ошибка при обновлении списка фондов:', error);
	}
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

async function updateMyFundsForm() {
    try {      
        // Получение списка активных сборов пользователя
        const userFundIds = await contract.getUserFunds();

        funds.length = 0; // Очищаем текущий массив фондов

        // Получение информации о каждом активном сборе пользователя
        for (let i = 0; i < userFundIds.length; i++) {
            const fundId = userFundIds[i];
            const fundInfo = await contract.funds(fundId); // Предполагается, что в контракте есть массив funds
			var totalAmount = fundInfo.totalAmount.toString().substring(0, fundInfo.totalAmount.toString().length-2)
            const fund = new Fund(fundInfo.name, fundInfo.description, fundInfo.minAmount, totalAmount);
            funds.push(fund);
        }

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
            requestPaymentButton.addEventListener('click', () => requestPayment(index));

            const closeFundButton = document.createElement('button');
            closeFundButton.textContent = 'Закрыть сбор';
            closeFundButton.addEventListener('click', () => closeFund(index));

            fundBlock.appendChild(requestPaymentButton);
            fundBlock.appendChild(closeFundButton);

            fundsList.appendChild(fundBlock);
        });
    } catch (error) {
        console.error('Ошибка при обновлении списка пользовательских фондов:', error);
    }
}

async function requestPayment(index) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    try {
        const tx = await contract.requestWithdrawal(index, { from: account });
        await tx.wait();
        funds[index].totalAmount = 0;
        alert('Запрошен вывод денег');
        updateMyFundsForm();
    } catch (error) {
        console.error(error);
        alert('Ошибка при запросе выплаты.');
    }
}

async function closeFund(index) {
    await requestPayment(index); // Запрашиваем вывод денег
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    try {
        const tx = await contract.closeFund(index, { from: account });
        await tx.wait();
        funds.splice(index, 1); // Удаляем сбор из массива
        updateFundSelect(); // Обновляем выпадающий список в первой форме
        updateMyFundsForm(); // Обновляем третью форму
    } catch (error) {
        console.error(error);
        alert('Ошибка при закрытии сбора.');
    }
}

async function handlePayment() {
    const fundSelect = document.getElementById('fundSelect');
    const amountInput = document.querySelector('#paymentForm input[type="text"]');
    const selectedFundIndex = fundSelect.selectedIndex - 1;
    let balance = -1;
    
    if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const userBalance = await provider.getBalance(account);
	balance = userBalance.toString().substring(0, userBalance.toString().length-2)
	console.log(balance)

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
        alert('Недостаточно средств на счету.');
        return;
    }

    try {
		var sum = "0x"+amount.toString(16)
        const tx = await contract.donate(selectedFundIndex, { from: account, value: sum });
        await tx.wait();
        selectedFund.totalAmount += amount;
        alert('Пожертвование успешно выполнено!');
        updateMyFundsForm();
    } catch (error) {
        console.error(error);
        alert('Ошибка при выполнении пожертвования.');
    }
}

document.getElementById("paymentFormButton").onclick = () => showForm('paymentForm')
document.getElementById("createFundFormButton").onclick = () => showForm('createFundForm')
document.getElementById("myFundsFormButton").onclick = () => showForm('myFundsForm')
document.getElementById("fundInfoButton").onclick = toggleFundInfo
document.getElementById("handlePaymentButton").onclick = handlePayment
document.getElementById("createFundButton").onclick = createFund
document.getElementById("fundSelect").onchange = showFundInfoButton