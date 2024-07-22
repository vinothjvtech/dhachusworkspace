document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendance-form');
    const studentNameInput = document.getElementById('student-name');
    const attendanceTableBody = document.querySelector('#attendance-table tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = studentNameInput.value.trim();
        const date = new Date().toLocaleDateString();

        if (studentName) {
            addAttendanceRecord(studentName, date);
            saveAttendanceRecord(studentName, date);
            studentNameInput.value = '';
        }
    });

    function addAttendanceRecord(studentName, date) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = studentName;
        row.appendChild(nameCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        row.appendChild(dateCell);

        attendanceTableBody.appendChild(row);
    }

    function saveAttendanceRecord(studentName, date) {
        const attendanceRecords = getAttendanceRecordsFromStorage();
        attendanceRecords.push({ studentName, date });
        localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    }

    function getAttendanceRecordsFromStorage() {
        const records = localStorage.getItem('attendanceRecords');
        return records ? JSON.parse(records) : [];
    }

    function loadAttendanceRecords() {
        const attendanceRecords = getAttendanceRecordsFromStorage();
        attendanceRecords.forEach(record => addAttendanceRecord(record.studentName, record.date));
    }

    loadAttendanceRecords();
});