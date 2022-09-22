
var interv;
var prev = {};
// alert("hello");
$(document).ready(function () {
    var xValues = [];
    var yValues = [];
    var chart = new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues,
          },
        ],
      },
      options: {
        legend: { display: false },
        // scales: {
        //   yAxes: [{ ticks: { min: 0, max: 100 } }],
        // },
      },
    });
    
    var esw = JSON.parse(localStorage.getItem("esw"));
  document.getElementById("table").innerHTML = ``;
   var txt = "";
    for (k in esw) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //   console.log(xhttp.responseText, ["feeds"]);
            js = JSON.parse(xhttp.responseText);
            
              txt += `
                  <tr>
                  <td class='Click-here'>${k}</td>
                    <td class='Click-here'>${js["feeds"][0]["field1"]}</td>
                    <td class='Click-here'>${js["feeds"][0]["field2"]}</td>
                    <td class='Click-here'>${js["feeds"][0]["field3"]}</td>
                    <td class='Click-here'>${js["feeds"][0]["field4"]}</td>
                    <td class='Click-here'>${js["feeds"][0]["field5"]}</td>
                    <td><a target="_blank" href="https://maps.google.com/?q=${js["feeds"][0]["field6"]}">${js["feeds"][0]["field6"]}</a></td>
                    
                  `; 
                  
                  if(js["feeds"][0]["field7"] == 1 ){
                    txt += `
                    
                    <td class='Click-here' style="color:yellow">ADL Fall</td> 
                    </tr>
                    `;                    
                  }
                  else
                  {
                    if(js["feeds"][0]["field7"] == 2 ){
                      txt += `
                      
                      <td class='Click-here' style="color:red">Fall</td> 
                      </tr>
                      
                      `;
                      //need to add notification
                      //
                      //
                      ///                    
                    }
                    else
                    {
                      
                        txt += `
                        
                        <td class='Click-here' style="color:aquamarine">ADL</td> 
                        </tr>
                        `;                    
                    
                    }
            }
            document.getElementById("table").innerHTML = txt;
            prev[k] = {};
            for (var i = 0; i < 7; i++)
              prev[k][i] = [js["feeds"][0]["field"+(i+1)]];
            
          }
        };
        // console.log(esw[k]["thing"], k);
        xhttp.open("GET", esw[k]["thing"], false);
        xhttp.send();
            
          
        
    }
    
    
    $(".close-btn, .bg-overlay").click(function () {
        // console.log("SA");
      $(".custom-model-main").removeClass("model-open");
      $(".custom-model-main2").removeClass("model-open2");
    //   chart.destroy();
       chart.data.labels = [];
       chart.data.datasets.forEach((dataset) => {
         dataset.data = [];
       });
       chart.update();
      clearInterval(interv);
  });
  $(".toggle-menu").click(function () {
    // alert("HELLo");
    $(this).toggleClass("active");
    $("#menu").toggleClass("open");
  });

    
    setInterval(() => {
        var rows = $("#table").find("tr");
        // console.log(rows.length);
        for (var i = 0; i < rows.length; i++) {
            var cols = $(rows[i]).find("td");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {

                js = JSON.parse(xhttp.responseText);
                // cols[1].innerText = js["feeds"][0]["field1"];
                // cols[2].innerText = js["feeds"][0]["field2"];
                // cols[3].innerText = js["feeds"][0]["field3"];
                
                for (var j = 1; j <= 7; j++){
                  // console.log(cols[j]);
                  
                  
                  if (j == 7)
                  {
                    if (js["feeds"][0]["field7"] == "1") {
                      cols[7].innerText = "ADL Fall";
                      cols[7].attributes.style.value = `color:yellow`;
                    } else if (js["feeds"][0]["field7"] == "2") {
                      cols[7].innerText = "Fall";
                      cols[7].attributes.style.value = `color:red`;
                    } else {
                      cols[7].innerText = "ADL";
                      cols[7].attributes.style.value = `color:aquamarine`;
                    }
                  }
                  else if (j == 6)
                  {
                    cols[6].firstChild.innerHTML = js["feeds"][0]["field6"];
                    cols[6].firstChild.href =
                      "https://maps.google.com/?q=" + js["feeds"][0]["field6"];
                    // console.log(cols[6]);
                  }
                  else
                  {
                    cols[j].innerText = js["feeds"][0]["field" + j];
                    
                  }
                  prev[i][j - 1].push(js["feeds"][0]["field" + j]);
                  if (prev[i][j-1].length > 5)
                  {
                    prev[i][j-1].shift();
                  }
                }
                // console.log(js["feeds"][0]["field7"], js["feeds"][0]["field7"] == 1);
                
                  
                // cols[7].
                // console.log(cols[7]);
              }
            };
            // console.log(esw[k]["thing"], k);
            xhttp.open("GET", esw[i]["thing"], false);
            xhttp.send();

            
        }
    }, 15000);
    
    
    


    
    
    
    $(document.body).on("click", ".Click-here", function () {
      // chart.destroy();
        
        // $("pop-up-content-wrap");
        
        if (this.cellIndex == 0)
        { 
            $(".custom-model-main2").addClass("model-open2");
            // console.log(this.innerHTML);
            document.getElementById("info").innerHTML = `
            Name: ${esw[this.innerHTML]["name"]}<br>
            Age:${esw[this.innerHTML]["age"]}<br>
            Gender:M<br>
            Job:${esw[this.innerHTML]["job"]}<br>
            Thingspeak url:${esw[this.innerHTML]["thing"]}<br>
            `;
            // console.log($("#info"));
            // return;
        }
        else
        {
            $(".custom-model-main").addClass("model-open");
            // $("pop-up-content-wrap").innerHTML = "<canvas id='myChart' style='width:100%;max-width:600px'></canvas>"
        }
          // fetch(esw[this.parentElement.cells[0].innerHTML]["thing"])
          //   .then((response) => response.json())
          //   .then((data) => {
              // chart.data.labels.push(0);
              for (var i = 0; i < prev[this.parentElement.cells[0].innerHTML][this.cellIndex - 1].length; i++) {

                chart.data.labels.push(i * 15);
                // console.log(
                //   prev[this.parentElement.cells[0].innerHTML][
                //     this.cellIndex - 1
                //   ]
                // );
                chart.data.datasets.forEach((dataset) => {
                  dataset.data.push(
                    prev[this.parentElement.cells[0].innerHTML][
                      this.cellIndex - 1
                    ][i]
                  );
                
                });
              }
              chart.update();
            // });
      // console.log(this);
         interv = setInterval(() => {
      fetch(esw[this.parentElement.cells[0].innerHTML]["thing"])
        .then((response) => response.json())
        .then((data) => {
          chart.data.labels.push(chart.data.labels.at(-1) + 15);
          chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data["feeds"][0]["field" + this.cellIndex]);
          });
          chart.update();
        });
        }, 15000);
    });

});

