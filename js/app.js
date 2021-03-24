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

    this.optionRender();
}

Animals.prototype.optionRender=function() {

let opt = `<option>${this.keyword}</option>`

if(arrofOption.includes(this.keyword)===true){}
else{
  arrofOption.push(this.keyword);
  $(".select").append(opt);
}
}


  const ajaxData = {
    method: "get",
    dataType: "json",
  };
  

let numOfPagge = $('button').on('click',function(){

  numOfPagge = $(this).attr('id')

  ajaxFunc(numOfPagge);
  
})

function ajaxFunc(numOfPagge){

  $.ajax(`"data/page-${numOfPagge}.json"`, ajaxData).then((data) => {
    data.forEach((animals) => {
      let titleObject = new Animals(animals);
      console.log(titleObject);
      // dogObject.renderManually();
       titleObject.render();
    });
  });

}

  $(".select").on("change",function(event){
    let selectKeyword=this.value;
    if(selectKeyword!=="select"){
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


