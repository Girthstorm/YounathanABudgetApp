import { moneyAmount, balance, setBudgetBtn, manageBtn, addExpenseBtn, expensesDiv, expensesDiv2, expenseName, taskCost, newExpenseBtn } from "../scripts/variables.js"


// Start Setting Budget
let budget = "0.00"

setBudgetBtn.addEventListener('click', () => {
    budget = formatNumber(Number(moneyAmount.value))
    localStorage.setItem("Budget", budget)
    initializeBudget()
    console.log("I ran")
    console.log(moneyAmount.value)
})

const formatNumber = (number) => {
    if (Number.isInteger(number)) {
        return number.toFixed(2);
    } else {

        return number.toFixed(2);
    }
}
// End setting budget 


const updateBudget = () => {
    balance.innerText = budget;
    localStorage.setItem("Budget", budget)
}

const saveExpense = (expense, cost) => {

    let expenses = JSON.parse(localStorage.getItem('Expenses')) || [];
    expenses.push({ expense, cost });
    localStorage.setItem('Expenses', JSON.stringify(expenses));
    console.log(expense,cost)
}





const addExpense = () => {
    const expense = expenseName.value;
    const costValue = parseFloat(taskCost.value);

    if (isNaN(costValue) || costValue <= 0) {
        alert('Please enter a valid cost.');
        return;
    }
    const formattedCost = formatNumber(costValue);
    budget = parseFloat(budget) - costValue;
    updateBudget();
    expensesDiv.innerHTML += `<div>${expense}: $${formattedCost}</div>`;
    // const expensesDiv2 = document.getElementById('expensesDiv2');
    const expensesElement = document.createElement('div');
    expensesElement.innerHTML = `${expense}: $${formattedCost} <button onclick="removeExpense(this, ${costValue})">Remove</button>`;
    console.log(expensesDiv2)
    expensesDiv2.appendChild(expensesElement);
    console.log(expense,costValue)
    saveExpense(expense, costValue);
}






const removeExpense = (button, cost) => {
    budget += parseFloat(cost);
    updateBudget();
    const expensesElement = button.parentNode;
    expensesDiv2.removeChild(expensesElement);
}







const loadExpenses = () => {
    let expenses = JSON.parse(localStorage.getItem('Expenses')) || [];
    expenses.forEach(expenseObj => {
        const { expense, cost } = expenseObj;
        const formattedCost = formatNumber(cost);

        
        expensesDiv.innerHTML += `<div>${expense}: $${formattedCost}</div>`;

        
        
        const expensesElement = document.createElement('div');
        expensesElement.innerHTML = `${expense}: $${formattedCost} <button onclick="removeExpense(this, ${cost})">Remove</button>`;
        expensesDiv2.appendChild(expensesElement);
    });
}






newExpenseBtn.addEventListener('click', () => {
    addExpense()
})









const initializeBudget = () => {
    if (localStorage.getItem("Budget") != null) {
        budget = localStorage.getItem("Budget")
    }
    balance.innerText = budget;

}





const onLoad = () => {
    initializeBudget()
    loadExpenses()
}

onLoad()
