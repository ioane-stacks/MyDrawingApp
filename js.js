$(document).ready(function () {

    $(document).on('contextmenu', function (e) {
        return false;
    });

    var controlBoxWidth = $('.controlBox').width();

    $('body').css({ 'background-color': '#123' });

    $('.openClose').on('click', function () {
        if ($('.controlBox').width() == controlBoxWidth) {

            $('.controlBox').css({ 'width': '30px' });
            $('.openClose').html('»');
            $('.fullGroup').hide();
        }
        if ($('.controlBox').width() == 30) {

            $('.controlBox').css({ 'width': `${controlBoxWidth}px` });
            $('.openClose').html('«');
            $('.fullGroup').show(800);
        }
    });

    $('.openClose').hover(function () {
        if ($('.controlBox').width() == 320) {
            $(this).css({ 'margin-right': '2px' });
        }
    }, function () {
        if ($('.controlBox').width() == 320) {
            $(this).css({ 'margin-right': '-2px' });
        }
    });

    $('.openClose').hover(function () {
        if ($('.controlBox').width() == 30) {
            $(this).css({ 'margin-right': '-2px' });
        }
    }, function () {
        if ($('.controlBox').width() == 30) {
            $(this).css({ 'margin-right': '2px' });
        }
    });



    var X = 0;
    var Y = 0;
    var k = 0;


    var n = 5.5;
    var i = 0;
    var j = 0;

    var deg = 0;



    var isPressed = false;

    var Xwidth = 100;
    $('#Xwidth').on('input', function () {
        Xwidth = $(this).val();
    })
    var Xheight = 100;
    $('#Xheight').on('input', function () {
        Xheight = $(this).val();
    })
    var objLength = 50;
    $('#objLength').on('input', function () {
        objLength = $(this).val();
        $('.n1').remove();
    })
    var Transparency = 0.5;
    $('#objTransparency').on('input', function () {
        Transparency = $(this).val();
    })

    $('#clearDesk').on('click', function () {
        $('.n1').remove();
    });

    var Rounded = 50;
    $('#objRounded').on('input', function () {
        Rounded = $(this).val();
    });


    var Rotation = 1;
    $('.objRotation').on('input', function () {
        Rotation = $('input:checked').val();
    });

    var objGradient = 1;
    $('.objGradient').on('input', function () {
        objGradient = $('input:checked').val();
    });

    var objShadow = 2;
    $('.objShadowed').on('input', function () {
        objShadow = $('input:checked').val();
    })


    $('body').on('mousedown', function () {
        isPressed = true;
    });
    $('body').on('mouseup', function () {
        isPressed = false;
    });


    $('body').on('mousemove', function (e) {
        Animate(e.pageX, e.pageY, isPressed);
        $('.obj').css({ 'left': `${e.pageX - 50}px`, 'top': `${e.pageY - 50}px` });
    });



    var Gradient = "";
    var Shadowed = "";

    function Animate(x, y, isPressed) {

        X = x / n;
        Y = y / (n / 3);
        k = (X + Y) / (n * 1.2);

        if (X < 30) {
            X = 30;
        }
        if (Y < 30) {
            Y = 30;
        }


        if (Rotation == 1) {
            deg = x;
        }
        else {
            deg = 0;
        }





        if (isPressed == true) {
            i++;
            if (i >= 20000) {
                i = 0;
                $('.n1').remove();
            }

            Gradient = `radial-gradient(rgba(${X},0,${Y},${Transparency}), rgba(${Y},0,${X},${Transparency})`;
            if (objGradient == 1) {
                Gradient = `radial-gradient(rgba(${X},0,${Y},${Transparency}), rgba(${Y},0,${X},${Transparency})`;
            }
            else {
                Gradient = `linear-gradient(${x}deg, rgba(${X},0,${Y},${Transparency}), rgba(${Y},0,${X},${Transparency})`;
            }

            Shadowed = 'none';
            if (objShadow == 1) {
                Shadowed = '0 0 5px white';
            }
            else {
                Shadowed = 'none';
            }


            $('body').append(`<div class='obj${i} n1'></div>`);


            $(`.obj${i}`).css({
                'top': `${y - (Xheight * (50 / 100))}px`,
                'left': `${x - (Xwidth * (50 / 100))}px`,
                'width': `${Xwidth}px`,
                'height': `${Xheight}px`,
                'background-image': Gradient,
                'position': 'absolute',
                'border-radius': `${Rounded}%`,
                'box-shadow': Shadowed,
                'filter': 'blur(0px)',
                'transform': `rotate(${deg}deg)`
            });
        }





        $('body').css({ 'background-image': `linear-gradient(to right, rgb(${X}, ${k}, ${Y}), rgb(${Y}, ${k}, ${X} )` });

        $(`.obj${i - objLength}`).remove();


        //console.log(X + ', ' + Y + ', ' + k + ',');
    }

});
