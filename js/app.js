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


    let containerPerson = $('.photo-template').clone();
    // console.log(containerPerson.find('h2'));
    containerPerson.find('h2').text(this.title);
    containerPerson.find('img').attr('src', `${this.image_url}`);
    containerPerson.find('p').text(this.description); 
    containerPerson.removeClass('photo-template');
    containerPerson.attr("class", `${this.keyword} filter`);
    $('main').append(containerPerson);

    // this.optionRender();
}

// Animals.prototype.optionRender=function() {

// let opt = `<option>${this.keyword}</option>`

// if(arrofOption.includes(this.keyword)===true){}
// else{
//   arrofOption.push(this.keyword);
//   $(".select").append(opt);
// }
// }


function optionListRender(myImages,myKeyWord){
  myImages.forEach((animals)=>{
if(myKeyWord.includes(animals.keyword)===true){}
else{
  myKeyWord.push(animals.keyword);
  const opt = `<option>${animals.keyword}</option>`
  $(".select").append(opt);
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



$('#select2').on('click', function() {

  let selectedoption = $('#select2').val();
  // let selectedoption1 = $('#select1').val();

  if (selectedoption == 'byTitle') {
    arrOfprop.sort((a, b) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          else if (a.title < b.title) return -1;
          else return 0;
      });
      // arrOfprop;
      // render2 to do the render
      // render2($('#select1').val());//
      render2(selectedoption1); //Where "selectedoption1" is the value of the filter

  } else if (selectedoption == 'byHorn') {
    arrOfprop.sort((a, b) => {
          if (a.horns > b.horns) return 1;
          else if (a.horns < b.horns) return -1;
          else return 0;
      });
      // arrOfprop;
      render2(selectedoption1);
      // let selectedoption = $('#select1').val();
      // render2(selectedoption);
      // render2($('#select1').val());

  }
  console.log(arrOfprop);

});


function render2(value) {

  // To initiat the render for the selected keyword;
  $('section').empty();

  for (var i = 0; i < arrOfprop.length; i++) {
      if ((arrOfprop[i].keyword) == value || value == 'filter by keword') {

          let musTemplate = $('#templete').html();
          let newObj = Mustache.render(musTemplate, arrOfprop[i]);
          $('section').append(newObj);

      }
  }
}



  $(".select").on("change",function(event){
    let selectKeyword=this.value;
    if(selectKeyword!=="select"){
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
