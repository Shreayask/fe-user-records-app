$(document).ready(function () {


    $('.login-button').on('click', function () {
      // Get values from input fields
      const username = $('#username').val();
      const password = $('#password').val();


      if (!username || !password) {
        $('#error-msg').text('All fields are required.')
        return;
      }

      if (password.length < 8) {
        $('#error-msg').text('Password must be at least 8 characters long.')
        return;
      }
      const params = {
        username,
        password,

      };


      // Making the API request using axios
      axios.get('https://be-user-record-app.onrender.com/login', { params })
        .then(function (response) {
          $('#error-msg').text('')

          const loggedinUser = response.data.data
         localStorage.setItem('userId',loggedinUser._id)
          // Set modal attributes to toast msg
          const toast = $('#liveToast');
          toast.addClass('toast fade show');
          setTimeout(function () {
            // Navigate to dashboard
            if (loggedinUser.admin) {
              window.location.href = './adminDashboard.html';
            } else {
              window.location.href = './userProfile.html';
            }

          }, 2000);


        })
        .catch(function (error) {
          console.error('Error:', error);
          $('#error-msg').text(`${error.response.data.message || 'Login Failed'}`)

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