/**
 * jQueryHeadRubber v1.0
 *
 * Copyright 2013 Milax
 * http://www.milax.com/
 *
 * Author
 * Maksim Gusakov
 */

(function($) {

	/**
	 * Launch-метод.
	 * @this	$jq		this		Контейнер
	 * @param	object	option		Объект-масив, содержащий параметры плагина.
	 * @return	void
	 */
	$.fn.HeadRubber = function( option ) {

		/** Значения по-умолчанию */
	    option = $.extend({
			/** Выравнивание по вертикали, как background-position */
	    	valign : "center",
	    	/** Время проявления картинки */
	    	duration : 0
	    }, option );

		/** Если отсутствует значение src — прерываем компиляцию */
	    if ( !option.src || !option.imageWidth || !option.imageHeight ) return;
		
	    var make = function() {
	    	$(this)._HeadRubberBuildImage( option );
	    };
	 	
	    return this.each( make ); 

	}

	/**
	 * Создание элемента изображения и вызов цепных методов.
	 * @this	$jq		this		Контейнер
	 * @param	$jq		option
	 * @return	void
	 */
	$.fn._HeadRubberBuildImage = function ( option ) {
		/** Создаем изображение */
		var $image = $( "<img src='" + option.src + "'>" );
		/** Вкладываем в блок изображение */
		$image.appendTo( $(this) );
		/** Назначаем значения по-умолчанию, ивенты по необходимости */
		$image._HeadRubberSet( option );
		/** Первое относительное позиционирование */
		$image._HeadRubberPosition();
		/** Показываем изображение */
		$image._HeadRubberShow();
	}

	/**
	 * Назначает стандартные свойства и ивенты элементам.
	 * @this	$jq		this		Изображение
	 * @param	$jq		option
	 * @return	void
	 */
	$.fn._HeadRubberSet = function ( option ) {
			
		/** Селектор Изображения */
		$image = $(this);
		/** Селектор контейнера */
		$container = $image.parent();

		$container.css({
			"overflow" 		: "hidden"
		});

		$image
		.css({
			"position" 		: "absolute",
			"top" 			: 0,
			"left" 			: 0,
			"opacity"		: 0,
			"display"		: "none"
		})
		.data({
			"valign"		: option.valign,
			"duration"		: option.duration,
			"width"			: option.imageWidth,
			"height"		: option.imageHeight
		})
		.attr("width", "100%");

		/** Позиционируем изображение при ресайзе окна */
		var timeout = 0;
		$(window).on("resize", function () {
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				$image._HeadRubberPosition();
			}, 50);
		});

	}

	/**
	 * Регуляция позиции элемента.
	 * @this	$jq		this		Изображение
	 * @return	void
	 */
	$.fn._HeadRubberPosition = function () {
		
		/** Селектор контейнера */
		var $container = $(this).parent();
		/** Выравнивание */
		var valign = $(this).data( "valign" );
		/** Реальные параметры изображения */
		var width = $(this).data( "width" );
		var height = $(this).data( "height" );
		/** Параметры контейнера (текущие) */
		var containerWidth = $container.width();
		var containerHeight = $container.height();
		/** Фактическая высота изображения */
		var factHeight = ( containerWidth/width ) * height ;
		
		/** 
		 * Вычисляем значение top отталкиваясь от параметров и
		 * позиции по вертикали. 
		 */
		switch (valign) {
			
			case "top" : 
				var top = 0;
			break;

			case "center" :
				var top = ((factHeight-containerHeight)/2) * (-1);
			break;

			case "bottom" :
				var top = (factHeight-containerHeight) * (-1);
			break;

			default : 
				var top = 0;
			break;

		}

		top = Math.round( top );

		$(this).css({
			top 		: top,
			width		: containerWidth // fix ie6,7
		});

	}
	
	/**
	 * Проявляет изображение.
	 * @this	$jq		this		Изображение
	 * @return	void
	 */
	$.fn._HeadRubberShow = function () {
		/** Количество милисекунд для проявления изображения */
		var duration = $(this).data( "duration" );

		$(this).show().animate( {"opacity" : 1}, duration );
	}

})(jQuery);