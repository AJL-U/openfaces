
function searchName(set, search) {   // txt == content of form input
    console.log("Set: " , set  );
    console.log( "Search:",  search );
    window.location.href = '/#!/sets/' + set + '/name/'+ search;
 }
