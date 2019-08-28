var current_year="#2019";
var competition_year=["#2019", "#2018", "#2017", "#2016", "#2015", "#2014", "#2013", "#2012"];
var iyear;
var linkyear;
function set_current_year(clicked_id)
***REMOVED***
 current_year=clicked_id;
}
/*function hidemyyear()
***REMOVED***
 for(iyear=1;iyear<competition_year.length;iyear++)
  ***REMOVED***
	  $(competition_year[iyear]+"winner").hide();
***REMOVED***
}*/
$(document).ready(function()***REMOVED***
	  for(iyear=1;iyear<competition_year.length;iyear++)
		 ***REMOVED***
			$(competition_year[iyear]+"winner").hide();
		 }
});
$(".list-group-item")
	.click(
		function()***REMOVED***
		 console.log(current_year);
		 console.log(current_year+"winner");
         for(iyear=0;iyear<competition_year.length;iyear++)
		 ***REMOVED***
			if(current_year==competition_year[iyear])
			***REMOVED***
				$(competition_year[iyear])/*.addClass("active");*/.removeClass("list-group-item").addClass("list-group-item active");
				$(competition_year[iyear]+"winner").show();
				linkyear=competition_year[iyear].slice(1,competition_year[iyear].length);
				console.log(linkyear);
				$("#open"+linkyear).load(linkyear+".html");
			}
			else
			***REMOVED***
				$(competition_year[iyear])/*.removeClass("active");*/.removeClass("list-group-item active").addClass("list-group-item");
				$(competition_year[iyear]+"winner").hide();
			}
		 }
		}	
	);
