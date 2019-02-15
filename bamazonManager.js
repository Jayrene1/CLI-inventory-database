var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "siviradc",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id ".grey + connection.threadId);
  managerPrompt();
});

function managerPrompt() {
  inquirer
    .prompt({
      name: "cmd",
      type: "list",
      message: "What would you like to do?".yellow,
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.cmd) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ITEM ID: ${res[i].item_id} || ${res[i].product_name} || Price: ${
          res[i].price
        } || Quantity: ${res[i].stock_quantity}`.green
      );
    }
    console.log("\n");
    connection.end();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    res
  ) {
    if (err) throw err;
    console.log("\n");
    if (res[0] !== undefined) {
      console.log("THE FOLLOWING ITEMS NEED TO BE RESTOCKED:\n".underline.gray);
      for (var i = 0; i < res.length; i++) {
        console.log(
          `ITEM ID: ${res[i].item_id} || ${res[i].product_name} || Price: ${
            res[i].price
          } || Quantity: ${res[i].stock_quantity}`.red
        );
      }
    } else {
      console.log("No low inventory. The store is well stocked!".green);
    }
    console.log("\n");
    connection.end();
  });
}

function addToInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ITEM ID: ${res[i].item_id} || ${res[i].product_name} || Price: ${
          res[i].price
        } || Quantity: ${res[i].stock_quantity}`.green
      );
    }
    console.log("\n");
    
    inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "What is the ITEM ID of the product you would like to restock? (enter a number)"
          .yellow,
        validate: function validateInt(name) {
          var reg = /^[0-9]+$/;
          return reg.test(name) || "Error, please enter a valid number";
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many items would you like to add to the inventory? (enter a number)"
          .yellow,
        validate: function validateInt(name) {
          var reg = /^[0-9]+$/;
          return reg.test(name) || "Error, please enter a valid number".red;
        }
      }
    ])
    .then(function(answer) {
      var itemQuantity = parseInt(answer.quantity);
      connection.query(
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
        [itemQuantity, answer.itemID],
        function(err) {
          if (err) throw err;
          console.log("Stock updated!".gray);
          connection.end();
        }
      );
    });
  });

}

function addProduct() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is your product's name?".yellow
      },
      {
        name: "department",
        type: "list",
        message: "Which department does your product belong to?".yellow,
        choices: ["Books", "Accessories", "Amplifiers", "Guitars"]
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the product? (enter a number)".yellow
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of the products would you like to stock? (enter a number)"
          .yellow,
        validate: function validateInt(name) {
          var reg = /^[0-9]+$/;
          return reg.test(name) || "Error, please enter a valid number".red;
        }
      }
    ])
    .then(function(answer) {
      var price = parseFloat(answer.price);
      var quant = parseInt(answer.quantity);
      connection.query(
        `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${
          answer.name
        }", "${answer.department}", ${price}, ${quant})`,
        function(err, res) {
          if (err) throw err;
          console.log("Product added!".gray);
        }
      );
    });
}
