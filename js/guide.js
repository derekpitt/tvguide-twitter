// this is a little thing to turn off selections
$.fn.disableSelection = function() {
    $(this).attr('unselectable', 'on')
           .css('-moz-user-select', 'none')
           .each(function() { 
               this.onselectstart = function() { return false; };
            });
};



$(function() {
  // this will do the actual move on the margin left for the first child element.
  // and then will return the element
  var moveChannelContents = function(element, byHowMuch) {
    var firstChildElement = $(element.children()[0]);
    firstChildElement.css('margin-left', (parseInt(firstChildElement.css('margin-left')) + byHowMuch) + 'px');
    return element;
  };

  // returns the complete width of children
  var getCompleteWidth = function(baseElement) {
    var totalWidth = 0;
    baseElement.children().each(function() {
      totalWidth += $(this).outerWidth(true);
    });
    return totalWidth;
  };


  var resetOpacity = function() {
    $(".channel").animate({opacity: 0.5}, 200);
  };

  var initOpacity = function() {
    $(".channel").animate({opacity: 1}, 200);
  };
  initOpacity();


  $(".contents").mousedown(function(e) {
    resetOpacity();    

    var that = this;
    var startX = e.pageX;
    var firstChildElement = $($(this).children()[0]);
    var currentLeftMargin = parseInt(firstChildElement.css('margin-left'));
    var completeWidth = getCompleteWidth($(that).find("ul"));
    //$(that).parent().addClass('selected');
    $(that).parent().stop();
    $(that).parent().animate({opacity: 1}, 200);

    $(that).disableSelection();

    $(window).mouseup(function(e) {
      $(window).unbind('mousemove');
    });

    $(window).mousemove(function(e) {
      var xDiff = startX - e.pageX;
      var newLeftMargin = currentLeftMargin - xDiff;
      
      var widthThresh = completeWidth - 500;
      var canMoveLeft = widthThresh > Math.abs(newLeftMargin);
  


      if (canMoveLeft && (newLeftMargin <= 0)) {
        firstChildElement.css('margin-left', (currentLeftMargin - xDiff) + "px");
      } else {
        if (newLeftMargin > 0) {
          firstChildElement.css('margin-left', '0px');
        }
        if (!canMoveLeft) {
          firstChildElement.css('margin-left', (-1 * widthThresh) + "px");
        }
      }
             
    });

  });


});
