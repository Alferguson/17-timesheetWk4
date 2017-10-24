// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4CVxxN4JTuVHdE0r0GKevgdANAHuf0E0",
    authDomain: "timesheet-900ad.firebaseapp.com",
    databaseURL: "https://timesheet-900ad.firebaseio.com",
    projectId: "timesheet-900ad",
    storageBucket: "timesheet-900ad.appspot.com",
    messagingSenderId: "518627865249"
};
firebase.initializeApp(config);

dataRef = firebase.database();

 // function that everytime that a child is added to firebase, dynamically create tables values in html
 dataRef.ref().on("child_added", function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().monthsWorked);
      console.log(childSnapshot.val().monthlyRate);
      console.log(childSnapshot.val().totalBilled);
      name = childSnapshot.val().name;
      role = childSnapshot.val().role;
      startDate = childSnapshot.val().startDate;
      monthsWorked = childSnapshot.val().monthsWorked;
      monthlyRate = childSnapshot.val().monthlyRate;
      totalBilled =  childSnapshot.val().totalBilled;
      
      tableTr = $("<tr>");
      tableTr.append("<td>" + name + "</td>");
      tableTr.append("<td>" + role + "</td>");
      tableTr.append("<td>" + startDate + "</td>");
      tableTr.append("<td>" + monthsWorked + "</td>");
      tableTr.append("<td>" + monthlyRate + "</td>");
      tableTr.append("<td>" + totalBilled + "</td>");

      tableTbody = $("<tbody>");
      tableTbody.append(tableTr);
      $("#timesheet-table").append(tableTbody);
  });


$("#submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#employee-form").val().trim();
    var role = $("#role-form").val().trim();
    var startDate = $("#start-date-form").val().trim();
    var monthlyRate = $("#monthly-rate-form").val().trim();

    var today = new Date();
    console.log(today.getFullYear());
    console.log(today.getMonth());

    var monthsWorked = 20;
    var totalBilled = monthsWorked * monthlyRate;

    dataRef.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthsWorked: monthsWorked,
        monthlyRate: monthlyRate,
        totalBilled: totalBilled
    });

});


