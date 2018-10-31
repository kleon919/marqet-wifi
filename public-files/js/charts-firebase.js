    function toArrayExceptNotTotal(ob){
       
      var currentArray = [];
        for(var key in ob ){
            if(key !== "not" && key !== "total"){
                currentArray.push(ob[key]);
            }
        }

        return currentArray;
    }
    
    function retrieveResultsObject(database, reference){

      var currentRef= database.ref(reference);
      
      var currentObject;

      currentRef.on('value', function(snapshot) {

        currentObject = snapshot.val();
       

        return currentObject;

      });
    }

    function retrieveResultsObjectAsPromised(database, reference){

        return new Promise(function (resolve, reject) {

            const currentRef= database.ref(reference);
    
            currentRef.on('value', function(snapshot) {

              currentObject = snapshot.val();
              
              return(resolve(currentObject));

            });

              
        });
    }

    // BAR DIAGRAM

    function createPercentages(currentArray, currentTotal){

      var sum = 0;

      for(var i = 0; i <= currentArray.length - 1; i++){

        if (i < currentArray.length - 1){

          //var value = ((100 * currentArray[i].quantity)/transportObject.total);
          var roundedValue = Math.round((100 * currentArray[i].quantity)/currentTotal);
          currentArray[i].quantity = roundedValue;
          sum += roundedValue;

        } else {
          
          currentArray[i].quantity = 100 - sum;

        }
      }
    }

    function setTransportResults(currentArray){

      $('table tr').each(function(index) {

          //console.log("content " + resultsArray[index].content + " quantity " + resultsArray[index].quantity + " total " + total);
          
          $(this).children('td').eq(0).html(currentArray[index].content);
          $(this).children('td').eq(1).html((currentArray[index].quantity) + '%');

      });
    }

    function setMediaResults(currentArray){

      $('#pieComponent li').each(function(index) {

          //console.log("content " + resultsArray[index].content + " quantity " + resultsArray[index].quantity + " total " + total);
          
          $(this).children('em').html(currentArray[index].content);
          $(this).children('span').html((currentArray[index].quantity));

      });
    }


    function viewTransportBarChart() {
                
      $('.column').css('height', '0');

      $('table tr').each(function(index) {
          
          var ha = $(this).children('td').eq(1).text();
          $('#col' + index).html("<div>" + ha + "</div>").animate({ height: ha }, 1800);

      });
    }

    // PIE DIAGRAM 

    function createPie(dataElement, pieElement) {

      var listData = [];
      $(dataElement + " span").each(function() {
        listData.push(Number($(this).html()));
      });

      var listTotal = 0;
      for (var i = 0; i < listData.length; i++) {
        listTotal += listData[i];
      }

      var offset = 0;
      var color = [
        "cornflowerblue",
        "olivedrab",
        "orange",
        "turquoise",
        "purple",
        "tomato",
        "navy",
        "crimson",
        "forestgreen",
        "gray"
      ];

      for (var i = 0; i < listData.length; i++) {

        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;

      }
    }
    
    function sliceSize(dataNum, dataTotal) {
      
      return (dataNum / dataTotal) * 360;

    }

    function addSlice(sliceSize, pieElement, offset, sliceID, color) {

      $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
      var offset = offset - 1;
      var sizeRotation = -179 + sliceSize;
      $("." + sliceID).css({
        "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
      });
      $("." + sliceID + " span").css({
        "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color
      });

    }

    function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {

      var sliceID = "s" + dataCount + "-" + sliceCount;
      var maxSize = 179;
      
      if (sliceSize <= maxSize) {

        addSlice(sliceSize, pieElement, offset, sliceID, color);

      } else {

        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);

      }
    }

    // STARS DIAGRAM

    function calculateStars(currentObject){

      //console.log(JSON.stringify(currentObject));

      for(var key in currentObject ){
        if(key !== "not" && key !== "total"){
          currentObject[key].roundedValue = Math.round(currentObject[key].totalSum / currentObject["total"]);
        }
      }
      //console.log(JSON.stringify(currentObject));
      return currentObject;
    }

    function setStarsResults(currentArray){

      $('#starSection span[class="rating block"]').each(function(index) {
        
        // console.log($(this).children("input:checked").val());

        $(this).children('span').html(currentArray[index].content);
        $(this).children("input:nth-last-of-type(" + currentArray[index].roundedValue + ")").prop('checked', true);

        $(this).children(':radio').prop("disabled", true);
      });
    }

    // AGE DIAGRAM

    function setAgeResults(currentArray){
      
      console.log(currentArray)
      console.log(currentArray[0].content)
      console.log(currentArray[0].quantity)

      var resultsArray = 
        [{
            "name": currentArray[0].content,
            "points": currentArray[0].quantity,
            "color": "#DB4C3C",
            // "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
        }, {
            "name": currentArray[1].content,
            "points": currentArray[1].quantity,
            "color": "#FEC514",
            // "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
        }, {
            "name": currentArray[2].content,
            "points": currentArray[2].quantity,
            "color": "#a96f81",
            // "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
        }, {
            "name": currentArray[3].content,
            "points": currentArray[3].quantity,
            "color": "#aed7e0",
            // "bullet": "https://www.amcharts.com/lib/images/faces/E01.png"
        }, {
            "name": currentArray[4].content,
            "points": currentArray[4].quantity,
            "color": "#7F8DA9",
            // "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
        }];

      return resultsArray;

    }

    function drawChart(AmCharts, resultsArray, totalMax){

      var options = {
        "type": "serial",
        "theme": "light",
        //"creditsPosition": "top-right",
        "fontSize": 12,
        "dataProvider": resultsArray,
        "valueAxes": [{
            "maximum": totalMax,
            "minimum": 0,
            "axisAlpha": 0,
            "dashLength": 4,
            "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<span style='font-size:14px;'>[[category]]: <b>[[value]]</b></span>",
            "bulletOffset": 10,
            "bulletSize": 52,
            "colorField": "color",
            "cornerRadiusTop": 8,
            "customBulletField": "bullet",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "type": "column",
            "valueField": "points"
        }],
        "marginTop": 0,
        "marginRight": 0,
        "marginLeft": 0,
        "marginBottom": 0,
        "autoMargins": false,
        "categoryField": "name",
        "categoryAxis": {
            "axisAlpha": 0,
            "gridAlpha": 0,
            "inside": true,
            "tickLength": 0
        },
        //Enabled shows a button for exporting.
        "export": {
            "enabled": false
        }  
      }

      var chart = AmCharts.makeChart("chartdiv", options);

    }