$(document).ready(function () {


    $('.login-button').on('click', function () {
      // Get values from input fields
      const username = $('#username').val();

      if (!username) {
        $('#error-msg').text('All fields are required.')
        return;
      }

      const userData = {
        username,
      };

   
      // Making the API request using axios
      axios.post(`https://be-user-record-app.onrender.com/forgotPassword`, userData)
        .then(function (response) {
          $('#error-msg').text('')
              // Set modal attributes to toast msg
          const toast = $('#liveToast');
          toast.addClass('toast fade show');

        })
        .catch(function (error) {
          console.error('Error:', error);
          $('#error-msg').text(`${error.response.data.message || 'Failed'}`)

        });
    });

    $('#login-button').click(function () {
      window.location.href = './login.html'
    })
    $('#close-toast').click(function () {
      const toast = $('#liveToast');

      // Set modal attributes
      toast.removeClass('fade show');
    })
    //close modal
    $('#close-modal').click(function () {
      const modal = $('#signupSuccessModal');

      // Set modal attributes
      modal.addClass('modal fade ');
      modal.css('display', 'none');
      modal.removeAttr('aria-modal');
    })
  }


  );