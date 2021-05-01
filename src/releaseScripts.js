/******Global Variables******/
//Releases
var apiReleases, startDate;

/*Releases*/
//Load Releases
function loadReleases(){
  //Get Bot Dashboard link
  apiReleases = 'e2d12bed872376328e261d8b34f979f7c0f3f40d';
  //startDate = data.startDate;
  //document.getElementById('startDate').value = startDate;
  var d = new Date();
  document.getElementById('startMonth').value = (d.getMonth() + 1);
  document.getElementById('startDate').value = d.getDate();
  document.getElementById('startYear').value = d.getFullYear();
  //document.getElementById('endDate').value = startDate;
  document.getElementById('offset').value = 0;
  document.getElementById('results').innerHTML = 'Results: ' + 0;
  //endDate = data.endDate;
}
//Clear Releases
function clearReleases(){
  document.getElementById('releases').innerHTML = "";
}
//+1 Day
function addDay(){
  var currentMonth = document.getElementById('startMonth').value;
  var currentDay = document.getElementById('startDate').value;
  var currentYear = document.getElementById('startYear').value;
  currentMonth = parseInt(currentMonth, 10);
  currentDay = parseInt(currentDay, 10);
  currentYear = parseInt(currentYear, 10);

  if (currentMonth < 12){
    if (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10){
      if (currentDay != 31){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay = 31){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    } else if (currentMonth == 2){
      if ((currentYear % 4) == 0){
        if (currentDay != 29){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 29){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      } else {
        if (currentDay != 28){
          document.getElementById('startDate').value = currentDay + 1;
        } else if (currentDay == 28){
          document.getElementById('startDate').value = 1;
          document.getElementById('startMonth').value = currentMonth + 1;
        }
      }
    } else {
      if (currentDay != 30){
        document.getElementById('startDate').value = currentDay + 1;
      } else if (currentDay == 30){
        document.getElementById('startDate').value = 1;
        document.getElementById('startMonth').value = currentMonth + 1;
      }
    }
  } else {
    if (currentDay != 31){
      document.getElementById('startDate').value = currentDay + 1;
    } else if (currentDay = 31){
      document.getElementById('startDate').value = 1;
      document.getElementById('startMonth').value = 1;
      document.getElementById('startYear').value = currentYear + 1;
    }
  }
}
//Go To Today
function goToday(){
  var d = new Date();
  document.getElementById('startMonth').value = (d.getMonth() + 1);
  document.getElementById('startDate').value = d.getDate();
  document.getElementById('startYear').value = d.getFullYear();
}
//Offset +100
function add100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current += 100;
  document.getElementById('offset').value = current;
}
//Offset -100
function rem100(){
  var current = document.getElementById('offset').value;
  current = parseInt(current, 10);
  current -= 100;
  document.getElementById('offset').value = current;
}
//Get Releases
function getReleases(){
  var title = [], platform = [];
  var titleD = [], platform = [];
  var title1 = [], platform1 = [];
  var start = document.getElementById('startYear').value + '-' + document.getElementById('startMonth').value + '-' + document.getElementById('startDate').value;
  var offset = document.getElementById('offset').value;
  var t1 = `<tr><td class='releaseList'><span id='name'>`;
  var t4 = `</span></td></tr><tr><td colspan='2'>=========================================================</td></tr>`;

  $.ajax({
    datatype: 'json',
    url: 'https://www.gamespot.com/api/releases/?api_key=' + apiReleases + '&offset=' + offset +'&sort=release_date:asc&filter=release_date:' + start + '&format=json',
    success: function(data)
    {
      console.log(data.results)
      var offsetCheck = offset;
      var results = parseInt(data.number_of_total_results, 10);
      var max = results - offsetCheck;

      //Place in arrays
      if (max < 100){
        for (i = 0; i < max; i ++ ){
          if (data.results[i].region == 'North America'){
            if (document.getElementById('pc').checked == true){
              var tempTitle = `<a href='https://www.google.com/search?q=`+ data.results[i].name + ` (` + data.results[i].platform + `)' target='_blank'>` + data.results[i].name + ` (` + data.results[i].platform + `)` + `</a>`;
              if (title1.includes(tempTitle)){
                //Do nothing
              } else {
                title1[i] = tempTitle;
              }
            } else {
              if (data.results[i].platform != 'PC'){
                if (data.results[i].platform != 'Macintosh'){
                  if (data.results[i].platform != 'Linux'){
                    var tempTitle = `<a href='https://www.google.com/search?q=`+ data.results[i].name + ` (` + data.results[i].platform + `)' target='_blank'>` + data.results[i].name + ` (` + data.results[i].platform + `)` + `</a>`;
                    if (title1.includes(tempTitle)){
                      //Do nothing
                    } else {
                      title1[i] = tempTitle;
                    }
                  }
                }
              }
            }
          }
        };
      } else {
        for (i = 0; i < 100; i ++ ){
          if (data.results[i].region == 'North America'){
            if (document.getElementById('pc').checked == true){
              var tempTitle = `<a href='https://www.google.com/search?q=`+ data.results[i].name + ` (` + data.results[i].platform + `)' target='_blank'>` + data.results[i].name + ` (` + data.results[i].platform + `)` + `</a>`;
              if (title1.includes(tempTitle)){
                //Do nothing
              } else {
                title1[i] = tempTitle;
              }
            } else {
              if (data.results[i].platform != 'PC'){
                if (data.results[i].platform != 'Macintosh'){
                  if (data.results[i].platform != 'Linux'){
                    var tempTitle = `<a href='https://www.google.com/search?q=`+ data.results[i].name + ` (` + data.results[i].platform + `)' target='_blank'>` + data.results[i].name + ` (` + data.results[i].platform + `)` + `</a>`;
                    if (title1.includes(tempTitle)){
                      //Do nothing
                    } else {
                      title1[i] = tempTitle;
                    }
                  }
                }
              }
            }
          }
        };
      }

      //Remove Blank entries
      var z = 0;
      for (k = 0; k < title1.length; k++){
        if (title1[k] != null){
          title[z] = title1[k];
          z += 1;
        }
      }

      //Post to User
      document.getElementById('releases').innerHTML += `<h3><u>` + data.results[0].release_date.substring(5,10) + '-' + data.results[0].release_date.substring(0,4) + `</u></h3>`;
      for (j = 0; j < title.length; j++){
        document.getElementById('releases').innerHTML += t1 + title[j] + t4;
      }
      document.getElementById('results').innerHTML = 'Results: ' + data.number_of_total_results;
    },
    error: function(){
      console.log("The Request Failed");
    }
  });
}
