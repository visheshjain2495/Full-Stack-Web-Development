$(document).ready(function(){
    $("h1").addClass("big-title margin");
    $("button").click(function(){
        $("h1").css("color", "purple");
        $("h1").html("<em>Hello</em>");
    });

    $(document).keydown(function(event){
        $("h1").html("<em>" + event.key + "</em>");
    });
});

