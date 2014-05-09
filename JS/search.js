Parse.initialize("o6UHd0P7UT2nyRw8Djmz8YwxG6copYOr2DjhGpoA", "1WDfNgPeu4d8Qc9bHyeNMVOPkvBVQ7mmYLnu53pD");

$(function() {
    var salonQuery = new Parse.Query('Salons');
    salonQuery.find({
        success: function(salonList) {
            var availableSalons = [];
            for (var i = 0; i < salonList.length; i++) {
                availableSalons.push(salonList.get('SalonName'));
            }
            console.log(availableSalons);
            $( "#search" ).autocomplete({
                source: availableSalons
            });
        },
        error: function(salonList, error) {
            console.log('Error');
        }
    });
});
