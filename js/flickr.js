(function( $ ) {
    $.fn.flickr = function(options) {
        
        var url = 'https://api.flickr.com/services/rest/?jsoncallback=?';
        var settings = $.extend( {
            'api_key': '60ce5cf2a44e30d0bbcd42739dd464eb',			
        }, options);

        
        function view_image(event) {
            var target = $(event.target);

            if(target.is('img')) {
                var url = target.attr('data-url');
                var cache = new Image();
                cache.src = url;
                var gallery = target.parents('.flickr-gallery:first').children('div.view');
                var info = gallery.children('div.image-info');
                var image = gallery.children('img'); 
                
                image.fadeOut(500, function () {
                    image.attr('src', url);
                    image.fadeIn(500);
                    info.html(target.attr('data-title') + target.attr('data-tags'));
                });
            }
        }

        return this.each(function() {    

            var gallery = $(this);
            gallery.addClass('flickr-gallery');
            gallery.append('<div class="view"></div><h2></h2><h3></h3><div class="thumbnails"><ul></ul></div>');

            $.getJSON(url, {
                method: 'flickr.photosets.getInfo',
                api_key: settings.api_key,						
                photoset_id: settings.photoset_id,
                format: 'json'
            }).success(function(state) {
                gallery.children('h2').html(state.photoset.title._content);  
                gallery.children('h3').html(state.photoset.description._content);

                $.getJSON(url, {
                    method: 'flickr.photosets.getPhotos',
                    api_key: settings.api_key,
                    media: 'photos',
                    photoset_id: settings.photoset_id,
                    format: 'json',
                    extras: 'url_sq,url_m,date_taken,tags'
                }).success(function(state) {
                    var list = gallery.find('ul:first');
                    list.html('');
                    list.on('click', view_image);

                    
                    
                    $.each(state.photoset.photo, function(){
                        if(this.isprimary == "1") {
                            var view = gallery.children('div.view');
                            view.html('');
                            view.html('<div class="image-info">' + this.title + '</div><img src="' + this.url_m + '" />');
                        }
                        
                        list.append('<li><img src="' + this.url_sq + '" ' +
                            'data-title="' + this.title + '" ' +
                            'data-url="' + this.url_m + '" ' +
                            ( this.date_taken ? 'data-date="' + this.date_taken + '" ' : '' ) +
                            'data-tags="' + this.tags + '" ' +
                            '/></li>');
                    });

                }).fail(function(state) { 
                    alert("Unable to retrieve photo set"); 
                });
            }).fail(function(state) { 
                alert("Unable to retrieve photo set information"); 
            });
        });

    };
})( jQuery );



// ALBUM ID LIST
//      Landscape Photoset ID: 72157675860285770
//      City Life Photoset ID: 72157673205271394
//      Mammals Photoset ID: 72157675860249010
//      Birds Photoset ID: 72157673241928253 / 72157634696924998


$('#album1').click(function (){
    // Removes any previously applied active class
    $('.album-list li').removeClass('active-album'); 
    // Adds active class to the clicked id (highlights album)
    $(this).addClass('active-album');                         
    
    // Emptys the gallery id to remove previous loaded data
    $('div#gallery').empty();  
    // Updates album of flickr object
    $('div#gallery').flickr({ photoset_id: '72157675860285770'});   
});
$('#album2').click(function (){
    $('.album-list li').removeClass('active-album');
    $(this).addClass('active-album');
    
    $('div#gallery').empty();
    $('div#gallery').flickr({ photoset_id: '72157673205271394'});
});
$('#album3').click(function (){
    $('.album-list li').removeClass('active-album');
    $(this).addClass('active-album');
    
    $('div#gallery').empty();
    $('div#gallery').flickr({ photoset_id: '72157675860249010'});
});
$('#album4').click(function (){
    $('.album-list li').removeClass('active-album');
    $(this).addClass('active-album');
    
    $('div#gallery').empty();
    $('div#gallery').flickr({ photoset_id: '72157673241928253'});
});