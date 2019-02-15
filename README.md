# CLI-inventory-database
A practice app using MySQL + the mysql node package to view and interact with a SQL database.

## About
This is a practice app using MySQL and the mysql node package to view and interact with a SQL database. The database is a mock inventory for a guitar store, and is manipulated through command line prompts. The customer js file allows users to "purchase" items and update the store's inventory. The manager js file allows users to view low stock, add stock, or create SQL rows for new items.

### Package Dependecies
* [MySQL](https://www.npmjs.com/package/mysql)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Colors](https://www.npmjs.com/package/colors)

## Documentation

### bamazonCustomer.js

![App Gif-1](/assets/customer_1.png)

Running bamazonCustomer.js will show the user the current inventory of purchaseable items, and prompt the user to enter the ID number of the item they wish to purchase. The next prompt will ask how many of the chosen item the user would like to purchase.


### bamazonManager.js

![App Gif-2](/assets/manager_1.png)

Running bamazonManager.js will display 4 options. "View Products..." will show the same inventory list as the customer view, except with a stock inventory column. "View Low Inventory" will show only products that have less than 5 stocked items.

![App Gif-3](/assets/manager_2.png)

"Add to Inventory" will allow a user to increase the stock of an item, similar to how customers purchase and remove items.

![App Gif-4](/assets/manager_3.gif)

Choosing "Add New Product" will prompt the user with several questions to obtain all the column information for a new item. This includes asking for the product description, department, price, and quantity. 

### Installation
1. Check if Node.js is installed by typing `node -v` into terminal or command prompt (or follow this [tutorial](https://www.youtube.com/watch?v=qZQmCfkmbNA))
2. Check if MySQL is installed or install with instructions [here](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
3. Clone or Download CLI-inventory-database respository
4. Open terminal or command prompt and navigate to the root folder, i.e. (`cd C:\Users\...\Desktop\CLI-inventory-database`)
5. Create local database by running `bamazon_db.sql` file inside a sql GUI such as [MySQL Workbench](https://www.mysql.com/products/workbench/)
6. Install node_module dependencies by typing `npm i` or `npm install`
7. Open a terminal at root folder of CLI-Word-Guess
8. Type `node bamazonCustomer` or `node bamazonManager`
9. Follow CLI prompts to interact with sql database
