$(()=>{

  renderdb();
  $('form').submit(addcity);
});

function renderdb(){

  $.get('/cities')
        .done(cities=>{
          let $cities = cities.map(city=>{
            let $city = $('<tr>');
            // let $td = $('<td>');
            // let $city= `<tr>
            //             <td>${city.city}</td>
            //             <td>${city.state}</td>
            //             <td>${city.population}</td>
            //             </tr>`;
            $city.data('id',city['id']);
            $city.append(`<td>${city.city}</td>`);
            $city.append(`<td>${city.state}</td>`);
            $city.append(`<td>${city.population}</td>`);
            // $city.removeClass('template');
            // $city.find('.city').text();
            // $city.find('.state').text(city.state);
            // $city.find('.population').text(city.population);

            // console.log($city);
            // console.log($td);
            return $city;
          });
          $('tbody').empty().append($cities);
          // console.log($cities);
        })
        .fail(err=>{
          console.log('err',err);
        });
}

function addcity(e){

  e.preventDefault();

  let city=$('#cityName').val();
  let state=$('#cityState').val();
  let population=$('#cityPop').val();
  // console.log(city,state,population);
  $.ajax({
    url:'/cities',
    method:'POST',
    data:{city,state,population},
    // datatype:
  })
  .done(newcity => {
      renderdb();
      $('form')[0].reset();
  })
  .fail(err => console.log('err',err));

}
