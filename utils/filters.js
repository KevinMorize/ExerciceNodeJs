(function($){
    $('#searchBar').focus().keyup(function(event){
        $('#dogsAroundSection').hide()
        $('#firstTitle').hide()
        var input = $(this);
        var val = input.val();
        if (val == ""){
            $('#searchDogsSection div').show();
            $('#searchDogsSection span').removeClass('highlighted');
            $('#dogsAroundSection').show()
            $('#firstTitle').show()

        return true
        }
        var regexp = '\\b(.*)';
        for(var i in val){
            regexp += '('+val[i]+')(.*)'
        }
        regexp += '\\b';

            $('#searchDogsSection div').show();

            $('#searchDogsSection').find('h5').each(function(){
                var h5 = $(this);
                var result = h5.text().match(new RegExp(regexp, 'i'))
                
                if (result){
                    var string = '';
                    for(var i in result){

                        if (i > 0){
                            if (i%2 === 0){
                                string += '<span class="highlighted">' + result[i] + '</span>'
                            } else {
                                string += result[i];
                            }
                        }
                    }
                    h5.empty().append(string)
                } else {
                    h5.parent().parent().hide();
                }
            })
        })  
})(jQuery);