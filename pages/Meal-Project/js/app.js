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

//popullate slides

var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/latest.php"));

for(i in json_obj.meals){
    var pos = i;
    pos++;
    var newDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var numberContent = document.createTextNode(pos + "/" + json_obj.meals.length);
    var newImg = document.createElement("img");
    var newP = document.createElement("p");
    var infoDiv = document.createElement("div");
    var ol = document.createElement("ol");

    newP.innerHTML = json_obj.meals[i].strMeal;
    newP.setAttribute("class","bottom-center");

    newDiv.setAttribute("class","meal-slide");   
    numberDiv.setAttribute("class","numbertext");
    
    numberDiv.appendChild(numberContent);

    newImg.setAttribute("src", json_obj.meals[i].strMealThumb);
    newImg.setAttribute("class", "card");

    newDiv.appendChild(numberDiv);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newP);

    infoDiv.setAttribute("class","hidden-info");
    infoDiv.setAttribute("id","info-container");
    infoDiv.setAttribute("style","display: none");
    ol.setAttribute("id","ingredients");
    
    infoDiv.appendChild(ol);
    newDiv.appendChild(infoDiv);

    var idMeal = json_obj.meals[i].idMeal;

    var json_meal = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idMeal));

    var list = document.createElement("ol")
    var ingredients = [];
    for(i =0;i<21;i++){
        var pos = i;
        pos++;
        var ingredient = "strIngredient" + i;
        if(json_meal.meals[0].ingredient != ""){
            ingredients.push(json_meal.meals[0][ingredient]);
        }
    }
    ingredients.shift();

    for(i in ingredients){
        if(ingredients[i]!=""&&ingredients[i]!=null){
            var li = document.createElement('li');
            li.innerHTML = ingredients[i];
            ol.appendChild(li);
        }
    }

    var instructions = document.createElement("p");
    var instructionStr = json_meal.meals[0].strInstructions;
    instructionStr = instructionStr.replace(/(?:\r\n|\r|\n)/g, '<br>');

    instructions.innerHTML = instructionStr;
    instructions.setAttribute("class","stylized")

    infoDiv.appendChild(instructions);

    var gal = document.getElementById("gallery");
    var button = document.getElementById("button");
    gal.insertBefore(newDiv,button);
    

}


// Slide gallery

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("meal-slide");
  // var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  $('.hidden-info').slideUp();
  $(slides[slideIndex-1]).fadeIn();
  // slides[slideIndex-1].style.display = "block";
  // captionText.innerHTML = json_obj.meals[slideIndex-1].strMeal;
}

//How to prepare

$('#info').click(function(){
  $('.hidden-info').slideToggle();
})
