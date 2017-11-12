$(document).ready(function(){
    var search_text = $("#search_box").val();
    $("#HighToLow, #LowToHigh").click(function(){
        $.ajax({
            type: "GET",
            url: "http://localhost:17005/search/sortByPrice"+(this).id+"?search_text="+search_text,
            contentType:"application/json",
            success: function(response){
                $("#searchResultsTable").html(response);
            },
            error: function(response){
                alert("Sort did not work: " +response.data);
            }
        });
    });
    
});