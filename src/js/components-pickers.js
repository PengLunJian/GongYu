var ComponentsPickers = function () {

    
	var groupdate1 = function () {

        if (jQuery().datepicker) {
            $('.group-date1').datepicker({
                rtl: App.isRTL(),
				format: 'yyyy-mm-dd',
                autoclose: true
            }).on('changeDate', function(e) {

			});
            $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }
    }
	var groupdate2 = function () {
        if (jQuery().datepicker) {
            $('.group-date2').datepicker({
                rtl: App.isRTL(),
				format: 'yyyy-mm-dd',
                autoclose: true
            }).on('changeDate', function(e) {

			});
            $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }
    }
    var checktabledate = function () {
        if (jQuery().datetimepicker) {
            $('.checktable-date').datetimepicker({
                autoclose: true,
                isRTL: App.isRTL(),
                format: "yyyy 年  mm  月  dd 日  hh:ii",
                pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
            }).on('changeDate', function(ev){
                alert(1);
                
            });
            $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }
    }
	var handleDatePickers = function () {

        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                format: 'yyyy-mm-dd',
                autoclose: true
            }).on('changeDate', function(e) {
                // `e` here contains the extra attributes
                //console.log(e);
            });
            $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }
    }
    var handleTimePickers = function () {

        if (jQuery().timepicker) {
            $('.timepicker-default').timepicker({
                autoclose: true,
                showSeconds: false,
                minuteStep: 1
            });

            $('.timepicker-no-seconds').timepicker({
                autoclose: true,
                minuteStep: 5
            });
			$('.sale-time1').timepicker({
                autoclose: true,
                minuteStep: 5,
                showSeconds: false,
                showMeridian: false
            }).on('changeTime.timepicker', function(e) {
				
			});

            // handle input group button click
            $('.timepicker').on('click', function(e){
                e.preventDefault();
                $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
            });
        }
    }

    var handleDateRangePickers = function () {
        if (!jQuery().daterangepicker) {
            return;
        }

        $('#defaultrange').daterangepicker({
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'MM-DD-YYYY',
                separator: ' to ',
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: '01-01-2012',
                maxDate: '12-31-2014',
            },
            function (start, end) {
                console.log("Callback has been called!");
                $('#defaultrange input').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
        );        

        $('#defaultrange_modal').daterangepicker({
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'MM-DD-YYYY',
                separator: ' to ',
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: '01-01-2012',
                maxDate: '12-31-2014',
            },
            function (start, end) {
                $('#defaultrange_modal input').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
        );  

        // this is very important fix when daterangepicker is used in modal. in modal when daterange picker is opened and mouse clicked anywhere bootstrap modal removes the modal-open class from the body element.
        // so the below code will fix this issue.
        $('#defaultrange_modal').on('click', function(){
            if ($('#daterangepicker_modal').is(":visible") && $('body').hasClass("modal-open") == false) {
                $('body').addClass("modal-open");
            }
        });

        $('#reportrange').daterangepicker({
                opens: (App.isRTL() ? 'left' : 'right'),
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: '01-01-2012',
                maxDate: '12-31-2014',
                dateLimit: {
                    days: 60
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days': [moment().subtract('days', 6), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                buttonClasses: ['btn'],
                applyClass: 'green',
                cancelClass: 'default',
                format: 'MM-DD-YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: 'Apply',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }
            },
            function (start, end) {
                console.log("Callback has been called!");
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
        );
        //Set the initial state of the picker label
        $('#reportrange span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    }
    var handleDatetimePicker = function () {
        //抄表日期
        $('.checktable-date').datetimepicker({
            autoclose: true,
            isRTL: App.isRTL(),
            format: "yyyy 年  mm  月  dd 日  hh:ii",
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
        }).on('changeDate', function(ev){
			var pattern = /([\d]+)[^\d]+([\d]+)[^\d]+([\d]+)[^\d]+([\d]+):([\d]+)/;
			var str = $(this).val();
			var arr = $(this).val().match(pattern);
			var str2 = arr[1]+'-'+arr[2]+'-'+arr[3]+' '+arr[4]+':'+arr[5];
		});

        $(".form_advance_datetime").datetimepicker({
            isRTL: App.isRTL(),
            format: "dd MM yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            startDate: "2013-02-14 10:00",
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10
        });

        $(".form_meridian_datetime").datetimepicker({
            isRTL: App.isRTL(),
            format: "dd MM yyyy - HH:ii P",
            showMeridian: true,
            autoclose: true,
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            todayBtn: true
        });

        $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    }

    var handleClockfaceTimePickers = function () {

        if (!jQuery().clockface) {
            return;
        }

        $('.clockface_1').clockface();

        $('#clockface_2').clockface({
            format: 'HH:mm',
            trigger: 'manual'
        });

        $('#clockface_2_toggle').click(function (e) {
            e.stopPropagation();
            $('#clockface_2').clockface('toggle');
        });

        $('#clockface_2_modal').clockface({
            format: 'HH:mm',
            trigger: 'manual'
        });

        $('#clockface_2_modal_toggle').click(function (e) {
            e.stopPropagation();
            $('#clockface_2_modal').clockface('toggle');
        });

        $('.clockface_3').clockface({
            format: 'H:mm'
        }).clockface('show', '14:30');
    }

    var handleColorPicker = function () {
        if (!jQuery().colorpicker) {
            return;
        }
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        $('.colorpicker-rgba').colorpicker();
    }
   

    return {
        //main function to initiate the module
        init: function () {
            handleDatePickers();
			$('.group-date1').length>0?groupdate1():null;
			$('.group-date2').length>0?groupdate2():null;
            $('.checktable-date').length>0?handleDatetimePicker():null;
            handleTimePickers();
            //handleDatetimePicker();
            //handleDateRangePickers();
            //handleClockfaceTimePickers();
            //handleColorPicker();
            // if(obj.datetime == 'datetime'){
            //     for(var i=0;i<obj.datetime.length;i++){
            //         obj.datetime[i]();
            //     }
                
            // }
            // if(obj == 'date'){
            //     //handleDatePickers(obj.date);
            // }
            // if(obj == 'time'){
            //     //handleTimePickers(obj.time);
            // }
        }
    };

}();