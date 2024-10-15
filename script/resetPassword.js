$(document).ready(function () {


    $('.login-button').on('click', function () {
      // Get values from input fields
      const username = $('#username').val();
      const password = $('#password').val();
      const confirmPassword = $('#confirmpassword').val();

      //validation for user form
      if ( !username || !password || !confirmPassword) {
         $('#error-msg').text('All fields are required.')
          return; 
      }

      if(password !== confirmPassword){        
              $('#error-msg').text('Passwords do not match.')
              return;         
      }


      if (password.length < 8) {
        $('#error-msg').text('Password must be at least 8 characters long.')
        return;
      }
      const userData = {
        username,
        password,

      };

      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      // Get the token from url
      const token = url.searchParams.get('token');
      // Making the API request using axios
      axios.patch(`https://be-user-record-app.onrender.com/resetPassword/${token}`, userData)
        .then(function (response) {
          $('#error-msg').text('')
          // Set modal attributes to toast msg
          const toast = $('#liveToast');
          toast.addClass('toast fade show');
          setTimeout(function () {
            // Navigate to login page after password reset 
              window.location.href = './login.html';
          }, 2000);


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