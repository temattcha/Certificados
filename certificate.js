window.onload = function() {
    var students = JSON.parse(localStorage.getItem('students'));

    if (students && students.length > 0) {
        var zip = new JSZip();

        var promises = students.map(function(student) {
            return new Promise(function(resolve, reject) {
                var canvas = document.createElement('canvas');
                canvas.width = 3508;
                canvas.height = 2480;
                var context = canvas.getContext("2d");

                var backgroundImage = new Image();
                backgroundImage.src = "certificate-background.png";
                backgroundImage.onload = function() {
                    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                    context.font = "bold 300px 'UnifrakturMagnut', cursive";
                    context.fillStyle = "black";
                    context.textAlign = "center";
                    context.fillText("Certificado", canvas.width / 2, canvas.height / 2 - 600);

                    context.font = "60px Arial";
                    context.fillText("Este curso foi ministrado com o objetivo de fornecer aos participantes uma compreensão", canvas.width / 2, canvas.height / 2 - 300);
                    context.fillText("fundamental das principais funcionalidades e recursos básicos do Microsoft Excel. Durante o curso,", canvas.width / 2, canvas.height / 2 - 200);
                    context.fillText("foram demonstradas habilidades e conhecimentos essenciais para a utilização eficiente desta", canvas.width / 2, canvas.height / 2 - 100);
                    context.fillText("poderosa ferramenta de planilhas. Este certificado é concedido a " + student.name, canvas.width / 2, canvas.height / 2);
                    context.fillText("CPF " + student.cpf + " em reconhecimento à conclusão bem-sucedida do Curso Básico de Excel", canvas.width / 2, canvas.height / 2 + 100);
                    context.fillText("com carga horária de 3,5 horas, pelo Grupo NVS.", canvas.width / 2, canvas.height / 2 + 200);

                    context.font = "italic 60px Arial";
                    context.fillText("8 de junho de 2023 - Piraquara/PR", canvas.width / 2, canvas.height / 2 + 450);
                    context.font = "italic 50px Arial";
                    context.fillText("___________________", canvas.width / 2 + 1000, canvas.height / 2 + 400);
                    context.fillText("Nota", canvas.width / 2 + 1000, canvas.height / 2 + 450);

                    context.fillText("_______________________________", canvas.width / 2 - 500, canvas.height / 2 + 800);
                    context.fillText("Instrutor", canvas.width / 2 - 500, canvas.height / 2 + 850);

                    context.fillText("_______________________________", canvas.width / 2 + 500, canvas.height / 2 + 800);
                    context.fillText("Aluno(a)", canvas.width / 2 + 500, canvas.height / 2 + 850);

                    canvas.toBlob(function(blob) {
                        zip.file(student.name + ".png", blob);
                        resolve();
                    }, "image/png");
                };
            });
        });

        Promise.all(promises).then(function() {
            zip.generateAsync({ type: "blob" }).then(function(content) {
                saveAs(content, "Certificados.zip");
                localStorage.removeItem('students');
                document.getElementById('loading-message').innerHTML = "Certificados gerados e baixados com sucesso!";
            });
        });
    } else {
        document.getElementById('loading-message').innerHTML = "Nenhum aluno encontrado para gerar certificados.";
    }
}
