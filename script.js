// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Health Tracker - Save and Display Data
function saveHealthData() {
    const heartRate = document.getElementById('heart-rate').value;
    const bloodPressure = document.getElementById('blood-pressure').value;
    const weight = document.getElementById('weight').value;
    const steps = document.getElementById('steps').value;

    if (!heartRate || !bloodPressure || !weight || !steps) {
        alert('Please fill in all fields');
        return;
    }

    // Get existing data from localStorage
    let healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];

    // Create new record
    const newRecord = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        heartRate,
        bloodPressure,
        weight,
        steps
    };

    // Add to records
    healthRecords.push(newRecord);
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));

    // Clear form
    document.getElementById('heart-rate').value = '';
    document.getElementById('blood-pressure').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('steps').value = '';

    // Display updated records
    displayHealthRecords();

    alert('✅ Health data saved successfully!');
}

// Display Health Records
function displayHealthRecords() {
    const healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    const resultsDiv = document.getElementById('tracker-results');

    if (healthRecords.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align: center; color: #999;">No health records yet. Start tracking your health!</p>';
        return;
    }

    let html = '<h3 style="margin-bottom: 1.5rem; color: #1f2937;">Your Health Records</h3>';
    
    // Display latest 5 records
    healthRecords.slice(-5).reverse().forEach(record => {
        html += `
            <div class="result-item">
                <h4>${record.date} at ${record.time}</h4>
                <p>❤️ Heart Rate: <strong>${record.heartRate} bpm</strong></p>
                <p>🩸 Blood Pressure: <strong>${record.bloodPressure} mmHg</strong></p>
                <p>⚖️ Weight: <strong>${record.weight} kg</strong></p>
                <p>👟 Steps: <strong>${record.steps}</strong></p>
            </div>
        `;
    });

    resultsDiv.innerHTML = html;
}

// Book Appointment
function bookAppointment() {
    const patientName = document.getElementById('patient-name').value;
    const doctor = document.getElementById('doctor-select').value;
    const date = document.getElementById('appt-date').value;
    const time = document.getElementById('appt-time').value;

    if (!patientName || doctor === '-- Choose a Doctor --' || !date || !time) {
        alert('Please fill in all appointment details');
        return;
    }

    // Get existing appointments from localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Create new appointment
    const newAppointment = {
        id: Date.now(),
        patientName,
        doctor,
        date,
        time,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
    };

    // Add to appointments
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Clear form
    document.getElementById('patient-name').value = '';
    document.getElementById('doctor-select').value = '-- Choose a Doctor --';
    document.getElementById('appt-date').value = '';
    document.getElementById('appt-time').value = '';

    // Display updated appointments
    displayAppointments();

    alert('✅ Appointment booked successfully!');
}

// Display Appointments
function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentsDiv = document.getElementById('appointments-list');

    if (appointments.length === 0) {
        appointmentsDiv.innerHTML = '<p style="text-align: center; color: #999;">No appointments booked yet. Book your first appointment!</p>';
        return;
    }

    let html = '<h3 style="margin-bottom: 1.5rem; color: #1f2937;">Your Appointments</h3>';
    
    appointments.reverse().forEach(appt => {
        html += `
            <div class="appointment-item">
                <h4>${appt.patientName}</h4>
                <p>👨‍⚕️ Doctor: <strong>${appt.doctor}</strong></p>
                <p>📅 Date: <strong>${appt.date}</strong></p>
                <p>🕐 Time: <strong>${appt.time}</strong></p>
                <p>📝 Booked on: <strong>${appt.bookingDate}</strong></p>
                <p>✅ Status: <strong style="color: #10b981;">${appt.status}</strong></p>
            </div>
        `;
    });

    appointmentsDiv.innerHTML = html;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayHealthRecords();
    displayAppointments();

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appt-date').setAttribute('min', today);
});

// Add to navigation links smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Health Status Analysis
function analyzeHealth() {
    const healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    
    if (healthRecords.length === 0) {
        return null;
    }

    const latestRecord = healthRecords[healthRecords.length - 1];
    const heartRate = parseInt(latestRecord.heartRate);
    const steps = parseInt(latestRecord.steps);

    let analysis = {
        status: '✅ Good',
        color: '#10b981'
    };

    if (heartRate > 100 || heartRate < 60) {
        analysis = {
            status: '⚠️ Check with doctor',
            color: '#f59e0b'
        };
    }

    if (steps < 5000) {
        analysis.status = '📊 Increase activity';
    }

    return analysis;
}