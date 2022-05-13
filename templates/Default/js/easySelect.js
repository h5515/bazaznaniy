//The options are on the bottom

(function ($) {
    $.fn.easySelect = function (options) {
        return this.each(function () {
            var settings = $.extend({
                search: false,
                buttons: false,
                placeholder: 'Select item',
                selectColor: '#414c52',
                placeholderColor: '#838383',
                itemTitle: 'Selected items',
                showEachItem: false,
                width: '100%',
                dropdownMaxHeight: 'auto'
            }, options);

            var $this = $(this),

            numberOfOptions = $(this).children('option').length;

            $this.addClass('s-hidden');

            $this.wrap('<div class="easySelect"></div>');
            var $main = $this.closest('.easySelect').css('width', settings.width);

            $this.after('<div class="styledSelect"></div>');

            var $styledSelect = $this.next('div.styledSelect');

            $styledSelect.text(settings.placeholder).css('color', settings.placeholderColor);

            var MaxAllowed = $this.data("max");
            
           var clear = $('<span/>',{
                'class': 'clearSelectfromDiv',
                 html: '&times;',
                'style': 'display: none',
            }).prependTo($main);
            
            var $list = $('<ul />', {
                'class': 'options'
            }).insertAfter($styledSelect);

            var $divSearch = $('<div/> ', {
                'class': 'divSearcheasySelect',
            }).appendTo($list)
            if(settings.search == false){
                $divSearch.hide();
            }
            
            
            var $divoptions = $('<div/> ', {
                'class': 'divOptionsesySelect',
            }).appendTo($divSearch);
            if(settings.buttons == false ){
                $divoptions.hide();
            }

            var $clearSpan = $('<p />', {
                'class': 'optionRow ',
                text: 'Clear all',
                'id': 'clearAlleasySelect',
            }).appendTo($divoptions);

            var $clear = $('<span />', {
                'class': 'alleasySelect',
                html: '&times;'
            }).appendTo($clearSpan);

            var $selectAllspan = $('<p />', {
                'class': 'optionRow',
                'id': 'selectAlleasySelect',
                text: 'Select all'
            }).appendTo($divoptions);

            var $selectAll = $('<span />', {
                'class': 'alleasySelect',
                html: '&check;'
            }).appendTo($selectAllspan);

            var $message = $('<p />', {
                'class': 'messageMaxallowedSelections',
                style: 'display:none',
                text: 'You can select max ' + MaxAllowed + ' items '
            }).appendTo($divoptions);

            var $searchInput = $('<input/> ', {
                'type': 'text',
                'class': 'searchInputeasySelect',
                'placeholder': 'Search',
            }).appendTo($divSearch)

            var $maindiv = $('<div/> ', {
                'class': 'scrolableDiv',
            }).appendTo($list);
            $maindiv.css('max-height', settings.dropdownMaxHeight);

            var $hiddenli = $('<li/> ', {
                text: 'You can select only ' + MaxAllowed + ' items',
                'class': 'hiddenLieasySelect',
                style: 'display: none'
            }).appendTo($list);

            var b = false;
            var qw = 0;
            for (var i = 0; i < numberOfOptions; i++) {
                b = false;
                var $li = $('<li/> ').appendTo($maindiv);
                
                if(typeof ($this.children('option').eq(i).attr('selected')) != "undefined"){
                      //  alert('1') ;
                        b=true;
                    }
                
                var $label = $('<label/> ', {
                    'class': 'container-item',
                    text: $this.children('option').eq(i).text(),
                }).appendTo($li)
                    
              
                 if (b) {
                var $checkbox = $('<input> ', {
                    'class': 'mulpitply_checkbox_style',
                    'type': 'checkbox',
                    'checked':'checked',
                    value: $this.children('option').eq(i).val(),
                }).appendTo($label);
                        eachItem();
                eachItemoutput();
                } else 
                    {
                 var $checkbox = $('<input> ', {
                    'class': 'mulpitply_checkbox_style',
                    'type': 'checkbox',
                    value: $this.children('option').eq(i).val(),
                }).appendTo($label)                       
                    }

                $('<span /> ', {
                    'class': 'checkmark',
                }).appendTo($label);
                
                  
                    //  alert($checkbox.html());
                //   chek($checkbox);checked
                
            }
           
           /* for (var as in seltex){
                
             $list.find('.mulpitply_checkbox_style').attr("selected", "selected")   
            }
*/
            var $listItems = $list.find('li');
            var checkItem = $list.find('.mulpitply_checkbox_style');

            $styledSelect.click(function (e) {
                e.stopPropagation();
                var b =false;
                $('div.styledSelect.active').each(function () {
                    $(this).removeClass('active').next('ul.options').slideUp(300);
                    b=true;
                });
                if (!b) {
                $(this).toggleClass('active').next('ul.options').slideDown(300);
                }
            });

            function eachItem() {
                arrText = [];
              //    alert('111');
               ;
                $.each($list.find('.mulpitply_checkbox_style:checked'), function () {
                    tex =  $.trim($(this).parent().text());
                    arrText.push(tex);
                });
               
            }

            function eachItemoutput() {
              //  alert('222222');
                if (settings.showEachItem == true) {
                    //alert(arrText);
                    //arrText = $trim(arrText);
                  //  arrText = arrText.split('\u0022').join('')              
                    
                    $styledSelect.text(arrText.join(", ")).removeClass('active').css('color', settings.selectColor); 
                    
                } else {
                    var $checked_items = checkItem.filter(":checked").length;
                    $styledSelect.text($checked_items + ' ' + settings.itemTitle).removeClass('active').css('color', settings.selectColor);
                   
                }
            }
                

            $listItems.click(function (e) {
           //    alert(e.text());
                e.stopPropagation();
               // alert($(this).html  ());
              //   $(this).text($(this).text().split('').join(''););
                $styledSelect.text($(this).text()).removeClass('active');
            //    $styledSelect.text($.trim($styledSelect.text()));
               
                $this.val($(this).attr('val'));
                clear.show();
               
                val = [];
                $('.mulpitply_checkbox_style:checked').each(function () {
                    val.push($(this).val());
                })
                $this.closest('select').val(val);
                
                $($this.closest('select').children('option')).each(function () {
                    $(this).removeAttr("selected");
                });

                
                
                $.each($('.mulpitply_checkbox_style:checked'), function () {
                    var $poy = $(this);
                    $($this.closest('select').children('option')).each(function () {
                       // alert($poy.val()+'=='+$(this).val());
                        if ($.trim($(this).val())!="" && $poy.val()==$(this).val()){
                            
                           // alert($(this).prop('value') + ' - selected');
                           // $(this).attr('selected', 'selected');
                          //  $(this).prop('selected',true);
                          //  alert($(this).text());selected="selected"
                            $(this).attr('selected',true);
                          //  $(this).attr('selected', true);
                        }
                    });
                    
                  //  alert($(this).val());
                });
                var str = $this.closest('select').html();
               
                str = str.replace('selected="selected"', 'selected' );
      
                $this.closest('select').html(str);
                
                $($this.closest('select').children('option:selected')).each(function () {
                   // $(this).attr('selected', 'selected');
                });
    
                arrVal = [];
                var getVal = $.each($('.mulpitply_checkbox_style:checked'), function () {
                    arrVal.push($(this).val());
                });
                /*--===============================*/
               eachItem();
                eachItemoutput();
                
               /* checkItem.filter(":checked").each(function () {
                  //  alert($(this).text());
                });*/

                var $checked_items = checkItem.filter(":checked").length;
                
                if ($checked_items == 0) {
                    $styledSelect.text(settings.placeholder).removeClass('active').css('color', settings.placeholderColor);
                          
                    clear.hide();
                }

                var MaxAllowed = $this.data("max");
                if ($checked_items >= MaxAllowed && MaxAllowed !== "") {
                    checkItem.not(":checked").attr("disabled", "disabled");
                   // $maindiv.hide();
                     $divSearch.hide();
                    $hiddenli.show();
                } else {
                    // Enable the inputs again when he unchecks one
                    checkItem.removeAttr("disabled");
                }
            });

            var $optionRow = $list.find('.optionRow');

            $optionRow.click(function (e) {
                e.stopPropagation();
            });
            var $clearAll = $list.find('#clearAlleasySelect');
            var $selectAll = $list.find('#selectAlleasySelect');

/*--================================*/
            function unselectAll() {
                checkItem.prop('checked', false);
                $styledSelect.text(settings.placeholder).removeClass('active').css('color', settings.placeholderColor);
                $this.closest('select').val('');
                $maindiv.show();
                $hiddenli.hide();
            }
            $clearAll.click(function () {
                clear.hide();
                unselectAll()
            })
            clear.click(function () {
                $(this).hide();
                
                unselectAll()
            })
/*--================================*/
            allValue = [];
            $selectAll.click(function () {
                if (MaxAllowed == "" || typeof MaxAllowed == typeof undefined) {
                    checkItem.prop('checked', true);
                    $('.mulpitply_checkbox_style:checked').each(function () {
                        allValue.push($(this).val());
                    })
                    $this.closest('select').val(allValue);
                    clear.show();
                    eachItem();
                    eachItemoutput();
                } else {
                    $message.css('display', 'inline-block');
                    setTimeout(function () {
                        $message.hide()
                    }, 2000);
                }
            })

            $(document).on('click', function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });

            var $block = $('<li/> ', {
                'class': 'no_results',
                text: 'No results found..',
            }).appendTo($list)
            $block.hide();
            var $input = $divSearch.find('input[type="text"]');
            $input.on('click',function (e) {
                e.stopPropagation();
            });
            $input.on('keyuo', function () {
                var val = $(this).val();
                var isMatch = false;
                $listItems.find('.container-item').each(function (i) {
                    var content = $(this).html();
                    if (content.toLowerCase().indexOf(val) == -1) {
                        $(this).hide();
                    } else {
                        isMatch = true;
                        $(this).show();
                    }
                });
                $block.toggle(!isMatch);
            });
        });
    }
}(jQuery));

 /*    $("#demo").easySelect({
         buttons: false,
         search: false,
         placeholder: 'Choose Country',
         placeholderColor: '#524781',
         selectColor: '#524781',
         itemTitle: 'Countrys selected',
         showEachItem: true,
         width: '100%',
         dropdownMaxHeight: '450px',
     })
     $("#demo1").easySelect({
         buttons: false, 
         search: true,
         placeholder: 'Choose color',
         placeholderColor: 'violet',
         selectColor: 'lila',
         itemTitle: 'Color selected',
         showEachItem: true,
         width: '100%',
         dropdownMaxHeight: '450px',
     })

     $("#demo3").easySelect({
         buttons: true, // 
         search: true,
         placeholder: 'Pick Car',
         placeholderColor: 'green',
         selectColor: '#524781',
         itemTitle: 'Car selected',
         showEachItem: true,
         width: '100%',
         dropdownMaxHeight: '450px',
     })*/
