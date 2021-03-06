$(function () {
    var onCard = $('#card');
    var modalOverlay = $('#modalOverlay');
    var modalContent = $('#modalContent');


    onCard.click(function () {
        modalOverlay.addClass('modal-overlay--show');
        modalContent.addClass('modal-content--show');
    });

    var closedModalContent = $('#closedModalContent');

    closedModalContent.click(function () {
        modalOverlay.removeClass('modal-overlay--show');
        modalContent.removeClass('modal-content--show');
    });

    var dataClosedModalContentInfo = $('[data-closed-Modal-Content-Info]');
    var closedModalContentInfo = $('#closedModalContentInfo');
    var modalContentInfo = $('#modalContentInfo');

    dataClosedModalContentInfo.click(function () {
        modalOverlay.removeClass('modal-overlay--show');
        modalContentInfo.removeClass('modal-content-info--show');
    });

    var closedModalContentInfoAndInCard = $('#closedModalContentInfoAndInCard');

    closedModalContentInfoAndInCard.click(function () {
        modalContent.addClass('modal-content--show');
    });

});

$(function(){
    $.getJSON('https://shop.bremont.com/products.json', function(data) {
        var productCards = $('#productCards');
        var productCardsWrapper = $('#productCardsWrapper');

        console.log(data.products);
        for (var i = 0; i < data.products.length; i++){
            productCardsWrapper.append('<div data-product-card id="' + data.products[i].id + '" class="product-cards__wrapper-card">' +
                '<div class="product-cards__wrapper-img"><img data-product-img src="'+data.products[i].images[0].src+'"></div>' +
                '<div class="product-cards__wrapper-title">' + data.products[i].title + '</div>' +
                '<div class="product-cards__wrapper-text">' + data.products[i].body_html + '</div>'+
                '<div class="product-cards__wrapper-price-btn"><div class="product-cards__price">' +
                '<span>'+ data.products[i].variants[0].price +'</span> $</div>' +
                '<div data-product-btn class="product-cards__btn btn">buy</div></div></div>');

        }
        $(function () {
            var btn = $('[data-product-btn]');
            var good = {};

            btn.click(function() {
                var card = $(this).closest('.product-cards__wrapper-card');
                var cardId = card.attr('id');

                function findId () {
                    for (var cardId in good) {
                        return cardId;
                        }
                }
                if (cardId in good) {
                    $('#modalContentInfo').addClass('modal-content-info--show');
                    $('#modalOverlay').addClass('modal-overlay--show');
                }else {
                    card.clone()
                        .appendTo('#modalContentWrapper')
                        .attr('class', 'modal-content__wrapper')
                        .append('<div class="modal-content__quantity">1</div>')
                        .append('<div data-delete-good class="modal-content__delete"></div>');

                    var img = $('.modal-content__wrapper .product-cards__wrapper-img');
                    var title = $('.modal-content__wrapper .product-cards__wrapper-title');
                    var text = $('.modal-content__wrapper .product-cards__wrapper-text');
                    var price = $('.modal-content__wrapper .product-cards__wrapper-price-btn');

                    $('.modal-content__wrapper .product-cards__btn').remove();
                    $('.modal-content__text iframe').remove();

                    img.attr('class', 'modal-content__wrapper-img');
                    title.attr('class', 'modal-content__titles');
                    text.attr('class', 'modal-content__text');
                    price.attr('class', 'modal-content__price');

                    var wrapperPriceBtn = $(this).closest('.product-cards__wrapper-price-btn');
                    var prices = wrapperPriceBtn.children('.product-cards__price');
                    var cash = +prices.children('span')[0].outerText;
                    good[cardId] = cash;
                }

                var cashValue = $('#mainHeaderCash');

                function sum () {
                    var sum = 0;
                    for (var cash in good) {
                        sum += good[cash];
                    }

                    cashValue.text(sum + ' $');
                    return sum
                }
                sum ();

                $(function () {

                    var deleteGood = $('[data-delete-good]');

                    deleteGood.click(function () {
                        var goodDelete = $(this).closest('.modal-content__wrapper');
                        var delId = goodDelete.attr('id');

                        delete good[delId];
                        sum ();
                        goodDelete.remove();
                    });
                });
            });
        });
    });
});





