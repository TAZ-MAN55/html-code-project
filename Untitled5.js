// Food choices available
const foodChoices = [
    { value: 'chicken', label: '🍗 Chicken' },
    { value: 'beef', label: '🥩 Beef' },
    { value: 'vegetarian', label: '🥗 Vegetarian' },
    { value: 'fish', label: '🐟 Fish' }
];

// Store guests data
let guests = [];

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    const partySize = document.getElementById('partySize');
    const guestForm = document.getElementById('guestForm');

    // Update food choices when party size changes
    partySize.addEventListener('change', updateFoodChoices);

    // Call once to initialize
    updateFoodChoices();

    // Handle form submission
    guestForm.addEventListener('submit', handleFormSubmit);
});

// Update food choice fields based on party size
function updateFoodChoices() {
    const partySize = parseInt(document.getElementById('partySize').value);
    const foodContainer = document.getElementById('foodChoices');

    foodContainer.innerHTML = '';

    for (let i = 0; i < partySize; i++) {
        const personDiv = document.createElement('div');
        personDiv.className = 'person-food-choices';
        personDiv.style.marginBottom = '15px';
        personDiv.style.paddingBottom = '15px';
        personDiv.style.borderBottom = '1px solid #ddd';

        const personLabel = document.createElement('div');
        personLabel.textContent = `Person ${i + 1}:`;
        personLabel.style.fontWeight = '600';
        personLabel.style.marginBottom = '8px';
        personLabel.style.color = '#333';
        personDiv.appendChild(personLabel);

        foodChoices.forEach(choice => {
            const radioGroup = document.createElement('div');
            radioGroup.className = 'food-choice-item';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = `food_${i}_${choice.value}`;
            radio.name = `person_${i}_food`;
            radio.value = choice.value;
            radio.required = true;
            radio.style.cursor = 'pointer';

            const label = document.createElement('label');
            label.htmlFor = `food_${i}_${choice.value}`;
            label.textContent = choice.label;
            label.style.cursor = 'pointer';
            label.style.fontWeight = '400';
            label.style.margin = '0';

            radioGroup.appendChild(radio);
            radioGroup.appendChild(label);
            personDiv.appendChild(radioGroup);
        });

        foodContainer.appendChild(personDiv);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const guestName = document.getElementById('guestName').value.trim();
    const partySize = parseInt(document.getElementById('partySize').value);

    if (!guestName) {
        alert('Please enter guest name');
        return;
    }

    // Collect food choices for each person
    const attendees = [];
    for (let i = 0; i < partySize; i++) {
        const foodChoice = document.querySelector(`input[name="person_${i}_food"]:checked`);
        if (!foodChoice) {
            alert(`Please select food choice for Person ${i + 1}`);
            return;
        }

        const selectedLabel = foodChoices.find(fc => fc.value === foodChoice.value).label;
        attendees.push({
            name: i === 0 ? guestName : `Guest of ${guestName}`,
            foodChoice: foodChoice.value,
            foodLabel: selectedLabel
        });
    }

    // Create guest object
    const guest = {
        id: Date.now(),
        name: guestName,
        partySize: partySize,
        attendees: attendees
    };

    // Add to guests array
    guests.push(guest);

    // Update display
    displayGuests();

    // Reset form
    document.getElementById('guestForm').reset();
    document.getElementById('partySize').value = '1';
    updateFoodChoices();
}

// Display all guests
function displayGuests() {
    const guestListContainer = document.getElementById('guestListContainer');

    if (guests.length === 0) {
        guestListContainer.innerHTML = '<p class="no-guests">No guests added yet. Add your first guest!</p>';
        return;
    }

    guestListContainer.innerHTML = '';

    guests.forEach((guest, index) => {
        const guestCard = document.createElement('div');
        guestCard.className = 'guest-card';

        let cardHTML = `
            <div class="guest-name">${index + 1}. ${guest.name}</div>
            <div class="guest-details">
                <div class="detail-item">
                    <span class="detail-label">Party Size:</span> ${guest.partySize} ${guest.partySize === 1 ? 'person' : 'people'}
                </div>
            </div>
            <div class="attendees">
                <div class="detail-label">Food Preferences:</div>
        `;

        guest.attendees.forEach((attendee, idx) => {
            cardHTML += `
                <div class="attendee-item">
                    <span class="attendee-name">${attendee.name}:</span>
                    <span class="food-preference">${attendee.foodLabel}</span>
                </div>
            `;
        });

        cardHTML += '</div>';

        guestCard.innerHTML = cardHTML;
        guestListContainer.appendChild(guestCard);
    });
}
