function hasExpirienceChanged() {
    var hasNoExpiriense = document.getElementById("has-no-expirience");
    var workExpirience = document.getElementById("work-expirience");
    var noExpirience = document.getElementById("no-expirience");

    if (hasNoExpiriense.checked == true){
        workExpirience.style.display = "none";
        noExpirience.style.display = "block";
    } else {
        noExpirience.style.display = "none";
        workExpirience.style.display = "block";
    }
  }