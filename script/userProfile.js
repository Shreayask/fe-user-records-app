$(document).ready(function () {
  const userId = localStorage.getItem('userId')
  const params = { id: userId }
  //https://be-user-record-app.onrender.com
  function fetchUserInfo(){
    axios.get('https://be-user-record-app.onrender.com/getUser', { params })
    .then(function (response) {
      const user = response.data.data
      $('.user-info').empty();
      const userRow = `
                          <p class='user-detail-text'>Name: <span class='mx-1'> ${user.name}</span></p>
                          <p class='user-detail-text'>Email: <span class='mx-1'> ${user.email}</span></p>
                          <p class='user-detail-text'>Address: <span class='mx-1'> ${user.address}</span></p>
                          <p class='user-detail-text'>Phone: <span class='mx-1'> ${user.number}</span></p>
                          <p class='user-detail-text'>Gender : <span class='mx-1'>${user.gender}</span></p>
                  `;
      // Append the new row to the table body
      $('.user-info').append(userRow);

      //appending data in edit model
      $('#name').val(user.name)
      $('#email').val(user.email);
      $('#phonenumber').val(user.number);
      $('#address').val(user.address);
      $('input[name="gender"][value="' + user.gender + '"]').prop('checked', true)
    })
    .catch(error => {
      console.log(error)
    })
  }
 
  fetchUserInfo();
  //adding click event to view edit  user modal
  $('.edit-btn').on('click', function () {
    const modal = $('#view-user-modal');

    // Set modal attributes
    modal.addClass('modal fade show');
    modal.css('display', 'block');
    modal.attr('aria-modal', 'true');
  });

  //on submit edit user
  $('#edit-user').on('click', function () {
    // Get values from input fields
    const name = $('#name').val();
    const email = $('#email').val();
    const number = $('#phonenumber').val();
    const address = $('#address').val();
    const gender = $('input[name="gender"]:checked').val();

    //validation for user form
    if (!name || !email || !number || !address || !gender) {
      $('#error-msg').text('All fields are required.')
      return;
    }


    const userData = {
      name,
      number,
      email,
      address,
      gender
    };
    axios.patch(`https://be-user-record-app.onrender.com/editUser/${userId}`, userData)
      .then(function (response) {
        $('#error-msg').text('')
        const toast = $('#liveToast');
        toast.addClass('toast fade show');
        fetchUserInfo();

      })
      .catch(function (error) {
        $('#error-msg').text(error.response.data.message)
        console.error('Error:', error);

      });
  });

  //event to close view edit  user modal
  $('#view-user-modal').on('click', '#close-modal', function () {
    const modal = $('#view-user-modal');

    // Set modal attributes
    modal.addClass('modal fade ');
    modal.css('display', 'none');
    modal.removeAttr('aria-modal');
  })

})


