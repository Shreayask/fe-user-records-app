$(document).ready(function () {


    // Fetching users from API
    axios.get('https://be-user-record-app.onrender.com/getUsers')
        .then(function (response) {
            const users = response.data.data;
            $('#user-count').text(`${users.length}`)
            if (users.length < 1) {
                const userRow = `
                        <tr class="user-row">
                            <td colspan='4' style='text-align:center;'><span >No users</span></td>
                            
                        </tr>
                    `;
                // Append the new row to  table body
                $('.table tbody').append(userRow);
                return;
            }
            users.forEach((user, index) => {
                const userRow = `
                        <tr class="user-row">
                            <th scope="row">${index + 1}</th>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td><span style='margin-left:2rem;' id='view-button' data-user-id=${user._id}><i class="bi bi-eye-fill" style='color: #2a69c5;'></i></span></td>
                        </tr>
                    `;
                // Append the new row to the table body
                $('.table tbody').append(userRow);
            });
        })
        .catch(function (error) {
            console.error('Error fetching users:', error);
        });


    //fetch individual user's detail
    function fetchUser(userId) {
        const params = { id: userId }
        axios.get('https://be-user-record-app.onrender.com/getUser', { params })
            .then(function (response) {
                $('.user-detail-section').empty();
                const userDetails = response.data.data
                const userDescBody = `<h5>Name: ${userDetails.name}</h5>
<h5>Address: ${userDetails.address}</h5>
<h5>Email: ${userDetails.email}</h5>
<h5>Phone number: ${userDetails.number}</h5>
<h5>Gender: ${userDetails.gender}</h5>`;
                $('.user-detail-section').append(userDescBody)

            })
            .catch(error => {
                console.log(error)
            })
    }

    //adding click event to view individual event details
    $('.table tbody').on('click', '#view-button', function () {
        const userId = $(this).data('user-id');
        const modal = $('#view-user-modal');

        // Set modal attributes
        modal.addClass('modal fade show');
        modal.css('display', 'block');
        modal.attr('aria-modal', 'true');
        fetchUser(userId);
    });

    //event to close view user modal
    $('.user-modal').on('click', '#close-modal', function () {
        console.log('mer')
        const modal = $('#view-user-modal');

        // Set modal attributes
        modal.addClass('modal fade ');
        modal.css('display', 'none');
        modal.removeAttr('aria-modal');
    })

    $('#logout-btn').click(function () {
        localStorage.removeItem('userId')
        window.location.href = '../index.html'
    })
});