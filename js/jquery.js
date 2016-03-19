$(function(){
   // function for animating search field and submit button 
     $(".searchField").on("focus",function(){
        
         $(this).animate({
             width: "100%"
         },400);
        
         $("#searchBtn").animate({
             right: "2px"
         })
         
     });
  // function for animating search field and submit button    
     $(".searchField").on("blur",function(){
         
         var self = this;
         
         if($(self).val() == ""){
             
             $(self).animate({
                 width: "45%"
             });
             
           $("#searchBtn").animate({
               right: "350px"
           });
             
         } 
     });
 //preventing default behavior for submint   
     $("#searchForm").on("submit",function(e){
        
         e.preventDefault();
         
     })
//calling fancy box 
     $(".fancybox").fancybox();

});



//giving result(videos)
function search(){
//starting html is set to ''    
     $("#result").html('');
     $("#buttons").html('');
    
//q is equal to search form value  
     q = $("#query").val();
// get request to the youtube search api
   $.get("https://www.googleapis.com/youtube/v3/search",{
//params for receiving data along with key from console developer for youtybe api      
       part: "snippet, id",
       type: "video",
       q: q,
       key: "AIzaSyABG3BG8M9XmsXMrozziXsam5bvv6dHpA0"
   }, function(data){
//vars for page tokens, previous and next
       var nextPage = data.nextPageToken;
       var prevPage = data.prevPageToken;
 //each data item is param for function getOutput which is equal to var output that is appent to div with id result       
       $.each(data.items, function(i, item){
         
           var output = getOutput(item);
           
           $("#result").append(output);
              
      });
 // page tokens are param for getButtons function which is value of var buttons append to div with id buttons       
       var buttons = getButtons(prevPage,nextPage);
       
       $("#buttons").append(buttons);
   });  
}



// giving data for next page
function nextPage(){
//token have value of the data-token from getButtons fn   
     var token = $("#nextButton").data("token");
//token have value of the data-query from getButtons fn   
     var q = $("#nextButton").data("query");
    
//starting html is set to ''       
     $("#result").html('');
     $("#buttons").html('');
    
//q is equal to search form value
     q = $("#query").val();
// get request to the youtube search api   
   $.get("https://www.googleapis.com/youtube/v3/search",{
//params for receiving data along with key from console developer for youtybe api      
       part: "snippet, id",
       type: "video",
       q: q,
       pageToken: token,// passing the nextPageToken
       key: "AIzaSyABG3BG8M9XmsXMrozziXsam5bvv6dHpA0"
   }, function(data){
//vars for page tokens, previous and next   
       var nextPage = data.nextPageToken;
       var prevPage = data.prevPageToken;
//each data item is param for function getOutput which is equal to var output that is appent to div with id result          
       $.each(data.items, function(i, item){
         
           var output = getOutput(item);
           
           $("#result").append(output);
              
      });
// page tokens are param for getButtons function which is value of var buttons append to div with id buttons              
       var buttons = getButtons(prevPage,nextPage);
       
       $("#buttons").append(buttons);
   });  
}



//giving data for prev page
function prevPage(){
//token have value of the data-token from getButtons fn      
    var token = $("#prevButton").data("token");
//token have value of the data-query from getButtons fn 
    var q = $("#prevButton").data("query");
    
//starting html is set to ''   
     $("#result").html('');
     $("#buttons").html('');
    
//q is equal to search form value   
     q = $("#query").val();
// get request to the youtube search api     
   $.get("https://www.googleapis.com/youtube/v3/search",{
//params for receiving data along with key from console developer for youtybe api            
       part: "snippet, id",
       type: "video",
       q: q,
       pageToken: token,// passing the prevPage token
       key: "AIzaSyABG3BG8M9XmsXMrozziXsam5bvv6dHpA0"
   }, function(data){
//vars for page tokens, previous and next         
       var nextPage = data.nextPageToken;
       var prevPage = data.prevPageToken;
//each data item is param for function getOutput which is equal to var output that is appent to div with id result      
       $.each(data.items, function(i, item){
         
           var output = getOutput(item);
           
           $("#result").append(output);
              
      });
// page tokens are param for getButtons function which is value of var buttons append to div with id buttons         
       var buttons = getButtons(prevPage,nextPage);
       
       $("#buttons").append(buttons);
   });  
}
    
 

// this fn is value of the var output in search fn
function getOutput(item){
 // params for video received from get request   
      var videoId = item.id.videoId;
      var title = item.snippet.title;
      var description = item.snippet.description;
      var thumb = item.snippet.thumbnails.high.url;
      var channelTitle = item.snippet.channelTitle;
      var title = item.snippet.title;
      var title = item.snippet.title;
      var videoDate = item.snippet.publishedAt;
    
    
 // li for ul result(displaying result)
    var output = 
       "<li>" + 
       "<div class='list-left'>" +
       "<img src='"+thumb+"'/>" + 
       "</div>" +
       "<div class='list-right'>" + 
       "<h3><a class='fancybox fancybox.iframe'"+
       "href='http://www.youtube.com/embed/" + videoId + "'>" 
        + title + "</a></h3>" + 
       "<small>By <span class='cTitle'>" + 
       channelTitle + "</span>" + 
       " on " + videoDate + "</small>" + 
       "<p>" + description + "</p>" +
       "</div>" +
       "</li>" +
       "<div class='clearboth'></div>";
//returns value     
     return output;    
    
}



//function for displaying buttons for next and prev page
function getButtons(prevPageToken,nextPageToken){
//if theres no prevPageToken   
    if(!prevPageToken){
        
    var btnOutput = 
//var btnOutput contain data-token which is nextPageToken and query received from div query value     
     "<div class='btnCont'>" + 
     "<button id='nextButton' class='pagBtn'" +
     "data-token='" + nextPageToken + "'" +
     "data-query='" + q + "'" + 
     "onclick='nextPage()'>Next page</button></div>";
    
    }else{
 //var btnOutput contain data-token which is nextPageToken and query received from div query value          
 //var btnOutput contain data-token which is prevPageToken and query received from div query value          
     var btnOutput = 
         
     "<div class='btnCont'>" + 
     "<button id='prevButton' class='pagBtn'" +
     "data-token='" + prevPageToken + "'" +
     "data-query='" + q + "'" + 
     "onclick='prevPage()'>Prev page</button>" +
     
     "<button id='nextButton' class='pagBtn'" +
     "data-token='" + nextPageToken + "'" +
     "data-query='" + q + "'" + 
     "onclick='nextPage()'>Next page</button></div>";    
        
    }
 //returns value    
    return btnOutput;
};