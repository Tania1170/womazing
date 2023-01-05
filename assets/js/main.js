;(function ($) {
  'use strict'

  /*  slider-slick */
  $(document).ready(function () {
    $('.slider-left').slick({
      arrows: false,
      dots: true,
      autoplay: true,
      infinite: true,
      asNavFor: '.slider-right',
    })

    $('.slider-right').slick({
      fade: true,
      arrows: false,
      asNavFor: '.slider-left',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            asNavFor: false,
          },
        },
      ],
    })

    $('.slider-about').slick({
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false,
          },
        },
        {
          breakpoint: 440,
          settings: {
            dots: false,
            arrows: false,
            autoplay: true,
          },
        },
      ],
    })
  })

  /*  sticky */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop()
    if (scroll < 40) {
      $('.header-sticky').removeClass('sticky-bar')
    } else {
      $('.header-sticky').addClass('sticky-bar')
    }
  })
})(jQuery)

/* TABS */

$('.nav_link').on('click', function () {
  var currTab = $(this).index()

  $('.nav_link').removeClass('active')
  $(this).addClass('active')

  $('.tab-pane').removeClass('show active')
  $('.tab-pane').eq(currTab).addClass('show active')
})

/* HAMBURGER */

$('.burger').on('click', function () {
  $('.main-menu').toggleClass('main-menu_active')
  $('.burger').toggleClass('open-menu')
})

/* MODAL WINDOW */

$('.btn-phone').on('click', function () {
  $('.wrapper-modal').fadeIn()
})

$('.menu-close').on('click', function () {
  $('.wrapper-modal').fadeOut()
})
$('.overlay').on('click', function () {
  $('.wrapper-modal').fadeOut()
})
$('.form-modal')
  .children()
  .on('click', function (e) {
    e.stopPropagation()
  })

$('.response-close').on('click', function () {
  $('.response').fadeOut()
})

//Валидация и отправка формы

$(document).ready(function () {
  $('[data-submit]').on('click', function (e) {
    e.preventDefault()
    $(this).parent('form').submit()
    console.log('ok')
  })
  $.validator.addMethod(
    'regex',
    function (value, element, regexp) {
      var re = new RegExp(regexp)
      return this.optional(element) || re.test(value)
    },
    'Please check your input.',
  )

  // Функция валидации и вывода сообщений
  function valEl(el) {
    el.validate({
      rules: {
        tel: {
          required: true,
          regex: '^([+]+)*[0-9\x20\x28\x29-]{5,20}$',
        },
        name: {
          required: true,
        },
        country: {
          required: true,
        },
        city: {
          required: true,
        },
        street: {
          required: true,
        },
        house: {
          required: true,
        },
        flat: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        tel: {
          required: 'Поле обязательно для заполнения',
          regex: 'Телефон может содержать символы + - ()',
        },
        name: {
          required: 'Поле обязательно для заполнения',
        },

        country: {
          required: 'Поле обязательно для заполнения',
        },
        city: {
          required: 'Поле обязательно для заполнения',
        },
        house: {
          required: 'Поле обязательно для заполнения',
        },
        flat: {
          required: 'Поле обязательно для заполнения',
        },
        street: {
          required: 'Поле обязательно для заполнения',
        },

        email: {
          required: 'Поле обязательно для заполнения',
          email: 'Неверный формат E-mail',
        },
      },

      // Начинаем проверку id="" формы
      submitHandler: function (form) {
        var $form = $(form)
        var $formId = $(form).attr('id')
        switch ($formId) {
          //  id="form-modal"
          case 'form-modal':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            }).always(function () {
              console.log('Always')
              setTimeout(function () {
                $form.trigger('reset')
              }, 1100)
              setTimeout(function () {
                $('.wrapper-modal').fadeOut()
              }, 1300)
              setTimeout(function () {
                $('.response').fadeIn()
              }, 1300)
            })
            break

          case 'form-order':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            }).always(function () {
              console.log('Always')
              setTimeout(function () {
                $form.trigger('reset')
              }, 1100)
            })
            window.location.href = 'confirmation.html'
            break

          case 'form-contact':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            }).always(function () {
              console.log('Always')
              setTimeout(function () {
                $form.trigger('reset')
              }, 1100)
              setTimeout(function () {
                $('.btn-submit-ok').fadeIn()
              }, 1300)
            })
            break
        }
        return false
      },
    })
  }

  // Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.js-form').each(function () {
    valEl($(this))
  })
})
jQuery.extend(jQuery.validator.messages, {
  required: 'Поле обязательно для заполнения',
})
