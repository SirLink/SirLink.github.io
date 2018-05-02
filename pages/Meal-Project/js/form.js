function toggleNavMenu(){
    $('.header').toggleClass('menu-expanded');
    $('.top-menu').toggleClass('collapse');
}

$(window).on('load',function(){
    $('.toggle-nav').click(toggleNavMenu)
});


$('.about').click(function(){
    $('.hidden-panel').slideToggle();
  });
  
$('.hidden-panel').click(function(){
    $('.hidden-panel').slideUp();
});
  

//Form 

$('form').submit(function(ev){
    ev.preventDefault();

    var newP = document.createElement("p");
    var name = document.getElementById('name').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;

    newP.innerHTML = "Thank you " + name + " " + lname + " for subscribing! We will send you some meals to " + email;
    newP.setAttribute("class","form-text")

    if($('.form-text').length){
        var previousText = document.getElementsByClassName("form-text");
        document.getElementById("container-form").removeChild(previousText[0]);
    }
    document.getElementById("container-form").appendChild(newP);

    document.getElementById("form").reset();
})