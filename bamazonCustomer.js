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
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ITEM ID: ${res[i].item_id} || ${res[i].product_name} || Price: ${res[i].price}`.green
      );
    }
    console.log("\n");
    purchaseItems(res);
  });
}

function purchaseItems(res) {
  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "What is the ITEM ID of the product you would like to buy? (enter a number)"
          .yellow,
        validate: function validateInt(name) {
          var reg = /^[0-9]+$/;
          return reg.test(name) || "Error, please enter a valid number";
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase? (enter a number)".yellow,
        validate: function validateInt(name) {
          var reg = /^[0-9]+$/;
          return reg.test(name) || "Error, please enter a valid number".red;
        }
      }
    ])
    .then(function(answer) {
      var itemIndex = parseInt(answer.itemID) - 1;
      var itemQuantity = parseInt(answer.quantity);
      var currentStock = parseInt(res[itemIndex].stock_quantity);

      console.log(`\nYou selected ${res[itemIndex].product_name}`.cyan);

      if (currentStock >= itemQuantity) {
        console.log(
          `\nItem(s) purchased! Your total is: $${res[itemIndex].price *
            itemQuantity}\n`.underline.green
        );
        updateStock(currentStock, itemIndex, itemQuantity);
      } else {
        console.log("Insufficient quanity!".red);
      }
    });
}

function updateStock(stock, index, quant) {
  connection.query(
    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [stock - quant, index + 1],
    function(err) {
      if (err) throw err;
      console.log("Stock updated!".gray);
      connection.end();
    }
  );
}
