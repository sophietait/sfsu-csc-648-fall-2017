$(document).ready(function(){
    var search_text = $("#search_box").val();

    $(".bedroom, .bathroom, .price").click(function(){
        $("#sort-by-"+$(this).attr('class')).val($(this).val());
        $("#sort-by-"+$(this).attr('class')).html($(this).text() + " <span class=\"caret\"></span>");
        $.ajax({
            type: "GET",
            url: "search/sortByPriceBedBath?search_text="+search_text+"&sortByPrice="+$("#sort-by-price").val()+"&bedroomValue="+$("#sort-by-bedroom").val()+"&bathroomValue="+$("#sort-by-bathroom").val(),
            contentType: "application/json",
            success: function(response){
                $("#searchResultsTable").html(response);
            },
            error: function(response){
                alert("Filter did not work: " +response.data);
            }
        });
    });
});
