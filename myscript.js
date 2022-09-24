
var interv;
var prev = {};
// alert("hello");

var esw;
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
  const rrr = ref1(database, "esw/" );
  onValue1(rrr, (snapshot) => {
    esw = snapshot.val();
    document.getElementById("table").innerHTML = ``;
    var txt = "";
    for (k in esw) {
      // console.log(k);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          js = JSON.parse(xhttp.responseText);
          
            for (var j = 1; j <= 7; j++){
              try {
                test = js["feeds"]
                  .at(-1)
                  ["field" + j].slice(2, -1)
                  .replace(/ /g, "+");
                var key = "MySecretKeyesw39";

                var iv = CryptoJS.enc.Utf8.parse(atob(test.substring(0, 24)));

                test = test.substring(24);

                key = CryptoJS.enc.Utf8.parse(key);
                var decrypted = CryptoJS.AES.decrypt(test, key, {
                  iv: iv,
                  mode: CryptoJS.mode.CBC,
                });
                js["feeds"].at(-1)["field" + j] = decrypted =
                  decrypted.toString(CryptoJS.enc.Utf8);
              } catch (err) {
              } finally {
              }

          }
          
          

          txt += `
                  <tr>
                  <td class='Click-here'>${k}</td>
                    <td class='Click-here'>${js["feeds"].at(-1)["field1"]}</td>
                    <td class='Click-here'>${js["feeds"].at(-1)["field2"]}</td>
                    <td class='Click-here'>${js["feeds"].at(-1)["field3"]}</td>
                    <td class='Click-here'>${js["feeds"].at(-1)["field4"]}</td>
                    <td class='Click-here'>${js["feeds"].at(-1)["field5"]}</td>
                    <td><a target="_blank" href="https://maps.google.com/?q=${
                      js["feeds"].at(-1)["field6"]
                    }">${js["feeds"].at(-1)["field6"]}</a></td>
                    
                  `;

          if (js["feeds"].at(-1)["field7"] == 1) {
            txt += `
             <td class='Click-here' style="color:yellow">ADL Fall</td> 
                    </tr>
                    <div class="callout">

                      <div class="callout-header" , style="background-color:red,color:black;">Fall Detected</div>

                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>

                        <div class="callout-container">

                          <p>An ADL Fall of User: ${k} has been detected at <a href="https://maps.google.com/?q=${js["feeds"][0]["field6"]}">Location</a> at <span id='datetime'></span>.</p>

                          <script>
                              var dt = new Date();
                              document.getElementById('datetime').innerHTML += dt.getDate() + "\" + dt.getMonth() + "\" + dt.getYear() + "  " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() ;
                          </script>

                        </div>

                      </div>
                    </div>
                   
                    `;
          } else {
            if (js["feeds"].at(-1)["field7"] == 2) {
              txt += `
               <td class='Click-here' style="color:red">Fall</td> 
                      </tr>
                      <div class="callout">

                      <div class="callout-header" , style="background-color:red,color:black;">Fall Detected</div>

                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>

                        <div class="callout-container">

                          <p>An Fall of User: ${k} has been detected at <a href="https://maps.google.com/?q=${js["feeds"][0]["field6"]}">Location</a> at <span id='datetime'></span>.</p>

                          <script>
                              var dt = new Date();
                              document.getElementById('datetime').innerHTML += dt.getDate() + "\" + dt.getMonth() + "\" + dt.getYear() + "  " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() ;
                          </script>

                        </div>

                      </div>
                    </div>
                     
                      
                      `;
              //need to add notification
              //
              //
              ///
            } else {
              txt += `
                        
                        <td class='Click-here' style="color:aquamarine">ADL</td> 
                        </tr>
                        `;
            }
          }
          document.getElementById("table").innerHTML = txt;
          prev[k] = {};
          for (var i = 0; i < 7; i++)
            prev[k][i] = [js["feeds"].at(-1)["field" + (i + 1)]];
        }
      };
      // console.log(esw[k]["thing"], k);
      xhttp.open("GET", esw[k]["thing"], false);
      xhttp.send();
    }
    // console.log(esw);
    // updateStarCount(postElement, data);
  });
  // esw = JSON.parse(localStorage.getItem("esw"));
  // console.log(esw);
  


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
    $(".toggle-menu2").click(function () {
      // alert("HELLo");
      $(".toggle-menu").toggleClass("active");
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
          // cols[1].innerText = js["feeds"].at(-1)["field1"];
          // cols[2].innerText = js["feeds"].at(-1)["field2"];
          // cols[3].innerText = js["feeds"].at(-1)["field3"];
          for (var j = 1; j <= 7; j++) {
            try {
              test = js["feeds"].at(-1)["field" + j].slice(2, -1).replace(/ /g, "+");
            var key = "MySecretKeyesw39";

            var iv = CryptoJS.enc.Utf8.parse(atob(test.substring(0, 24)));

            test = test.substring(24);

            key = CryptoJS.enc.Utf8.parse(key);
            var decrypted = CryptoJS.AES.decrypt(test, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
            });
            js["feeds"].at(-1)["field" + j] = decrypted = decrypted.toString(
              CryptoJS.enc.Utf8
            );
            }
            catch (err) { }
            finally {}
            
          }
          for (var j = 1; j <= 7; j++) {
            // console.log(cols[j]);


            if (j == 7) {
              if (js["feeds"].at(-1)["field7"] == "1") {
                cols[7].innerText = "ADL Fall";
                cols[7].attributes.style.value = `color:yellow`;
              } else if (js["feeds"].at(-1)["field7"] == "2") {
                cols[7].innerText = "Fall";
                cols[7].attributes.style.value = `color:red`;
              } else {
                cols[7].innerText = "ADL";
                cols[7].attributes.style.value = `color:aquamarine`;
              }
            }
            else if (j == 6) {
              cols[6].firstChild.innerHTML = js["feeds"].at(-1)["field6"];
              cols[6].firstChild.href =
                "https://maps.google.com/?q=" + js["feeds"].at(-1)["field6"];
              // console.log(cols[6]);
            }
            else {
              cols[j].innerText = js["feeds"].at(-1)["field" + j];

            }
            prev[rows[i].firstElementChild.innerText][j - 1].push(
              js["feeds"].at(-1)["field" + j]
            );
            if (prev[rows[i].firstElementChild.innerText][j - 1].length > 5) {
              prev[rows[i].firstElementChild.innerText][j - 1].shift();
            }
          }
          // console.log(js["feeds"].at(-1)["field7"], js["feeds"].at(-1)["field7"] == 1);


          // cols[7].
          // console.log(cols[7]);
        }
      };
      console.log(rows[i].firstElementChild.innerText);
      xhttp.open(
        "GET",
        esw[rows[i].firstElementChild.innerText]["thing"],
        false
      );
      xhttp.send();


    }
  }, 15000);








  $(document.body).on("click", ".Click-here", function () {
    // chart.destroy();

    // $("pop-up-content-wrap");

    if (this.cellIndex == 0) {
      $(".custom-model-main2").addClass("model-open2");
      // console.log(this.innerHTML);
      document.getElementById("info").innerHTML = `
            Name: ${esw[this.innerHTML]["name"]}<br>
            Age:${esw[this.innerHTML]["age"]}<br>
            Gender:${esw[this.innerHTML]["gender"]}<br>
            Job:${esw[this.innerHTML]["job"]}<br>
            Thingspeak url:${esw[this.innerHTML]["thing"]}<br>
            `;
      // console.log($("#info"));
      return;
    }
    else {
      $(".custom-model-main").addClass("model-open");
      // $("pop-up-content-wrap").innerHTML = "<canvas id='myChart' style='width:100%;max-width:600px'></canvas>"
    }
    // fetch(esw[this.parentElement.cells[0].innerHTML]["thing"])
    //   .then((response) => response.json())
    //   .then((data) => {
    // chart.data.labels.push(0);
    console.log(this.parentElement.cells[0].innerHTML);
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
          // for (var j = 1; j <= 7; j++) {
            test = data["feeds"].at(-1)["field" + +this.cellIndex]
              .slice(2, -1)
              .replace(/ /g, "+");
            var key = "MySecretKeyesw39";

            var iv = CryptoJS.enc.Utf8.parse(atob(test.substring(0, 24)));
            // var iv = CryptoJS.enc.Utf8.parse(
            //   "d\xae\xf2\x02\xb8\xae>\x0f\xe6f\xe2\x80\xdc\xb1e\xd4"
            // );

            // console.log(j,test.substring(0, 24), test.substring(24));
            // console.log(j, atob(test.substring(0, 24)), test.substring(24),iv);
            test = test.substring(24);

            key = CryptoJS.enc.Utf8.parse(key);
            var decrypted = CryptoJS.AES.decrypt(test, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
            });
            data["feeds"].at(-1)["field" + +this.cellIndex] = decrypted =
              decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(decrypted);
          // }
          chart.data.labels.push(chart.data.labels.at(-1) + 15);
          chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data["feeds"].at(-1)["field" + this.cellIndex]);
          });
          chart.update();
        });
    }, 15000);
  });

});

