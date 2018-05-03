function toggleNavMenu(){
    $('.header').toggleClass('menu-expanded');
    $('.top-menu').toggleClass('collapse');
}

$(window).on('load',function(){
    $('.toggle-nav').click(toggleNavMenu)
});


//API calls

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

//Autocomplete

var json_categories = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"));
var json_area = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"));

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {

        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {  return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  var areas = [];

  for( i in json_area.meals){
      areas.push(json_area.meals[i].strArea);
  }
  areas.shift();

  var categories = [];

  for( i in json_categories.meals){
    categories.push(json_categories.meals[i].strCategory);
  }
  categories.shift();

  autocomplete(document.getElementById("area-input"),areas);
  autocomplete(document.getElementById("category-input"),categories);

//Form 

$('form').submit(function(ev){
    ev.preventDefault();

    if(document.getElementById("not-found")!=null){
        document.getElementById("not-found").remove();
    }

    var form = $(this).children('.autocomplete').children(".input");

    // TODO add suggestion for area and category finish search
    switch(form[0].id){
        case "name-input":
            var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/search.php?s="+form[0].value));

            if(json_obj.meals != null){
                div = document.createElement("div");
                div.setAttribute("id","meals");
                document.getElementById("container-form").appendChild(div);
                for(i in json_obj.meals){
                    pMeal = document.createElement("p");
                    pMeal.setAttribute("class","meal");
                    var strId = json_obj.meals[i].idMeal;
                    pMeal.setAttribute("id",strId);
                    pMeal.innerHTML = json_obj.meals[i].strMeal;
                    pMeal.setAttribute("onclick","showMeal(event," + strId+1 + ")");

                    hiddenDiv = document.createElement("div");
                    hiddenDiv.setAttribute("class","hidden-meal")
                    hiddenDiv.setAttribute("style","display: none")
                    strIdHidden = json_obj.meals[i].idMeal+1;
                    hiddenDiv.setAttribute("id", strIdHidden);

                    ingredientList = document.createElement("ol");
                    
                    var ingredients = [];
                    for(j =0;j<21;j++){
                        var pos = j;
                        pos++;
                        var ingredient = "strIngredient" + j;
                        if(json_obj.meals[i].ingredient != ""){
                            ingredients.push(json_obj.meals[i][ingredient]);
                        }
                    }
                    ingredients.shift();
                
                    for(k in ingredients){
                        if(ingredients[k]!=""&&ingredients[k]!=null){
                            var li = document.createElement('li');
                            li.innerHTML = ingredients[k];
                            ingredientList.appendChild(li);
                        }
                    }

                    var instructions = document.createElement("p");
                    var instructionStr = json_obj.meals[i].strInstructions;
                    instructionStr = instructionStr.replace(/(?:\r\n|\r|\n)/g, '<br>');
                
                    instructions.innerHTML = instructionStr;

                    hiddenDiv.appendChild(ingredientList);
                    hiddenDiv.appendChild(instructions);
                    document.getElementById("meals").appendChild(pMeal);
                    document.getElementById("meals").appendChild(hiddenDiv);
                }

            }else{
                pNotFound = document.createElement("h1");
                pNotFound.setAttribute("id","not-found");
                pNotFound.innerHTML = "Meal not found."
                document.getElementById("container-form").appendChild(pNotFound);
            }
        break;
        case "category-input":
            var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/filter.php?c="+form[0].value));

            if(json_obj.meals != null){
                div = document.createElement("div");
                div.setAttribute("id","meals");
                document.getElementById("container-form").appendChild(div);

                for(i in json_obj.meals){
                    pMeal = document.createElement("p");
                    pMeal.setAttribute("class","meal");
                    var strId = json_obj.meals[i].idMeal;
                    pMeal.setAttribute("id",strId);
                    pMeal.innerHTML = json_obj.meals[i].strMeal;
                    pMeal.setAttribute("onclick","showMeal(event," + strId+1 + ")");

                    hiddenDiv = document.createElement("div");
                    hiddenDiv.setAttribute("class","hidden-meal")
                    hiddenDiv.setAttribute("style","display: none")
                    strIdHidden = json_obj.meals[i].idMeal+1;
                    hiddenDiv.setAttribute("id", strIdHidden);

                    var json_meal = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/search.php?s="+json_obj.meals[i].strMeal));

                    ingredientList = document.createElement("ol");

                    var ingredients = [];
                    for(j =0;j<21;j++){
                        var pos = j;
                        pos++;
                        var ingredient = "strIngredient" + j;
                        if(json_meal.meals[0].ingredient != ""){
                            ingredients.push(json_meal.meals[0][ingredient]);
                        }
                    }
                    ingredients.shift();
                
                    for(k in ingredients){
                        if(ingredients[k]!=""&&ingredients[k]!=null){
                            var li = document.createElement('li');
                            li.innerHTML = ingredients[k];
                            ingredientList.appendChild(li);
                        }
                    }

                    var instructions = document.createElement("p");
                    var instructionStr = json_meal.meals[0].strInstructions;
                    instructionStr = instructionStr.replace(/(?:\r\n|\r|\n)/g, '<br>');
                
                    instructions.innerHTML = instructionStr;

                    hiddenDiv.appendChild(ingredientList);
                    hiddenDiv.appendChild(instructions);
                    document.getElementById("meals").appendChild(pMeal);
                    document.getElementById("meals").appendChild(hiddenDiv);
                }
            }else{
                pNotFound = document.createElement("h1");
                pNotFound.setAttribute("id","not-found");
                pNotFound.innerHTML = "Meal not found."
                document.getElementById("container-form").appendChild(pNotFound);
            }

        break;

        case "area-input":
            var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/filter.php?a="+form[0].value));
            div = document.createElement("div");
            div.setAttribute("id","meals");
            document.getElementById("container-form").appendChild(div);
            if(json_obj.meals != null){
                div = document.createElement("div");
                div.setAttribute("id","meals");
                for(i in json_obj.meals){
                    pMeal = document.createElement("p");
                    pMeal.setAttribute("class","meal");
                    var strId = json_obj.meals[i].idMeal;
                    pMeal.setAttribute("id",strId);
                    pMeal.innerHTML = json_obj.meals[i].strMeal;
                    pMeal.setAttribute("onclick","showMeal(event," + strId+1 + ")");

                    hiddenDiv = document.createElement("div");
                    hiddenDiv.setAttribute("class","hidden-meal")
                    hiddenDiv.setAttribute("style","display: none")
                    strIdHidden = json_obj.meals[i].idMeal+1;
                    hiddenDiv.setAttribute("id", strIdHidden);


                    var json_meal = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/search.php?s="+json_obj.meals[i].strMeal));

                    ingredientList = document.createElement("ol");

                    var ingredients = [];
                    for(j =0;j<21;j++){
                        var pos = j;
                        pos++;
                        var ingredient = "strIngredient" + j;
                        if(json_meal.meals[0].ingredient != ""){
                            ingredients.push(json_meal.meals[0][ingredient]);
                        }
                    }
                    ingredients.shift();
                
                    for(k in ingredients){
                        if(ingredients[k]!=""&&ingredients[k]!=null){
                            var li = document.createElement('li');
                            li.innerHTML = ingredients[k];
                            ingredientList.appendChild(li);
                        }
                    }

                    var instructions = document.createElement("p");
                    var instructionStr = json_meal.meals[0].strInstructions;
                    instructionStr = instructionStr.replace(/(?:\r\n|\r|\n)/g, '<br>');
                
                    instructions.innerHTML = instructionStr;

                    hiddenDiv.appendChild(ingredientList);
                    hiddenDiv.appendChild(instructions);
                    document.getElementById("meals").appendChild(pMeal);
                    document.getElementById("meals").appendChild(hiddenDiv);
                }
            }else{
                pNotFound = document.createElement("h1");
                pNotFound.setAttribute("id","not-found");
                pNotFound.innerHTML = "Meal not found."
                document.getElementById("container-form").appendChild(pNotFound);
            }

        break;
    }
})

function tab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("search");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    document.getElementById(tabName).style.display = "block";
    if(document.getElementById("meals") != null){
        document.getElementById("meals").remove();
    }
  }

  function showMeal(evt, mealID){
      $('#'+mealID).slideToggle();
  }