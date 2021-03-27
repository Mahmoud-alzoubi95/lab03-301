'use strict';
let arrOfprop = [];// this array contains the opjects
let arrofOption =[];
function Animals(animals) {
   
    this.image_url = animals.image_url;
    this.title = animals.title;
    this.description = animals.description;
    this.keyword = animals.keyword;
    this.horns = animals.horns;
    arrOfprop.push(this);
  }

//this render using the Mustache templete  , look to the html file and see how the Mustache created using the script 
  Animals.prototype.render = function () {

    let musTemplate = $('#templete').html();//creating the templete
    let newObj = Mustache.render(musTemplate, this); //filling the parameter in the templete 
    $('section').append(newObj);//append the Mustache to the normal section in the html 

    // this.optionRender();
}

//create the option list 
function optionListRender(myImages,myKeyWord){
  $(".select1").empty();
  const opt1 = `<option value="" class="option" >Filter by Keyword</option>`
  $(".select1").append(opt1);
  myImages.forEach((animals)=>{
if(myKeyWord.includes(animals.keyword)===true){}//use this method to filter the option list 
else{
  myKeyWord.push(animals.keyword);
  const opt = `<option>${animals.keyword}</option>`
  $(".select1").append(opt);
}
});
}
  const ajaxData = {
    method: "get",
    dataType: "json",
  };

let numOfPagge = $('button').on('click',function(){
  $('div').hide();
  arrOfprop=[]; // to make the array of object empty 
  numOfPagge = $(this).attr('id')
  // renderFilterhorns(selectKeyword);
  ajaxFunc(numOfPagge);
})

ajaxFunc(1);

function ajaxFunc(numOfPagge){
  const myImages =[];
  const myKeyWord =[];

  $.ajax(`data/page-${numOfPagge}.json`, ajaxData).then((data) => {
    data.forEach((animals) => {
      let titleObject = new Animals(animals);
      myImages.push(titleObject);

      // dogObject.renderManually();
      // titleObject.optionRender();
      titleObject.render();
    });
    // console.log(myKeyWord);
    // console.log(myImages);
    optionListRender(myImages,myKeyWord);

  });
}

$('#select2').on('change', function() {

  let selectedSortOption = $('#select2').val();
  // let selectedoption1 = $('.select1').val();

  if (selectedSortOption == 'byTitle') {
    arrOfprop.sort((a,b) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          else if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
          else return 0;
      });
      $('div').hide();
      for (var i = 0; i < arrOfprop.length; i++) {

        arrOfprop[i].render();

      }

  } else if (selectedSortOption == 'byHorn') {
    arrOfprop.sort((a, b) => {
          if (a.horns > b.horns) return 1;
          else if (a.horns < b.horns) return -1;
          else return 0;
      });
      $('div').hide();
      for (var i = 0; i < arrOfprop.length; i++) {
      
        arrOfprop[i].render();
      }
  }
  console.log(arrOfprop);
  // console.log(selectedSortOption);
});

  $(".select1").on("change",function(event){
    let selectKeyword=this.value;
    if(selectKeyword!=="Filter by Keyword"  ){
      // console.log(selectKeyword);
      renderFilterhorns(selectKeyword);
    }
  });

function renderFilterhorns(selectKeyword){
  arrOfprop.forEach((kind)=>{
if(kind.keyword ===selectKeyword ){
$(`.${selectKeyword}`).addClass("filter");
}
else{
  $(`.${kind.keyword}`).removeClass("filter")
}
  })
  }
  
// $('.filter').show()
// $("div").hide()


