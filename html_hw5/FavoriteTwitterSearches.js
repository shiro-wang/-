// Fig. 11.19: FavoriteTwitterSearchs.js
// Storing and retrieving key-value pairs using 
// HTML5 localStorage and sessionStorage
var datas; // array of tags for queries
// loads previously saved searches and displays them in the page
function loadSearches() {
    if (!window.sessionStorage.getItem("herePreviously")) {
        sessionStorage.setItem("herePreviously", "true");
        document.getElementById("welcomeMessage").innerHTML =
           "Welcome to the company data app";
    } // end if

    var length = localStorage.length; // number of key-value pairs
    datas = []; // create empty array

    // load all keys
    for (var i = 0; i < length; ++i) {
        datas[i] = localStorage.key(i);
    } // end for

    // datas.sort(); // sort the keys

    // build list of company and product
    var results = "<table class=\"styled-table\";>" +
      "<thead><th>Name</th><th>Asset</th><th>Liability</th><th>Revenue</th><th>Expense</th><th>Date</th><th>Sale Product</th><th>Give Salary</th></thead><tbody>";
    var product_results = "<table class=\"styled-table\";><thead><th>Company Name</th><th>Product Name</th><th>Number</th><th>Price</th><th>Date</th></thead><tbody>";
    for (var data in datas) {
        if (datas[data] != "Product"){
            var com_obj = JSON.parse(localStorage.getItem(datas[data]));
            results += "<tr><td>"+ com_obj.name + "</td><td>" + com_obj.asset + "</td><td>" + com_obj.liability + 
            "</td><td>" + com_obj.revenue + "</td><td>" + com_obj.expense + "</td><td>" + com_obj.date ;

            results += "<th><input id = '" + datas[data] + "' type = 'button' " + "value = 'Product' onclick = 'editProduct(id)'></th>" +
                        "<th><input id = '" + datas[data] + "' type = 'button' " + "value = 'Salary' onclick = 'editSalary(id)'></th></tr>";
        }else{
            var product_obj = JSON.parse(localStorage.getItem(datas[data]));
            var p_length = product_obj.length;
            for (var i = 0; i < p_length; i++){
                product_results += "<tr><td>"+ product_obj[i].product_cname + "</td><td>" + product_obj[i].product_name + "</td><td>" + product_obj[i].product_number + 
                "</td><td>" + product_obj[i].product_price + "</td><td>" + product_obj[i].product_date +"</td></tr>";
            }
        }
    } // end for
    results += "</tbody></table>";
    document.getElementById("searches").innerHTML = results;
    
    product_results += "</tbody></table>";
    document.getElementById("product_searches").innerHTML = product_results;

} // end function loadSearches

// deletes all key-value pairs from localStorage
function clearAllSearches() {
    localStorage.clear();
    loadSearches(); // reload searches
} // end function clearAllSearches

// saves a newly tagged search into localStorage
function saveSearch() {
    var name = document.getElementById("name");
    var asset = document.getElementById("asset");
    var liability = document.getElementById("liability");
    var revenue = 10;
    var expense = 0;
    var current = new Date();
    var new_com_obj={"name": name.value, "asset":parseInt( asset.value ), "liability":parseInt( liability.value ), "revenue":revenue, "expense":expense, "date":current.toString()};
    var new_com_str = JSON.stringify(new_com_obj);
    localStorage.setItem(name.value, new_com_str);
    name.value = "";
    asset.value = "";
    liability.value = "";
    loadSearches(); // reload searches
} // end function saveSearch

// deletes a specific key-value pair from localStorage
function deleteTag(tag) {
    localStorage.removeItem(tag);
    loadSearches(); // reload searches
} // end function deleteTag

// display existing tagged query for editing
function editProduct(company_name) {
    document.getElementById("product_cname").value = company_name;
    loadSearches(); // reload searches
} // end function editTag

// display existing tagged query for editing
function editSalary(company_name) {
    document.getElementById("product_cname").value = company_name;
    loadSearches(); // reload searches
} // end function editTag

function saveproduct(){
    var cname = document.getElementById("product_cname");
    var pname = document.getElementById("product_name");
    var pnum = document.getElementById("product_number");
    var pprice = document.getElementById("product_price");
    var current = new Date();
    // save products list
    var product_obj = [];
    if(localStorage.getItem("Product") !== null){
        product_obj = JSON.parse(localStorage.getItem("Product"));
    }
    var new_product_obj={"product_cname":cname.value, "product_name":pname.value, "product_number":parseInt( pnum.value ), "product_price":parseInt( pprice.value ), "product_date":current.toString()};
    product_obj.push(new_product_obj);
    var new_product_str = JSON.stringify(product_obj);
    localStorage.setItem("Product", new_product_str); 
    //end save product

    // modify company situation
    var com_obj = JSON.parse(localStorage.getItem(cname.value));
    document.getElementById("welcomeMessage").innerHTML = com_obj.revenue;
    com_obj.revenue += parseInt( pprice.value ) * parseInt( pnum.value );
    var com_str = JSON.stringify(com_obj);
    localStorage.setItem(com_obj.name, com_str);
    // end modify
    cname.value = "";
    pname.value = "";
    pnum.value = "";
    pprice.value = "";
    loadSearches();
}

// register event handlers then load searches
function start() {
    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", saveSearch, false);
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearAllSearches, false);
    document.getElementById("product_saveButton").addEventListener("click", saveproduct, false);
    loadSearches(); // load the previously saved searches
} // end function start

window.addEventListener("load", start, false);

/*************************************************************************
* (C) Copyright 1992-2012 by Deitel & Associates, Inc. and               *
* Pearson Education, Inc. All Rights Reserved.                           *
*                                                                        *
* DISCLAIMER: The authors and publisher of this book have used their     *
* best efforts in preparing the book. These efforts include the          *
* development, research, and testing of the theories and programs        *
* to determine their effectiveness. The authors and publisher make       *
* no warranty of any kind, expressed or implied, with regard to these    *
* programs or to the documentation contained in these books. The authors *
* and publisher shall not be liable in any event for incidental or       *
* consequential damages in connection with, or arising out of, the       *
* furnishing, performance, or use of these programs.                     *
**************************************************************************/