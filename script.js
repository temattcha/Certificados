function addStudent() {
    var studentsContainer = document.getElementById('students-container');
    var studentCount = studentsContainer.getElementsByClassName('student-input').length + 1;

    var studentInput = document.createElement('div');
    studentInput.classList.add('student-input');

    var label = document.createElement('label');
    label.textContent = 'Aluno ' + studentCount;

    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'student';
    input.required = true;

    var cpfInput = document.createElement('input');
    cpfInput.type = 'text';
    cpfInput.name = 'cpf';
    cpfInput.required = true;
    cpfInput.placeholder = 'CPF';
    cpfInput.maxLength = 14;
    cpfInput.oninput = function() {
        formatCPF(this);
    };

    var removeBtnDisplay = document.getElementById('removeBtn').style.display;
    if (removeBtnDisplay == "none") document.getElementById('removeBtn').style.display = 'block';

    studentInput.appendChild(label);
    studentInput.appendChild(input);
    studentInput.appendChild(cpfInput);

    studentsContainer.appendChild(studentInput);
}

function removeStudent() {
    var studentsContainer = document.getElementById('students-container');
    var studentInputs = studentsContainer.getElementsByClassName('student-input');

    // Verifica se há mais de um aluno para remover
    if (studentInputs.length > 1) {
        // Remove o último aluno adicionado
        studentsContainer.removeChild(studentInputs[studentInputs.length - 1]);

        // Atualiza o número de alunos
        var studentCount = studentsContainer.getElementsByClassName('student-input').length;
        for (var i = 0; i < studentCount; i++) {
            var label = studentsContainer.getElementsByClassName('student-input')[i].getElementsByTagName('label')[0];
            label.textContent = 'Aluno ' + (i + 1);
        }

        // Verifica se o botão de remoção deve ser ocultado
        if (studentCount === 1) {
            document.getElementById('removeBtn').style.display = 'none';
        }
    }
}

function formatCPF(cpfInput) {
    var cpf = cpfInput.value;

    // Remove qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, '');

    // Insere a máscara no CPF (formato: xxx.xxx.xxx-xx)
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    cpfInput.value = cpf;
}


function generateCertificates() {
    var students = [];
    var studentInputs = document.getElementsByName('student');
    var cpfInputs = document.getElementsByName('cpf');

    for (var i = 0; i < studentInputs.length; i++) {
        if (studentInputs[i].value) {
            students.push({
                name: studentInputs[i].value,
                cpf: cpfInputs[i].value
            });
        }
    }

    localStorage.setItem('students', JSON.stringify(students));

    window.location.href = "generate-certificates.html";
}