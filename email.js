// Adicione o script do EmailJS no seu arquivo HTML (antes do fechamento do body)
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Inicialize o EmailJS com seu User ID
// Substitua "seu_user_id" pelo ID fornecido no dashboard do EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("seu_user_id");
});

// Configure o envio do formulário
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Mostrar indicador de carregamento ou desabilitar o botão
    const btn = document.querySelector('.contact-form .btn');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    // Preparar os dados do formulário
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        whatsapp: document.getElementById('whatsapp').value,
        message: document.getElementById('message').value
    };
    
    // Enviar o email usando EmailJS
    // Substitua "service_id" e "template_id" pelos IDs do seu serviço e template
    emailjs.send('service_id', 'template_id', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Mostrar mensagem de sucesso
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpar o formulário
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('whatsapp').value = '';
            document.getElementById('message').value = '';
            
            // Restaurar o botão
            btn.textContent = originalText;
            btn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            
            // Mostrar mensagem de erro
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
            
            // Restaurar o botão
            btn.textContent = originalText;
            btn.disabled = false;
        });
});

// Validação básica do formulário
function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('.contact-form .form-control');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    // Validação específica para email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailRegex.test(email.value)) {
        isValid = false;
        email.classList.add('error');
    }
    
    return isValid;
}

// Adicionar evento de validação antes do submit
document.querySelector('.contact-form .btn').addEventListener('click', function(e) {
    if (!validateForm()) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos corretamente.');
    }
});