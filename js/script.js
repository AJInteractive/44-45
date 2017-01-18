(function($) {
  // variables
  var selected = [];
  // event listenters
  $(".faces ul li img").on("click", findSelected);
  //custom functions
  function findSelected(e) {
    var num = $(e.target).attr("id").split("")[1];
    if (selected.length == 0) {
      selected.push(num);
      $(e.target).parent().addClass("active");
      return;
    } else if (selected.length == 1) {
      if (selected.indexOf(num) <= -1) {
        selected.push(num);
        $(e.target).parent().addClass("active");
        //-1 mean update both elements
        display(-1);
        calculate();
        $('.footer').show();
        return;
      } else {
        $(e.target).parent().removeClass("active");
        selected = [];
        $(".data").hide();
        $('.footer').show();
        return;
      }
    }
    if (selected.indexOf(num) <= -1) {
      $("#p" + selected[1]).parent().removeClass("active");
      selected[1] = num;
      $(e.target).parent().addClass("active");
      display(num);
      calculate();
    } else {
      $("#p" + selected[selected.indexOf(num)]).parent().removeClass("active");
      selected.splice(selected.indexOf(num), 1);
      $(".data").hide();
    }
  }

  function display(num) {
    console.log(selected[0]);
    console.log(selected[1]);
    if (selected[0]<selected[1]){
      console.log("left smaller");
    if (num == -1) {
      updateSide("left", selected[1]);
      updateSide("right", selected[0]);
    } else {
      console.log("left smaller and not blank");
      updateSide("right", selected[0]);
      updateSide("left", selected[1]);
    }
    }
    else{
      updateSide("right", selected[1]);
      updateSide("left", selected[0]);
    }
    $(".data").show();
  }

  function updateSide(side, president) {
    var p = data[president];
    $("#names #name-" + side + " h4").text(p.name);
    $("#population ." + side + " .top-value h3 span:first-child").text(
      p.populationstart
    );
    $("#population ." + side + " .bottom-value h3 span:first-child").text(
      p.populartionend
    );
    $("#gdp ." + side + " .top-value h3 span:nth-child(2)").text(
      Number(p.gdpstart).toFixed(2)
    );
    $("#gdp ." + side + " .bottom-value h3 span:nth-child(2)").text(
      Number(p.gdpend).toFixed(2)
    );
    $("#inflation ." + side + " .top-value h3 span:first-child").text(
      p.inflation
    );
    $("#dept ." + side + " .top-value h3 span:nth-child(2)").text(
      Number(p.deptstart).toFixed(2)
    );
    $("#dept ." + side + " .bottom-value h3 span:nth-child(2)").text(
      Number(p.deptend).toFixed(2)
    );
    $("#surplus ." + side + " .top-value h3 span:nth-child(2)").text(
      Number(p.surplusstart).toFixed(2)
    );
    $("#surplus ." + side + " .bottom-value h3 span:nth-child(2)").text(
      Number(p.surplusend).toFixed(2)
    );
    $("#aid ." + side + " .top-value h3 span:nth-child(2)").text(
      commas(Number(p.aidconstant).toFixed(2))
    );
    //constant
    $("#aid ." + side + " .bottom-value h3 span:nth-child(2)").text(
      commas(Number(p.aidcurrent).toFixed(2))
    );
    //current
    $("#incarceration ." + side + " .top-value h3 span:first-child").text(
      commas(p.incarcerationstart)
    );
    $("#incarceration ." + side + " .bottom-value h3 span:first-child").text(
      commas(p.incarcerationend)
    );
    $("#deportations ." + side + " .top-value h3 span:first-child").text(
      commas(p.deportationstart)
    );
    $("#deportations ." + side + " .bottom-value h3 span:first-child").text(
      commas(p.deportationend)
    );
    $("#crimes ." + side + " .top-value h3 span:first-child").text(
      commas(p.crimesstart)
    );
    $("#crimes ." + side + " .bottom-value h3 span:first-child").text(
      commas(p.crimesend)
    );
    $("#shootings ." + side + " .top-value h3 span:first-child").text(
      p.shootingsincidents
    );
    $("#shootings ." + side + " .bottom-value h3 span:first-child").text(
      p.shootingsvictims
    );
    var droneStrikes = "";
    if (typeof p.dronepakistan != "undefined") {
      var arr = p.dronepakistan.split(":");
      droneStrikes += "<h6>Drone Strikes in Pakistan</h6><p>" + arr[0] + "<b>" +
        arr[1] +
        "</b>";
    }
    if (typeof p.droneyemen != "undefined") {
      var arr = p.droneyemen.split(":");
      droneStrikes += "<h6>Drone Strikes in Yemen</h6><p>" + arr[0] + "<b>" +
        arr[1] +
        "</b>";
    }
    if (typeof p.dronesomalia != "undefined") {
      var arr = p.dronesomalia.split(":");
      droneStrikes += "<h6>Drone Strikes in Somalia</h6><p>" + arr[0] + "<b>" +
        arr[1] +
        "</b>";
    }
    if (typeof p.droneafghan != "undefined") {
      var arr = p.droneafghan.split(":");
      droneStrikes += "<h6>Drone Strikes in Afghanistan</h6><p>" + arr[0] +
        "<b>" +
        arr[1] +
        "</b>";
    }
    $("#intervation ." + side).html($("<p></p>").text(p.intervation));
    $("#intervation ." + side).append(droneStrikes);
  }

  function calculate() {
    var first = data[selected[0]];
    var second = data[selected[1]];

    var population_percentage = Percent(
      first.populartionend,
      second.populartionend
    );
    var gdp_percentage = Percent(first.gdpend, second.gdpend);
    var dept_percentage = Percent(first.deptend, second.deptend);
    var inflation_percentage = Percent(first.inflation, second.inflation);
    var surplus_percentage = Percent(first.surplusend, second.surplusend);
    var incarceration_percentage = Percent(
      first.incarcerationend,
      second.incarcerationend
    );
    var deportation_percentage = Percent(
      first.deportationend,
      second.deportationend
    );
    var crimes_percentage = Percent(first.crimesend, second.crimesend);
    var shooting_percentage = Percent(
      first.shootingsvictims,
      second.shootingsvictims
    );

    var up = "glyphicon glyphicon-arrow-up";
    var down = "glyphicon glyphicon-arrow-up";
    $("#pop")
      .text(population_percentage[0])
      .prev()
      .attr("class", population_percentage[1] ? up : down);
    $("#gdp_percentage")
      .text(gdp_percentage[0])
      .prev()
      .attr("class", gdp_percentage[1] ? up : down);
    $("#inflation_percentage")
      .text(inflation_percentage[0])
      .prev()
      .attr("class", inflation_percentage[0] ? up : down);
    $("#dept_percentage")
      .text(dept_percentage[0])
      .prev()
      .attr("class", dept_percentage[1] ? up : down);
    $("#surplus_percentage")
      .text(surplus_percentage[0])
      .prev()
      .attr("class", surplus_percentage[1] ? up : down);
    $("#incarceration_percentage")
      .text(incarceration_percentage[0])
      .prev()
      .attr("class", incarceration_percentage[1] ? up : down);
    $("#deportations_percentage")
      .text(deportation_percentage[0])
      .prev()
      .attr("class", deportation_percentage[1] ? up : down);
    $("#crimes_percentage")
      .text(crimes_percentage[0])
      .prev()
      .attr("class", crimes_percentage[1] ? up : down);
    $("#shooting_percentage")
      .text(shooting_percentage[0])
      .prev()
      .attr("class", shooting_percentage[1] ? up : down);
  }

  function Percent(first, second) {
    return [
      (Math.abs(second - first) / Math.abs(first) * 100).toFixed(2),
      second - first > 0
    ];
  }
  function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})($);
