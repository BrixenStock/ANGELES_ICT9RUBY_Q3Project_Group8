document.addEventListener('DOMContentLoaded', () => {
    const basefare = 50;
    const perKMrate = 15; 
    const baseKM = 2;

    const imageUpload = document.getElementById('profilePicture');
    const imagePreview = document.getElementById('profilePreview');

    if (imagePreview) {
        imagePreview.addEventListener('click', () => {
            if (imageUpload) imageUpload.click();
        });
    }

    if (imageUpload) {
        imageUpload.addEventListener('change', () => {
            const file = imageUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (imagePreview) imagePreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Set distance based on selected pickup and drop-off locations
    const pickupSelect = document.getElementById('pickupSelect');
    const dropoffSelect = document.getElementById('dropoffSelect');

    const distances = {
        "Roosevelt": 0,
        "Balintawak": 2,
        "Monumento": 4,
        "5th Avenue": 6,
        "R. Papa": 8,
        "Abad Santos": 10,
        "Blumentritt": 12,
        "Tayuman": 14,
        "Bambang": 16,
        "Doroteo Jose": 18,
        "Carriedo": 20,
        "Central Terminal": 22
    };

    function updateDistance() {
        const pickup = pickupSelect.value;
        const dropoff = dropoffSelect.value;
        if (pickup && dropoff && distances[pickup] !== undefined && distances[dropoff] !== undefined) {
            const dist = Math.abs(distances[pickup] - distances[dropoff]);
            document.getElementById('pickupDistance').value = dist;
            document.querySelector('.distance').style.display = 'block';
        } else {
            document.querySelector('.distance').style.display = 'none';
        }
    }
    if (pickupSelect) pickupSelect.addEventListener('change', updateDistance);
    if (dropoffSelect) dropoffSelect.addEventListener('change', updateDistance);

    function calculateFare(distance, isDiscounted = false) {
        let fare = basefare;
        if (distance > baseKM) {
            fare += (distance - baseKM) * perKMrate;
        }
        if (isDiscounted) {
            fare *= 0.8;
        }
        return fare;
    }

    window.calculateAndDisplayFare = function() {
        const distance = parseFloat(document.getElementById('pickupDistance').value);
        const age = parseInt(document.getElementById('userAge').value);
        const fareDisplay = document.getElementById('fareDisplay');

        if (isNaN(distance) || distance <= 0) {
            fareDisplay.textContent = "Please enter a valid distance.";
            return;
        }

        if (isNaN(age) || age < 1) {
            fareDisplay.textContent = "Please enter a valid age.";
            return;
        }

        const isDiscounted = age > 40;
        const fare = calculateFare(distance, isDiscounted);

        fareDisplay.textContent = `Total Fare: Php ${fare.toFixed(2)} ${isDiscounted ? '(Senior Citizen discount applied.)' : ''}`;
    };

    window.registered = function() {
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const age = document.getElementById('age').value.trim();
        const contact = document.getElementById('Contact').value.trim();
        const profilePicture = document.getElementById('profilePicture').files[0];
        if (!firstname || !lastname || !username || !email || !password || !age || !contact) {
            alert("Please fill out all required fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (isNaN(age) || age < 13 || age > 70) {
            alert("Please enter a valid age between 13 and 70.");
            return;
        }

        if (isNaN(contact)) {
            alert("Please enter a valid contact number.");
            return;
        }

        alert("Congratulations! Your account has been successfully created. Welcome to Velora!");
        window.location.href = "index.html";
    };
});

