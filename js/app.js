'use strict';
let arrOfprop = [];
let arrofOption =[];
function Animals(animals) {
   
    this.image_url = animals.image_url;
    this.title = animals.title;
    this.description = animals.description;
    this.keyword = animals.keyword;
    this.horns = animals.horns;
    arrOfprop.push(this);
  }



  Animals.prototype.render = function () {

    let musTemplate = $('#templete').html();
    let newObj = Mustache.render(musTemplate, this);
    $('section').append(newObj);

    // this.optionRender();
}


function optionListRender(myImages,myKeyWord){
  $(".select1").empty();
  const opt1 = `<option value="" class="option" >Filter by Keyword</option>`
  $(".select1").append(opt1);
  myImages.forEach((animals)=>{
if(myKeyWord.includes(animals.keyword)===true){}
else{
  myKeyWord.push(animals.keyword);
  // containerPerson.find(".keywordoptions").text(`${animals.keyword}`)
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

      // console.log(myImages);
      // dogObject.renderManually();
      // titleObject.optionRender();
      titleObject.render();
    });
    optionListRender(myImages,myKeyWord);

    // console.log(myKeyWord);
  });
}

$('#select2').on('change', function() {

  let selectedSortOption = $('#select2').val();
  // let selectedoption1 = $('.select1').val();

  if (selectedSortOption == 'byTitle') {
    arrOfprop.sort((a,b) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          else if (a.title < b.title) return -1;
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

function render2(value) {

  // To initiat the render for the selected keyword;
  // $('section').empty();

  for (var i = 0; i < arrOfprop.length; i++) {
      if ((arrOfprop[i].keyword) == value || value == 'filter by keword') {

          let musTemplate = $('#templete').html();
          let newObj = Mustache.render(musTemplate, arrOfprop[i]);
          $('section').append(newObj);

      }
  }
}


  $(".select1").on("change",function(event){
    let selectKeyword=this.value;
    if(selectKeyword!=="select"){
      // console.log(selectKeyword);
      renderFilterhorns(selectKeyword);
      // render2(selectKeyword);

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



