const deleteButtons = document.querySelectorAll('.delete-user');

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        const userId = event.target.dataset.userId;
        const url = `/users/deleteSingle/${userId}`;

        const headers = {
            'Content-Type': 'application/json',
        };
        const method = 'DELETE';

        fetch(url, {
            method,
            headers
        })
            .then(res => {
                if (res.ok) {
                    console.log(`User with ID ${userId} deleted successfully.`);
                    location.reload();
                } else {
                    console.log(`Failed to delete user with ID ${userId}.`);
                }
            })
            .catch(error => console.error(error));
    });
});