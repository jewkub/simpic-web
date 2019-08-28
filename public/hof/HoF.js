var current_year="#2019";
var competition_year=["#2019", "#2018", "#2017", "#2016", "#2015", "#2014", "#2013", "#2012"];
var iyear;
var linkyear;
function set_current_year(clicked_id)
{
 current_year=clicked_id;
}
/*function hidemyyear()
{
 for(iyear=1;iyear<competition_year.length;iyear++)
  {
	  $(competition_year[iyear]+"winner").hide();
  }
}*/
$(document).ready(function(){
	  for(iyear=1;iyear<competition_year.length;iyear++)
		 {
			$(competition_year[iyear]+"winner").hide();
		 }
});
$(".list-group-item")
	.click(
		function(){
		 console.log(current_year);
		 console.log(current_year+"winner");
         for(iyear=0;iyear<competition_year.length;iyear++)
		 {
			if(current_year==competition_year[iyear])
			{
				$(competition_year[iyear])/*.addClass("active");*/.removeClass("list-group-item").addClass("list-group-item active");
				$(competition_year[iyear]+"winner").show();
				linkyear=competition_year[iyear].slice(1,competition_year[iyear].length);
				console.log(linkyear);
				$("#open"+linkyear).load(linkyear+".html");
			}
			else
			{
				$(competition_year[iyear])/*.removeClass("active");*/.removeClass("list-group-item active").addClass("list-group-item");
				$(competition_year[iyear]+"winner").hide();
			}
		 }
		}	
	);
