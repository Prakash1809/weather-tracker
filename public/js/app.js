
(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	$(window).load(function(){

	});
	jQuery('#search').click(function(e){
		e.preventDefault()
		var address=jQuery('#address').val();
		fetch('/weather?address='+address+'').then((response) => {
			response.json().then((data)=>{
					if(data.error){
						alert(data.error)
					}else{
						jQuery('.date').html(data.location.localtime)
						jQuery('.location').html(data.location.name+','+data.location.region+','+data.location.country )
						jQuery('.num').html(data.current.temperature+'<sup>o</sup>')
						jQuery('#rain').html(data.current.cloudcover)
						jQuery('#wind').html(data.current.windspeed)
						jQuery('#wind_dir').html(data.current.wind_dir)
						
					}
			})
		})
		
	})

})(jQuery, document, window);