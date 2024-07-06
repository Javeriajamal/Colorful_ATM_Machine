#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let usersBalance = 50000;
let usersPin = 1234;


// printing a welcome message to user
console.log(chalk.blue("\n\t Welcome to Javeria's ATM Machine!\n\t"));

 
// asking user to enter thier account's pin code
let PinCode = await inquirer.prompt([
    {
        name : "pin",
        type : "number",
        message : chalk.yellow ("Enter your Pin Code"),
    }
])   
     if (PinCode.pin === usersPin){
        console.log(chalk.green("Correct Pin, Login Successful"));
    
    // asking user to input/select operation
    let OperationInput = await inquirer.prompt([
        {
            name : "operations",
            type : "list",
            message : chalk.yellow("Select an operation"),
            choices : ["WithDraw Amount","Check balance"],
        }
    ])
    if (OperationInput.operations === "WithDraw Amount"){
        let WithdrawAns = await inquirer.prompt([
            {
                name : "WithdrawMethod",
                type : "list",
                message : chalk.yellow("Select your WithdrawalMethod:"),
                choices : ["Fast Cash", "Enter Amount"],
            }
        ])
        if(WithdrawAns.WithdrawMethod === "Fast Cash"){
            let FastcashAns = await inquirer.prompt([
                {
                    name : "FastCash",
                    type : "list",
                    message : chalk.yellow("Select an amount"),
                    choices : [10000,20000,30000,40000,50000],
                }
            ])
            if (FastcashAns.FastCash > usersBalance ) {
                console.log(chalk.red("In-sufficient Balance"));  
            }
            else{
                usersBalance -= FastcashAns.FastCash
                console.log(chalk.green(`${FastcashAns.FastCash} has been Withdraw Successfully!`));
                console.log(chalk.blue(`Your remaining balance is ${usersBalance}`));
            }
        }
        else if (WithdrawAns.WithdrawMethod === "Enter Amount"){
            let WithdrawAmount = await inquirer.prompt([
                {
                    name : "amount",
                    type : "number",
                    message : chalk.yellow("Enter amount you want to WithDraw:"),
                }
            ])
            if (WithdrawAmount.amount > usersBalance){
            console.log(chalk.red("Insufficient Balance!"));   
            } 
            else{ 
                usersBalance -= WithdrawAmount.amount;
                console.log(chalk.green(`${WithdrawAmount.amount}  has been Successfully Withdraw!`));
                console.log(chalk.blue(`Your remaining balance is ${usersBalance}`));
            }    
        }
        
    }   
    else if (OperationInput.operations === "Check balance") {
            console.log(chalk.blue(`Your account balance is: ${usersBalance}`));            
    }
}
else{
        console.log(chalk.red("In-correct Pin! Enter a Valid Pin Code"));
};