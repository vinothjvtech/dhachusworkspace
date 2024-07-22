document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exam-form');
    const examTitleInput = document.getElementById('exam-title');
    const examDateInput = document.getElementById('exam-date');
    const examDurationInput = document.getElementById('exam-duration');
    const examTableBody = document.querySelector('#exam-table tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const examTitle = examTitleInput.value.trim();
        const examDate = examDateInput.value;
        const examDuration = examDurationInput.value.trim();

        if (examTitle && examDate && examDuration) {
            addExamToTable(examTitle, examDate, examDuration);
            saveExam(examTitle, examDate, examDuration);
            form.reset();
        }
    });

    function addExamToTable(title, date, duration) {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = title;
        row.appendChild(titleCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        row.appendChild(dateCell);

        const durationCell = document.createElement('td');
        durationCell.textContent = duration;
        row.appendChild(durationCell);

        examTableBody.appendChild(row);
    }

    function saveExam(title, date, duration) {
        const exams = getExamsFromStorage();
        exams.push({ title, date, duration });
        localStorage.setItem('exams', JSON.stringify(exams));
    }

    function getExamsFromStorage() {
        const exams = localStorage.getItem('exams');
        return exams ? JSON.parse(exams) : [];
    }

    function loadExams() {
        const exams = getExamsFromStorage();
        exams.forEach(exam => addExamToTable(exam.title, exam.date, exam.duration));
    }

    loadExams();
});